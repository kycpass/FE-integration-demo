# FE-integration-demo

This project is to demonstrate how to integrate web-sdk in your website, it gives a UI to interact with the demo backend for creating/updating/listing webhooks. It also, displays the incoming payload to registered webhook (https://<your-domain>/webhookHandler)  

To try out the demo, you can visit the link: https://fe-sandbox-demo.herokuapp.com/  
This app interacts with [demo backend](https://github.com/kycpass/BE-sandbox)  

## Setup:  
This project is bootstrapped with create-react-app.  
1. `npm install`  
2. `npm start`  

If you want to interact with your local backend, replace `DEMO_APIENDPOINT` with your url in `./src/request.js`. [Read more](https://github.com/kycpass/BE-sandbox#test-locally)  

## Integrate with your existing project:  
If you want to attach SDK implementation with your existing project, render the component `EntifySDK` in your desired react route. Look at `./src/EntifySDK`  

---

In the demo app, it'll mount the SDK and render playground. Once the app is running, you can  walk through the verification flow.  
1. Register a webhook where you can receive incoming payload.  
> For testing purpose, we already created an url with handler attached. `/webhookHandler`  
**NOTE:** You can not register your localhost url as webhook. Host your backend or use https://ngrok.com/ to create tunnel.

2. Go to verification section and submit the form.  
3. Scroll down to incoming payload section and click on refresh. All the incoming payload will start appearing here.  

## Troubleshooting:  
If you find that the SDK is not rendering, it might be bacause of the token you are using is bad. Make sure you generated token using correct referral. For example, if you want to mount the SDK in www.xyz.com website, generate the token with `{referral: www.xyz.com}`
