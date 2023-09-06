import { DemoStoreConfiguration } from "./types";

const defaultConfig = {
    "url": "https://core.dc-demostore.com",
    "algolia": {
        "appId": "4BS5I6EVVD",
        "apiKey": "8d22e49624a694d584e5355201382faf"
    },
    "cms": {
        "hub": "amprsaprod",
        "stagingApi": "192p209qdwr571ibpz5c22j0s3.staging.bigcontent.io",
        "imageHub": "willow"
    }
};

const defaultApiConfig = {
    "vendor": "rest",
    "codec_params": {
        "productURL": "https://demostore-catalog.s3.us-east-2.amazonaws.com/products.json",
        "categoryURL": "https://demostore-catalog.s3.us-east-2.amazonaws.com/categories.json",
        "customerGroupURL": "https://demostore-catalog.s3.us-east-2.amazonaws.com/customerGroups.json",
        "translationsURL": "https://demostore-catalog.s3.us-east-2.amazonaws.com/translations.json"
    }
};

let configObj: DemoStoreConfiguration | undefined = undefined;
let apiConfigObj: any = undefined;

export function getConfig(): DemoStoreConfiguration {
    if (!configObj) {
        configObj = process.env.NEXT_PUBLIC_DEMOSTORE_CONFIG_JSON != null ?
            JSON.parse(process.env.NEXT_PUBLIC_DEMOSTORE_CONFIG_JSON) :
            defaultConfig;
    }

    return configObj as DemoStoreConfiguration;
}

export function getApiConfig() {
    if (!apiConfigObj) {
        apiConfigObj = process.env.DEMOSTORE_CONFIG_ECOMM_JSON != null ?
            JSON.parse(process.env.DEMOSTORE_CONFIG_ECOMM_JSON) :
            defaultApiConfig;
    }

    return apiConfigObj;
}

export function getHubName() {
    return getConfig()?.cms?.hub ?? 'unknown';
}

export function getVendorName() {
    return getApiConfig()?.vendor ?? 'unknown';
}