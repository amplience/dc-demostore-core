# Table of Contents
- [Fetching content](#fetching-content)
- [Filter API](#filter-api)
- [Amplience Search](#amplience-search)
- [Navigation Hierarchy](#navigation-hierarchy)
- [Product Detail Page Layout](#product-detail-page-layout)
- [Personalisation](#personalisation)
- [Theming](#theming)
- [Admin UI Panels](#admin-ui-panels)
- [Shoppable Image](#shoppable-image)
- [Stylitics](#stylitics)
- [Accelerated Media](#accelerated-media)

## Fetching content

### Content Delivery API

```js
const resolveContent = (requests: CmsRequest[]): Promise<CmsContent[]> => {
        return fetch(
            `https://${host}/content/fetch`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "parameters": {
                            "depth": parameters.depth,
                            "format": parameters.format,
                            "locale": context.locale
                        },
                        "requests": requests
                    })
                }
            ).then(x => x.json())
                .then(x => x.responses || []) 
                .then(x => x.map((y: any) => y.content || null));
    };
```

[top](#table-of-contents)

## Filter API

### Sample Code

```js
const resolveFilter = (request: GetByFilterRequest): Promise<CmsFilterResponse> => {
        return fetch(
            `https://${host}/content/filter`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...request,
                        "parameters": {
                            "depth": parameters.depth,
                            "format": parameters.format
                        }
                    })
                }
            ).then(x => x.json());
    }
```

### Using Filter API

![Filter API Example](../media/filterApiExample.png)

```js
let filterRequest: GetByFilterRequest =
    {
      filterBy: [
        {
          path: "/_meta/schema",
          value: "https://demostore.amplience.com/content/store"
        },
        {
          path: "/filterActive",
          value: true
        }
      ],
      sortBy: {
        key: "default",
        order: sortOrder
      }
    };

    if (parkingChecked) {
      filterRequest.filterBy.push({ path: "/keyElements/parking", value: true });
    }

    if (clickCollectChecked) {
      filterRequest.filterBy.push({ path: "/keyElements/clickAndCollect", value: true });
    }
```

[top](#table-of-contents)

## Amplience Search

![Instant Search Example](../media/instantSearchExample.png)

![Search Index](../media/searchIndex.png)

### Setting up Instant Search

```js
        const search = instantsearch({
            indexName: stagingApi ? `${cms.hub}.blog-staging` : `${cms.hub}.blog-production`,
            searchClient: algoliasearch(
                appId,
                apiKey 
            ),
            hitsPerPage: 5,
        });
```
### Filtering

```js
        search.addWidget(
            instantsearch.widgets.configure({
                filters:
                    (locale || 'en-US').indexOf('en-') === 0
                        ? `locale:en-US`
                        : `locale:${locale}`,
                }),
        );
```

### Search Box

```js
        search.addWidget(
            instantsearch.widgets.searchBox({
                container: '#searchbox',
                placeholder: 'Search',
            })
        );
```

### Refinements

```js
        search.addWidget(
            instantsearch.widgets.refinementList({
                container: '#category-list',
                attribute: 'snippet.category',
            })
        );

        search.addWidget(
            instantsearch.widgets.refinementList({
                container: '#author-list',
                attribute: 'snippet.author',
            })
        );
```

### Hits

```js
        search.addWidget(
            instantsearch.widgets.hits({
                hitsPerPage: 5,
                container: '#hits',
                cssClasses: {
                    list: 'amp-dc-card-list-wrap',
                    item: 'amp-dc-card',
                },
                templates: {
                    item: ({ snippet, _meta }: any) => {
                        return `
                            <a ...>
                                ...
                            </a>
                    `;
                    },
                },
            })
        );
```

### Pagination

```js
        search.addWidget(
            instantsearch.widgets.pagination({
                container: '#pagination',
            })
        );
```

### Hits per page

```js
        search.addWidget(
            instantsearch.widgets.hitsPerPage({
                container: '#hits-per-page',
                items: [
                    { label: '5 hits per page', value: 5, default: true },
                    { label: '10 hits per page', value: 10 },
                ],
            })
        );
```

### JSX Template

```jsx
            <PageContent className="blog-list__container">
                <div className="blog-list">
                    <div className="blog-list-facets">
                    <Typography variant="h6">
                        <Breadcrumb navigationItem={navigationItem} />
                      </Typography>
                      <Typography variant="h2" component="h2">
                          Blog
                      </Typography> 
                        <div id="searchbox" className="ais-SearchBox" />
                        <ProductFacet title="Categories" className="blog-list-facet blog-list-facet--categories">
                            <div id="category-list" />
                        </ProductFacet>
                        <ProductFacet title="Author" className="blog-list-facet">
                            <div id="author-list" />
                        </ProductFacet>
                        <div id="hits-per-page" style={{ display: 'none' }} />
                    </div>
                    <div className="blog-list-results">
                        <div className="amp-dc-card-list amp-dc-prod-5-rows amp-dc-cards-hero amp-dc-cards-blog">
                            <div id="hits" />
                        </div>
                        <div id="pagination" />
                    </div>
                </div>
            </PageContent>
```

[top](#table-of-contents)

## Navigation Hierarchy

![Site Pages](../media/sitePages.png)

The `Site Pages` hierarchy defines the top navigation of the site.
This hierarchy is always loaded server-side and available for the Next.js pages.

Each commerce related node (Site Pages and Category Page) have an option populate sub nodes from commerce.

![Site Pages](../media/site-pages-sub.png)

When set to true, the navigation will auto populate sub items from the commerce category (or root).

If set to false, only CMS managed sub items will appear.

CMS managed sub items will display AFTER the commerce items.

The default automation has the Site Pages node set to true to automatically render sub items from commerce.


Other sub-hierarchies like `Components` and `Themes` are also always loaded in.

```js
    const data = await fetchPageData({
        ...input,
        content: {
            ...input.content,
            configComponents: { key: 'config/components' }
        },
        hierarchies: {
            ...input.hierarchies,
            pages: {
                tree: { key: 'homepage' }
            },
            themes: {
                tree: { key: 'configuration/themes' }
            }
        }
    }, context);
```

[top](#table-of-contents)

## Product Detail Page Layout

Demostore features product detail page layouts that can be specific to:
- a category
- a product
- a Designer (could be any product attribute)

A specific UI Extension allows you to change the whole layout of the product detail page.
There is a default product layout with delivery key `layout/default-pdp`.
The `Commerce Experiences` hierarchy allows you to map categories, products, designers to specific layouts.
In the code, the Filter API is used to search Commerce Experiences based on the context (product categories, product ID, product attributes).

## Personalisation

In order to illustrate a personalisation approach this project contains a slot type which allows a user to associate content to user segments.

- Repository: `slots`
- Content type: `Personalized Banner Slot`
- Schema: `https://demostore.amplience.com/slots/personalized-banner`
- Component: `components/cms-modern/PersonalizedBannerSlot/PersonalizedBannerSlot.tsx`

### Authoring

When using this slot type in the scheduler you can add multiple items and associate user segments to each item in order to illustate working with personalised content in Amplience.

> Note about slots usage: Slots are designed to be created in the content library but the content of which is designed to be used in the Scheduling.

![User Authoring](../media/user-segments-authoring.png)


#### Rules

* You can have multiple items in your slot
* Each item can be associated to one or more segments
* An item without segments associated is 'default' content

> Note: This is just one approach for demonstration purposes.

### Previewing (Site preview)

When previewing and testing your personlised banner slot behavior, you must be in a FULL site preview, not just the slot preview.

To select a user segment click on the user icon in the top nav:

![User Icon](../media/user-login-icon.png)

Then select a segment to preview, or select the blank item to behave as if you are not signed in:

![Segment Selection](../media/user-login-selection.png)

The following rules will apply to all instances of the personalised banner slot in your application.

#### Rules

* If there are no items, nothing will display
* If you are NOT signed in (with a user segment):
  * It will display the FIRST item without a user segment associated
  * If no content is found without a segment it will display nothing
* If you ARE signed in (with a user segment):
  * It will display the FIRST item matching the user segment signed in with
  * If no matches are found it will:
    * Display default content (the FIRST item without a user segment aassociated)
    * If no content is found without a segment it will display nothing

### Layouts

![Product Layout](../media/productLayout.png)

### Commerce Experiences

![Commerce Experiences](../media/commerceExperiences.png)

### Getting default layout and related product content

```js
const [data, product] = await Promise.all(
    [
      fetchStandardPageData(
        {
          content: {
            defaultPDPLayout: pdpLayout ? { id: pdpLayout as string } : { key: 'layout/default-pdp' },
            productContent: { key: "product/" + id },
          },
        },
        context
      ),
      getProduct({ id }, cmsContext, userContext)
    ]
  );
```

### Configuration based on category

```js
  // config based on category
  product.categories.forEach((category: any) => {
    experienceConfigRequests.push(
      {
        filterBy: [
          {
            path: '/_meta/schema',
            value: 'https://demostore.amplience.com/site/experiences/category'
          },
          {
            path: '/id',
            value: category.id
          }
        ],
        sortBy: {
          key: 'default',
          order: 'desc'
        },
        page: {
          size: 1
        }
      }
    )
  });
```

### Config based on SKU

```js
  // config based on SKU
  experienceConfigRequests.push(
    {
      filterBy: [
        {
          path: '/_meta/schema',
          value: 'https://demostore.amplience.com/product-experience'
        },
        {
          path: '/id',
          value: product.id
        }
      ],
      sortBy: {
        key: 'default',
        order: 'desc'
      },
      page: {
        size: 1
      }
    }
  );
```

### Config based on Designer

```js
// config based on designer
  let designer = _.find(product?.variants?.[0]?.attributes, (att: Attribute) => att.name === 'designer')
  
  if (designer) {
    experienceConfigRequests.push(
      {
        filterBy: [
          {
            path: '/_meta/schema',
            value: 'https://demostore.amplience.com/site/experiences/designer'
          },
          {
            path: '/designer',
            value: designer
          }
        ],
        sortBy: {
          key: 'default',
          order: 'desc'
        },
        page: {
          size: 1
        }
      }
    );
  }
```

[top](#table-of-contents)

## Theming

In the `Configuration` hierarchy, you can create `Themes` with `Palette` and `Typography`.
You can define a default theme, and additional ones. Some components like `Blog` can use a `Theme`, and you can also wrap any component with a `ThemeWrapper` to change the theme locally.

### Default Theme

![Theme Default](../media/themeDefault.png)

### Typography

![Theme Palette](../media/themePalette.png)

### Palette

![Theme Typography](../media/themeTypography.png)

### Theme Wrapper

![Theme Wrapper](../media/themeWrapper.png)

[top](#table-of-contents)

## Admin UI Panels

![Admin Panels](../media/adminPanels.png)

Admin UI Panels allow you to access some admin features useful for testing your application and content.
You can for instance switch from `Production` to `Staging` mode, show all components, slots or editions on the screen.
You can add your own panels in the `AdminPanel` component.

```js
const panels = [
  {
    label: 'Content Preview',
    icon: VisibilityIcon,
    component: ContentPreviewPanel
  },
  {
    label: 'Components',
    icon: ExtensionIcon,
    component: ComponentsPanel
  }
]
```

## Shoppable Image

This extension allows users to define Focal Points and interactable Hotspots over an image, in a format similar to what Content Hub provides, but with the data being stored on a content item.

![Shoppable Image](../media/component-shoppableImage.png)

The [dc-extension-shoppable-image](https://github.com/amplience/dc-extension-shoppable-image) is hosted on GitHub and this alpha version of the component has been added to Demo Store Core. Note: POI is not implemented in the Component yet but will be in a future release.

There are several options that you can put in the selector column that drive specific functionality from the information in the target.

| Target          | Selector                |
| --------------- | ----------------------- |
| Links to a product by ID. On hover, will show the product name, price and thumbnail if available. On click it will go to the product details page.<br/>`123456789` | `.product` |
| Links to a category by ID. On hover, will show the category name. On click it will go to the category page.<br/>`women-bags` | `.category` |
| A link to any URL in the same tab. Can be relative or absolute.<br/>`https://amplience.com` | `.link` |
| A link to any external URL in a new tab. Should be absolute.<br/>`https://amplience.com` | `.linkNew` |
| Opens a drawer displaying Amplience content with the specified key.<br/>`content/richttext1` | `.deliveryKey` |
| A tooltip that does nothing on click.<br/>`tooltip/tooltip1` | `.tooltip` |

### `.product` Product selector

If you would like to link a particular Hotspot/Polygon to a product, paste the product ID in Target and change the Selector to `.product`. This adds the ID of the product, along with the type of media you are using.

So you can see in the visualisation pane, we now have a product hotspot which shows a thumbnail image of the product along with the price and description.

![Shoppable Image](../media/component-shoppableImage-product.png)

### `.category` Category selector

You can use the `.category` selector with the category from your web application as the Target. This displays the Category name when you hover over that hotspot or polygon.

![Shoppable Image](../media/component-shoppableImage-category.png)

### `.link` Link selector
The `.link` selector can be used with the link URL as the Target which opens the link in the same tab. This displays in the visualisations as View as it links to a web page.

![Shoppable Image](../media/component-shoppableImage-link.png)

### `.linkNew` Link New selector

Use the `.linkNew` selector with the link URL as the Target which opens the link in a new tab. This, like Link, displays in the visualisations as View as it links to a web page, but also display the icon for opening in a new tab.

![Shoppable Image](../media/component-shoppableImage-link-new.png)

### `.deliveryKey` Content selector

The `.deliveryKey` selector can be used with the delivery key you have assigned to a content item. This displays as More Details and takes user to the content item which bears the corresponding delivery key.

![Shoppable Image](../media/component-shoppableImage-content.png)

Once you click the More Details, it will open a side-drawer container the content items linked by the Delivery Key.

![Shoppable Image](../media/component-shoppableImage-content-open.png)

### `.tooltip` Tooltip selector

You can use the `.tooltip` selector where you can add a tooltip with bespoke text (which has no link attached). This will display the text defined in the settings.

![Shoppable Image](../media/component-shoppableImage-tooltip.png)

![Shoppable Image](../media/component-shoppableImage-tooltip-form.png)

### AI Assistant

You can now use AI to automatically detect objects to set focal points & hotspots within your images rapidly to make your digital experiences interactive and drive conversions (you can read more on the [blog post](https://amplience.com/blog/automatic-shoppable-images-ai)).

![Shoppable Image](../media/component-shoppableImage-ai.png)

#### Focal Point

Once objects have been detected, you can use one of them to set the focal point.

![Shoppable Image](../media/component-shoppableImage-ai-focal-point.png)

In this example, you can set the focal point to a detected brush in the image.

#### Hotspots

In the following example, you can add hotspots from the AI Assistant to your list: 

![Shoppable Image](../media/component-shoppableImage-ai-hotspot.png)

It will automatically be added with the same name for selector and target, for instance `.lipstick` for the selector, and `lipstick` for the target. You can then change to one of the selectors above.

#### Polygon

AI Assistant is powerful enough to detect complex objects and create detailed polygons out of them. You can see in the following example how a bag is fully detected:

![Shoppable Image](../media/component-shoppableImage-ai-polygon.png)

### How shoppable image interactions are rendered

This section is a deeper look in to how the demostore handles the various shoppable image interactions.

Each interaction (hotspot/polygon) will specify a "selector" and a "target" to define how a user will interact with it. Within the demostore we use the [ShoppableImageInteractable](../components/cms-modern/ShoppableImageInteractable/ShoppableImageInteractable.tsx) component to determine how all interactions should be rendered.

For example, a category interaction would be configured with a "target" of `blue-shoes` and a "selector" of `.category`.

Each interactable will initialise a `ShoppableImageInteractable` component and the selector will determine how it should be rendered e.g.

```javascript
const ShoppableImageInteractable = ({ children, selector, target, tooltips }: ShoppableImageInteractableProps) => {
    const { categoriesBySlug } = useECommerce();
    const [drawerOpen, setDrawerOpen] = useState(false);

    switch (selector) {
        ...
        case InteractableType.CATEGORY: {
            return (
                <Link passHref href={urlBuilder(selector, target)}>
                    <Tooltip title={categoriesBySlug[target]?.name ?? 'Category not found'} followCursor>
                        {children}
                    </Tooltip>
                </Link>
            );
        }
        ...
    }
}
```

Using the code snippet above as an example, we configure a category interaction with a "target" of `blue-shoes` and a "selector" of `.category`. The `.category` selector matches `InteractableType.CATEGORY` in the selector switch statement. This renders the "category" view of a [ShoppableImageInteractable](../components/cms-modern/ShoppableImageInteractable/ShoppableImageInteractable.tsx), and in this case we wrap the `children` elements with a tooltip to display the category name (using the "target" as a lookup), and a clickable link to the category page.

## Stylitics

Uses the [Amplience Stylitics Integration (See link for full documentation)](https://github.com/amplience/dc-integration-stylitics) to render Stylitics widgets as a component. Stylitics and Amplience are a great fit for our creating automated shoppable experience using the great capabilities of Stylitics to increase AOV and basket size.

The demostore implementation includes the following:
* Sample product set that can be used when selecting products (see [documentation](https://github.com/amplience/dc-integration-middleware/blob/main/docs/vendor/commerce/rest.md))
* All of the component and implementation in React/NextJS
* Sample implementation for overriding link values
* Sample implementation of inheriting SKU from PDP

[top](#table-of-contents)

## Accelerated Media

A new [Accelerated Media](https://amplience.com/add-on/accelerated-media) Admin Panel has been added to the demostore implementation.

### Enable / Disable Accelerated Media

You can enable / disable Accelerated Media in the Admin Panel:

![Accelerated Media Flag](../media/accelerated-media-flag.png)

The use of AVIF format is globally controlled on the Front-End in all demostore pages:

* Home page
* Category pages
* Product detail pages, including Product Content
* Blog page & blog entry pages
* Stores page & store detail pages

### Getting Image Statistics

You can request image statistics for the current page:

![Getting Image Statistics](../media/accelerated-media-get-statistics.png)

The number of Amplience images in the page is displayed, and a summary graph is displayed in the Admin Panel with total sizes by image formats.

> Note: images statistics are cleared each time you navigate to a different page.

> Note: you should scroll down the current page to get all images due to lazy loading.

![Excluding Images](../media/accelerated-media-exclude-images.png)

When images can't be converted to AVIF, a checkbox will appear to exclude these images from the summary graph calculation.

### Image Statistics Details

Once image statistics are retrieved, you can access details in a new modal window:

![Details Grid View](../media/accelerated-media-details-modal-grid-view.png)

A grid view shows you all images with a bar chart showing each possible formats and their sizes, ordered by size.

![Details List View](../media/accelerated-media-details-modal-list-view.png)

In the details modal, images that can't be converted will appear with a red outline, showing the original request type, and the acutal type that is returned.

![Invalid Images](../media/accelerated-media-invalid-images.png)

A list view shows the same information in a table view that you can export as CSV.

![Export as CSV](../media/accelerated-media-csv-export.png)

[top](#table-of-contents)