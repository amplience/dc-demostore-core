# Table of Contents
- [Fetching content](#fetching-content)
- [Filter API](#filter-api)
- [Amplience Search](#amplience-search)
- [Navigation Hierarchy](#navigation-hierarchy)
- [Product Detail Page Layout](#product-detail-page-layout)
- [Theming](#theming)
- [Admin UI Panels](#admin-ui-panels)

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

[top](#table-of-content)

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
          value: "https://amprsa.net/content/store"
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

[top](#table-of-content)

## Amplience Search

![Instant Search Example](../media/instantSearchExample.png)

![Search Index](../media/searchIndex.png)

### Setting up Instant Search

```js
        const search = instantsearch({
            indexName: stagingApi
                ? indexes.blog.staging
                : indexes.blog.prod,
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

[top](#table-of-content)

## Navigation Hierarchy

![Site Pages](../media/sitePages.png)

The `Site Pages` hierarchy defines the top navigation of the site.
This hierarchy is always loaded server-side and available for the Next.js pages.

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

[top](#table-of-content)

## Product Detail Page Layout

Amp RSA features product detail page layouts that can be specific to:
- a category
- a product
- a Designer (could be any product attribute)

A specific UI Extension allows you to change the whole layout of the product detail page.
There is a default product layout with delivery key `layout/default-pdp`.
The `Commerce Experiences` hierarchy allows you to map categories, products, designers to specific layouts.
In the code, the Filter API is used to search Commerce Experiences based on the context (product categories, product ID, product attributes).

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
            value: 'https://amprsa.net/site/experiences/category'
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
          value: 'https://amprsa.net/product-experience'
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
            value: 'https://amprsa.net/site/experiences/designer'
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

[top](#table-of-content)

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

[top](#table-of-content)

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

[top](#table-of-content)