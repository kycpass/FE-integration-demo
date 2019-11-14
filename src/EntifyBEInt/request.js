import { DEMO_APIENDPOINT } from '../const';
const call = async ({url=DEMO_APIENDPOINT, path="", method="get", data=null}) => {
  let opts = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if(data) {
    opts.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(url+path, opts);
    const responseJson = await response.json()
    return responseJson;
  }catch(err) {
    throw err
  }
}

export default call;
