# Working with pages

The concepts of pages are a key demonstrable area of Demostore. They exist in 2 main areas:

### Navigation:

-   **Landing Page** - Just a pure CMS driven page (maybe a CMS icon next to the node)

-   **Category Page** - Links directly to a commerce category and allows CMS content (maybe a commerce icon)

-   **Ecommerce Container** - Allows to draw all commerce categories or select and reorder multiple - no CMS content. Maybe multiple ordered commerce icons?)

-   **External Page** - Menu item that links to an external URL (maybe the open in new page icon next to it)

-   **Page Group** - A grouping for sub nodes of any type.

### Standalone:

-   **Content Page** - A page which can be used by itself without being in the menu.

## Ordering in Navigation

Each of the navigation items mentioned above can be arranged by dragging and dropping in the left-hand side menu. This provides a powerful and flexible way to arrange items in the menu according to preference.

When creating / adding and Ecommerce Container, you have two options:

1. When the 'Show All' toggle switch is checked (default option), this will pull in all the ecommerce categories in the order they are obtained from the CMS.

2. When it is unchecked you will be able to manually select and arrange the eCommerce categories via drag and drop inside of the Ecommerce container.

> Note: A Page Group can only be added as a child of a Category Page.

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
