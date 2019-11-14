import React, { useEffect, useState } from 'react';
import call from '../request';
import './index.css';
import IncomingPayloads from './webhookListener';

const DashboardContainer = () => {
  const [webhooks, setWebhooks] = useState([]);

  const extractData = (data) => {
    const extractText = data.split(",");
    const url = extractText[0];
    const enabled = extractText[1];
    const eventType = extractText[2];
    const payload = {
      url,
      enabled,
      eventType
    }
    return payload
  }

  const fetchWebhooks = async () => {
    const webhooks = await call({path:'entifyme/getWebhookList'});
    setWebhooks(webhooks)
  }

  const createWebhook = async (data) => {
    const payload = extractData(data);
    const webhooks = await call({path: 'entifyme/createWebhook', data: payload, method:"post"});
    if(webhooks.status == 'fail') {
      alert(webhooks.message);
      return
    }
    fetchWebhooks();
    alert('Successfully created!');
  }

  const updateWebhook = async (data, webhookId) => {
    const payload = extractData(data);
    const webhooks = await call({path: `entifyme/updateWebhook/${webhookId}`, data: payload, method:"put"});
    if(webhooks.status == 'fail') {
      alert(webhooks.message);
      return
    }
    fetchWebhooks();
    alert('Successfully updated!');
  }

  const getWebhook = async (webhookId) => {
    const webhooks = await call({path: `entifyme/getWebhook/${webhookId}`});
    if(webhooks.status == 'fail') {
      alert(webhooks.message);
      return
    }
    return webhooks
  }

  useEffect(() => {
    fetchWebhooks()
  }, [])

  return(
    <div>
      <div className="section-header">Dashboard</div>
      <div className="section-description">This will allow you to create/update/list webhooks. It'll also display the incoming payloads</div>
      <div className="section-container--dashboard">
        <CreateWebhook createWebhook={createWebhook}/>
        <UpdateWebhook updateWebhook={updateWebhook}/>
        <WebHookDetail getWebhook={getWebhook}/>
        <WebhookLists webhooks={webhooks}/>
        <IncomingPayloads />
      </div>
    </div>
  )
}

const WebhookLists = (props) => {
  const { webhooks } = props;
  return(
    <div className="section--dashboard">
      <div className="section-header">List of webhooks</div>
      <div className="section-description">
        POST https://stagingapi.kyc-pass.com/v1/webhooks
      </div>
    {
      webhooks.map((i, d) => {
        return(
          <div className="webhook-list-json" key={d}>{JSON.stringify(i, null, 4)}</div>
        )
      })
    }
    </div>
  )
}

const CreateWebhook = (props) => {
  const [text, setText] = useState("");
  return(
    <div className="section--dashboard">
      <div className="section-header">Create webhook</div>
      <div className="section-description">
        Please type url,enabled, event type (comma separated)
        <br/>
        POST https://stagingapi.kyc-pass.com/v1/webhooks
      </div>
      <div>
        <input type="text" onChange={(e)=>setText(e.target.value)} value={text}/>
      </div>
      <div className="btn" onClick={()=>props.createWebhook(text)}>Create</div>
    </div>
  )
}

const UpdateWebhook = (props) => {
  const [text, setText] = useState("");
  const [webhookId, setWebhookId] = useState("");
  return(
    <div className="section--dashboard">
      <div className="section-header">Update webhook</div>
      <div className="section-description">
        PUT https://stagingapi.kyc-pass.com/v1/webhooks/webhookId
      </div>
      <div className="section-description">
        Please type webhookId
      </div>
      <div>
        <input type="text" onChange={(e)=>setWebhookId(e.target.value)} value={webhookId}/>
      </div>
      <br/>
      <div className="section-description">
        Please type url,enabled, event type  (comma separated)
      </div>
      <div>
        <input type="text" onChange={(e)=>setText(e.target.value)} value={text}/>
      </div>
      <div className="btn" onClick={()=>props.updateWebhook(text, webhookId)}>Update</div>
    </div>
  )
}


const WebHookDetail = (props) => {
  const [ webhookId, setText ] = useState("");
  const [ webhookDetail, setWebhookDetail ] = useState("");
  const fetchWebhookDetail = async (webhookId)=>{
    const webhook = await props.getWebhook(webhookId);
    setWebhookDetail(webhook)
  }

  return(
    <div className="section--dashboard">
      <div className="section-header">Get webhook detail</div>
      <div className="section-description">
        Please type webhookId
        <br/>
        GET https://api.kyc-pass.com/v1/webhooks/webhookId
      </div>
      <div>
        <input type="text" onChange={(e)=>setText(e.target.value)} value={webhookId}/>
      </div>
      <div className="btn" onClick={()=>fetchWebhookDetail(webhookId)}>Fetch</div>
      {
          webhookDetail &&
          <div className="webhook-list-json">
            <br/>
            {
              JSON.stringify(webhookDetail, null, 4)
            }
          </div>
      }
    </div>
  )
}

export default DashboardContainer;
