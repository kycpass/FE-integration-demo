import React from 'react';
import { DEMO_APIENDPOINT } from '../const';

const mountSdk = (token, containerId, callback, errCallback) => {
  window.entify.mount({
    token,
    containerId,
    onSuccess: callback,
    onError: errCallback
  });
};

const getToken = async () => {
  let opts = {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await fetch(`${DEMO_APIENDPOINT}entifyme/getToken`, opts);
    const responseJson = await response.json()
    return responseJson;
  }catch(err) {
    throw err
  }
}

class EntifySDK extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    try {
      // get the jwt token from Entify.
      // following request will make a call to your local server, local server will use
      // stored api token to get JWT from entify server.
      // NOTE: API_TOKEN should not be used in client side for security purpose.
      const {token} = await getToken();
      this.setState({
        loading: false
      })
      // once token is received mound the SDK
      const success = () => {
        console.log('Verification successful!');
      }

      const error = (err) => {
        // Something wrong happened!
        console.error(err);
      }

      mountSdk(token, "sdk_mount", success, error)
    }catch(err) {
      console.error(err);
      alert('Something went worng!');
    }
  }

  render() {
    return(
      <div id="sdk_mount">
        {this.state.loading ? "loading.." : null}
      </div>
    )
  }
}

const EntifyVerification = () => {
  return(
    <div>
      <div className="section-header">Verify</div>
      <div className="section-description">
        This will render the SDK and allow you to interact with the SDK.
      </div>
      <div className="sdk-container">
        <EntifySDK/>
      </div>
    </div>
  )
}

export default EntifyVerification
