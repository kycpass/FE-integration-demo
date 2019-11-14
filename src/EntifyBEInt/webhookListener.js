import React, { useState } from 'react';
import call from './request';
import { DEMO_APIENDPOINT } from '../const';

const IncomingPayloads = (props) => {
  const [incomingPL, setincomingPL] = useState([]);
  const [loading, setLoader] = useState(false);
  const fetchIncomingPL = async () => {
    setLoader(true)
    const incomingPL = await call({path:'incomingPayload'});
    setincomingPL(incomingPL)
    setLoader(false)
  }

  return(
    <div className="section--dashboard">
      <div className="section-header">Incoming payload through webhook</div>
      <div className="section-description">
        This will show incoming payload to {DEMO_APIENDPOINT}webhookHandler/
        <br/>
        Make sure you have registered the url as webhook
      </div>
      <div className="webhook-list-json">
        <br/>
        {
          incomingPL.map((i,d) => {
            return <div key={d}>{JSON.stringify(i, null, 4)}</div>
          })
        }
        {
          loading && 'Loading..'
        }
      </div>
      <div className="btn" onClick={fetchIncomingPL}>Refresh</div>
    </div>
  )
}

export default IncomingPayloads;
