# eCommerce Configuration

## General
Demostore Core uses the [dc-integration-middleware project](https://github.com/amplience/dc-integration-middleware) in order to interface with Commerce APIs which are:

* Products
* Categories
* User Groups

This project comes with an integration with a demo commerce platform. This is a REST configuration which mimics data from a commerce platform. For full details see [here](https://github.com/amplience/dc-integration-middleware/blob/main/docs/vendor/commerce/rest.md).

As this integration middleware supports multiple eCommerce vendors, you can easily tell your your demostore to work with any of the supported eCommerce Vendors.

See [dc-integration-middleware](https://github.com/amplience/dc-integration-middleware) directly for a list.

## Setting up your integration

For any of the supported integrations, you will need follow the guidance to setup access from these vendors first and get your required credentials.

Details can be found in [dc-demostore-integration](https://github.com/amplience/dc-integration-middleware) for each of the supported commerce vendors.

## What do i need to change?

There are 2 elements that you need to change to have your demostore work with a different supported eCommerce Vendor:

* **Authoring** - So that you can content manage product, category and user group experiences in the CMS.
* **Front End** - Rendering the right experiences from the commerce platform in the demostore front end

> Note: Before changing an eCommerce vendor, it is advisable to use demostore-cli to 'clean' and re-import from latest otherwise you will have content using references not present in your commerce platform.

### Changing the Authoring

1) In Amplience Dynamic Content, browse to the Development tab --> Extensions --> and select and open 'eCommerce Toolkit'.
2) Click on the `Installation Parameters` tab and put in your configuration.
3) Save the extension.


### Changing the Front End

This uses the same configuration as you have just put into the `Installation Parameters` of your eCommerce Toolkit extension. In order to use as an environment variable the value must be on one line.

You can copy the eComm Toolkit extension params and run them through an online tool like this [JSON To One Line](https://www.text-utils.com/json-formatter/) as an example.

### Locally

At the root of this project, in your `.env.local` file copy this into the value for `DEMOSTORE_CONFIG_ECOMM_JSON`.
You must keep the surrounding outer single quotes.
Example below where `<PASTEHERE>` is the single line configuration you have copied

```sh
DEMOSTORE_CONFIG_ECOMM_JSON='<PASTEHERE>'
```

Feel free to also refer to `sample-.env.local`

Then restart your local development server by running `npm run dev`

### Vercel Environment Variable

1) In Vercel, browse to your project and open
2) Click on Settings
3) Go to Environment Variables
4) Edit the Environment Variable called `DEMOSTORE_CONFIG_ECOMM_JSON`
5) Paste the original one line value (ie, without surrounding single quotes)
6) Redeploy your application