# Working with pages

The concepts of pages are a key demonstrable area of Demostore. They exist in 2 main areas:

### Navigation:

-   **Category Page** - An item & page linked to a Commerce category (PLP)
-   **Landing Page** - An item and standalone page for content only
-   **External Page** - An item which has an external link for its page content

### Standalone:

-   **Content Page** - A page which can be used by itself without being in the menu.

## Ordering in Navigation

Each item in the navigation has a `Priority` attribute. The number set in here is the order in which the navigation item is rendered.

Example: 0 will be first

The priority is in relation to other priorities set at the same at the same level in the hierarchy. So for example if you have 2 nodes at the same level

-   MyItemA [Priority set to 50]
-   MyItemB [Priority set to 10]

Will display as `MyItemB,MyItemA` in that order

> Note: When categories are set to automatically draw from commerce, they are given their priority with increments of 10 so that you can mix and max dynamic and curated navigation.

> Additional node: If items have the same priority, they will display in order of which they are returned from the API.

## Hiding a page

Each of these content types has a flag in the content form called `is Active` which defaults to true.

If you disable this, then the page is no longer visible if attempting to visit it directly or in the menu navigation.

## Archiving a page & delivery keys

Best practice when archiving a page is to follow the steps below:

1. Set the page to not be active & save
   a) If the page was previously published then unpublish.
2. Change the delivery key to something random & save
   b) Delivery keys are mandatory so you can use the same path and append a unique id using an online tool such as [Short UUID Generator](https://generateuuid.online/short-uuid). Example `category/6vYaP46nCukXc2DPTpnXZP`
3. If the page is part of the navigation you should also remove the node so that the parent link is no longer attached for staging content. See [Removing a node from a hierachy](https://amplience.com/developers/docs/dev-tools/guides-tutorials/hierarchies/#removing-a-node-from-a-hierarchy)

This will ensure that your content is not still visible when removed and your delivery key can be re-used again.

> Note: When using [dc-demostore-cli](https://github.com/amplience/dc-demostore-cli) to cleanup an account, this process is automated.
