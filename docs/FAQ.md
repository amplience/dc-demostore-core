# FAQ for Amplience Dynamic Content Demostore Core (dc-demostore-core)

Here you'll find answers to your frequently asked questions.

## error - Error: [ demostore ] no codecs found matching schema 

If you have had an existing demo store instance for a while and already have content in an account but update the front end of the demostore (demostore-core) you will run into an issue where the application will not load.

```
error - Error: [ demostore ] no codecs found matching schema [ {"_meta":{"name":"generic rest commerce configuration","schema":"https://demostore.amplience.com/site/integration/rest","deliveryKey":"aria/integration/default","deliveryId":"70f79ba2-2ed1-49d5-a1df-6c11da5d2322"},"productURL":"https://demostore-catalog.s3.us-east-2.a
```

In order to resolve this, there are 2 paths you can take:

### Resolution 1: Re-import content
Use demostore-cli to clean and re-import your content.

```
demostore cleanup -c -a
demostore import -l
```

### Resolution 2: Manual fix
You do not have to run any code to resolve this issue. You can simply log into your Dynamic Content Account and follow the steps:

1. Log into Dynamic Content
2. Go to the Content Tab
3. Select the 'Site Components' repository
4. Find content item called 'generic rest commerce configuration' and open it to edit
5. You will find an empty field called 'Customer Group URL'
6. Paste the following: 

`https://demostore-catalog.s3.us-east-2.amazonaws.com/customerGroups.json`

7. Save and publish your content item

> The content delivery API has a cache of up to 5 mins. So you may have to wait for up to 5 mins to see the change

## Deep Copy Dashboard extension has no hub ID

Please install the latest version of [dc-demostore-cli](https://github.com/amplience/dc-demostore-cli)

## Bynder - Select an asset (INDD) but it does not render

This component is setup as an example to render image assets that can be viewed in a browser from Bynder (_ie. jpg, png, gif_). Any other file formats are not included in this example but you can easily extend the component `simpleBannerBynder` to render files based on the type if wanted.

You can also select a specific file when choosing an asset in Bynder. Most of which will have a JPG render even if a video / document.
