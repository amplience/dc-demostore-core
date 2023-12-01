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

For additional information please refer to the Bynder [FAQs.md](../../GitHub/dc-extension-bynder/docs/FAQs.md) document

## Shoppable Image

Shoppable Image extension in Demostore which assists the user in in creating compelling, informative and dynamic content . This enhances the user experience and showcases the content.

*Q.* Which features can I add to a shoppable image?

*A.* Hotspots and/or Polygons, with tooltip information that can be displayed on hover as well as custom actions (opening a link, displaying information, etc.).

*Q.* How do I link to a Product in my web application?

*A.* Copy the Product ID from the URL and paste into Target. Then change Selector to `.product`

> *NB:* the Product ID should just be the unique identifier not a full string eg it should be this `4c24d0c9-edac-418e-9007-22fec5df2c46` not this `4c24d0c9-edac-418e-9007-22fec5df2c46/gabs-bag-sofia-large-green`

*Q.* How do I link to a Category in my web application?

*A.* Copy the category ID from the URL eg `men-shoes-sneakers` and paste into Target. Then change Selector to `.category`

*Q.* How do I add a link to my web application/another web application?

*A.* Paste a URL into Target. Then change Selector to `.link` or `.linkNew` dependent upon whether you want to open the link in the same tab or a new tab respectively.

*Q.* How do I link to a Delivery Key in my web application?

*A.* Copy the Delivery Key from the Content Item you want to link to, paste it in the Target and change the Selector to `.deliveryKey`. This will open the content in a side drawer

*Q.* How do I create a tooltip in my web application?

*A.* First create your Hotspot or Polygon. In Target simply an an identifier for the tooltip text you would like to use. In Selector choose `.tooltip`. 

In the Tooltip fields, add whatever you entered in Target to Tooltip Key and enter the text you want displayed on the tooltip, in Tooltip Text.

*Q.* How will I know if my set up has worked?

*A.* You can see in the visualisation pane, the pop-out visualisation plus, if you you hover over an hotspot / polygon and there is an issue with your set up the action will not go to a valid page and the tooltip will not display. For each type the tooltip error is as follows:

- `.product`: Product not found
- `.category`: Category not found
- `.link` / `.linkNew`: No Validation
- `.deliveryKey`: No validation
- `.tooltip`: Displays target if no custom tooltip mapping found

*Q.* Why doesn’t the visualisation pane display external web pages? 

*A.* The pop-out vis displays external websites as these open in a new tab.
