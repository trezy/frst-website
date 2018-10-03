# FRST Website

## Development

1. Install packages
    ```
    yarn install
    # or
    npm install
    ```

1. Run the server
    ```
    yarn start
    # or
    npm start
    ```

The server will package all of the SCSS files to be served.

## Deployment

Deployment is currently done via Firebase Hosting. Follow the [Firebase Hosting Deployment](https://firebase.google.com/docs/hosting/deploying) guide for more info. If you're already set up with the Firebase CLI locally and logged in, you can deploy with the following command:

```
firebase deploy --only hosting
```

# Mailchimp Subscription Server

## Deployment

Make sure your environment variables are set:

```
firebase functions:config:set frst.mailchimp_api_key="[API_KEY]" frst.mailchimp_list_id="[LIST_ID]" frst.mailchimp_api_server="[API_SERVER]"
```

Then deploy via Firebase Functions:

```
firebase deploy --only functions
```
