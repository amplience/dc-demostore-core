function loadWidgets(account, locale, vse) {
    // Elements to place widgets in are present on the page with classname `amp-stylitics-container`.

    const styliticsViewMapping = {
        classic: {
            script: "https://web-assets.stylitics.com/v3-classic/latest/classic.release.js",
            name: "StyliticsClassicWidget"
        },
        hotspots: {
            script: "https://web-assets.stylitics.com/v3-hotspots/latest/hotspots.release.js",
            name: "StyliticsHotspotsWidget"
        },
        moodboard: {
            script: "https://web-assets.stylitics.com/v3-moodboard/latest/moodboard.release.js",
            name: "StyliticsMoodboardWidget"
        },
        gallery: {
            script: "https://web-assets.stylitics.com/v3-gallery/latest/gallery.release.js",
            name: "StyliticsGalleryWidget"
        },
        mainAndDetail: {
            script: "https://web-assets.stylitics.com/v3-main-and-detail/latest/main-and-detail.release.js",
            name: "StyliticsMainAndDetailWidget"
        }
    }

    function ensureViewLoaded(view, onLoad) {
        if (view.loaded) {
            onLoad();
        } else if (view.loadMethods == null) {
            view.loadMethods = [onLoad];

            var styliticsScript = document.createElement('script');
            styliticsScript.onload = function () {
                view.loaded = true;

                for (const method of view.loadMethods) {
                    method();
                }
            };
            styliticsScript.src = view.script;
            document.head.appendChild(styliticsScript);
        } else {
            view.loadMethods.push(onLoad);
        }
    }

    let client;

    function ensureClient() {
        // Get the parameters from the URL
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        vse = vse || urlParams.get('vse')

        // Insantiate the SDK
        var ampSDKConfig = {
            locale: locale || urlParams.get('locale'),
            hubName: account || urlParams.get('ampAccount') || 'nmdemostore'
        }
        if (vse) ampSDKConfig.stagingEnvironment = vse
        client = new ampDynamicContent.ContentClient(ampSDKConfig);
    }

    function flattenGenericType(base, type) {
        if (type.display) {
            base.display = {...base.display, ...type.display};
        }

        if (type.navigation) {
            base.navigation = {...base.navigation, ...type.navigation}
        }

        if (type.text) {
            base.text = {...base.text, ...type.text}
        }
    }

    function flattenCommon(result) {
        result.api = {...result.api, item_number: result.sku};

        if (result.display && result.display.hotspotsOverlayOrder) {
            result.display.hotspotsOverlayOrder = result.display.hotspotsOverlayOrder.map(order => order.split(','));
        }
    }

    function flattenGeneric(body) {
        const result = {...body};

        flattenGenericType(result, result[result.view]);

        flattenCommon(result);

        return result;
    }

    function flattenSpecific(body) {
        const keys = Object.keys(body);
        const result = {...body};

        for (const key of keys) {
            if (key.endsWith('_extra')) {
                const baseKey = key.substring(0, key.length - 6);
                result[baseKey] = {...body[baseKey], ...body[key]};
            }
        }

        const schemaEnd = body._meta.schema.lastIndexOf('/');
        result.view = body._meta.schema.substring(schemaEnd + 1);

        flattenCommon(result);

        return result;
    }

    function flatten(body) {
        if (body._meta.schema.endsWith('generic') && body.view) {
            return flattenGeneric(body);
        } else {
            return flattenSpecific(body);
        }
    }

    function initWidget(element, id, body) {
        const fbody = flatten(body);
        const styliticsObj = styliticsViewMapping[fbody.view] || styliticsViewMapping['classic']
        ensureViewLoaded(styliticsObj, function () {
            let widgetInstance = new window[styliticsObj.name](fbody.account, element, fbody);
            widgetInstance.start();
        });
    }

    function getId(body) {
        if (typeof body['@id'] === 'string') {
            const lastSlash = body['@id'].lastIndexOf('/');
            return body['@id'].substring(lastSlash + 1);
        }

        return '';
    }

    const elements = document.getElementsByClassName('amp-stylitics-container');

    for (const element of elements) {
        if (element.dataset) {
            if (element.dataset.widgetId) {
                // Load widget from amplience content.
                // Assumes dc-delivery-sdk is loaded.
                ensureClient();

                client
                .getContentItemById(element.dataset.widgetId)
                .then((content) => {
                    const body = content.body;

                    initWidget(element, element.dataset.widgetId, body);
                })
                .catch((error) => {
                    console.log('content not found', error);
                });
            } else if (element.dataset.ampStyliticsData) {
                // Try to load widget from dataset attributes.

                const json = decodeURIComponent(element.dataset.ampStyliticsData);

                try {
                    const body = JSON.parse(json);

                    initWidget(element, getId(body), body);
                } catch { }
            }
        }
    }
}

loadWidgets();