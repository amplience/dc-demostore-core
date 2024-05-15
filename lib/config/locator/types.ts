/**
 * Algolia configuration properties.
 */
export type AlgoliaConfig = {
    appId: string;
    apiKey: string;
};

/**
 * Amplience configuration properties.
 */
export type AmplienceConfig = {
    hub: string;
    stagingApi: string;
    imageHub?: string;
};

/**
 * Demostore configuration properties.
 */
export type DemoStoreConfiguration = {
    algolia?: AlgoliaConfig;
    url?: string;
    cms: AmplienceConfig;
    commerce?: any;
};
