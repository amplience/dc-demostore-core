# Fork & Deploy `dc-demostore-core`

Before starting to use `dc-demostore-cli`, you'll need to deploy a fork of this project to something like Vercel or Netlify.

This is because your hosted application also contains an API service used for integration (getting products etc.)

## Testing locally from a fork

In order to test locally from a fork, you need to tell the application what configuration to use / load from with regards to both CMS and eCommerce Data.

Included in the project root is a sample local environment file `sample-.env.local`. This contains default configuration pointing to an Amplience CMS account and a demo eCommerce configuration

Either rename this file to `.env.local` or create a new file called `.env.local` and copy the contest from the sample file (`sample-.env.local`).

Then make sure you are on node v18.x, install packages and run in development mode:

```
npm i
npm run dev
```

## Deployment to Vercel

We'll cover Vercel here, but you can choose any deployment platform. So, start by forking this repo, then head over to [Vercel](https://vercel.com/) to create a new project pointing to your fork. Hobby accounts are free, go ahead and create one if you don't already have one.

Then click "New Project"

![Vercel Create Project](../media/vercel-create.png)

It'll prompt you to import one of your repositories. Click Import for your forked version of `dc-demostore-core`:

![Vercel Import Forked Project](../media/vercel-import.png)

On the next screen you should put in the default environment variables in the `Environment Variables` section at the bottom of the page.

2 Environment variable are needed, just like when you are building locally which are:

1) `NEXT_PUBLIC_DEMOSTORE_CONFIG_JSON` - gives CMS configuration
2) `DEMOSTORE_CONFIG_ECOMM_JSON` - gives eCommerce configuration

You can copy from your `.env.local` removing the surrounding single quotes from the values or input as per below:

Name: `NEXT_PUBLIC_DEMOSTORE_CONFIG_JSON`
Value:
```
{ "cms": { "hub": "automation01", "stagingApi": "1dpf8i5xxl3cn1xccm0grjyowp.staging.bigcontent.io", "imageHub": "willow" }, "algolia": { "appId": "4BS5I6EVVD", "apiKey": "e34456b7d52beaa2b34b447efd7e4f52" }, "url": "https://dc-demostore-core-nm.vercel.app" }
```

Name: `DEMOSTORE_CONFIG_ECOMM_JSON`
Value:
```
{"vendor":"rest","codec_params":{"productURL":"https://demostore-catalog.s3.us-east-2.amazonaws.com/products.json","categoryURL":"https://demostore-catalog.s3.us-east-2.amazonaws.com/categories.json","customerGroupURL":"https://demostore-catalog.s3.us-east-2.amazonaws.com/customerGroups.json","translationsURL":"https://demostore-catalog.s3.us-east-2.amazonaws.com/translations.json"}}
```

Now you can simply click "Deploy".

We will go back and change these environment variables after your account is configured and automated but this will provide you with a defaul working deployed version.

![Vercel Import Forked Project](../media/vercel-deploy.png)

Once depoyed, you'll see this screen:

![Vercel Import Forked Project](../media/vercel-deployed.png)

Note the URL under "Domains" (highlighted above). You'll need that when configuring `dc-demostore-cli` in the next step.

[back](../README.md)
