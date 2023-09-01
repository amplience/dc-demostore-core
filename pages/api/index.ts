import { enableMiddleware, middleware, CommerceAPI, getCommerceAPI as integrationGetCommerceAPI, Category, CommonArgs, CustomerGroup, GetCommerceObjectArgs, GetProductsArgs, Product } from '@amplience/dc-integration-middleware'
import { configLocator } from '@lib/config/AppContext'
import { getApiConfig } from '@lib/config/locator/config-locator'

// add the /api route
export default middleware

enableMiddleware(true);

let configuredApi: CommerceAPI
let apiConfig: any

const cacheApiConfig = async (locator: string) => {
    if (!apiConfig) {
        apiConfig = await getApiConfig(locator);
    }

    return apiConfig;
}

const initCommerceAPI = async (locator: string) => {
    if (configuredApi) {
        return configuredApi;
    }

    return configuredApi = await integrationGetCommerceAPI(await cacheApiConfig(locator))
}

let commerceApi: CommerceAPI | { vendor: () => Promise<string> } = {
    getProduct: async function (args: GetCommerceObjectArgs): Promise<Product> {
        return await (await initCommerceAPI(configLocator)).getProduct(args)
    },
    getProducts: async function (args: GetProductsArgs): Promise<Product[]> {
        return await (await initCommerceAPI(configLocator)).getProducts(args)
    },
    getRawProducts: async function (args: GetProductsArgs): Promise<Product[]> {
        return await (await initCommerceAPI(configLocator)).getRawProducts(args)
    },
    getCategory: async function (args: GetCommerceObjectArgs): Promise<Category> {
        return await (await initCommerceAPI(configLocator)).getCategory(args)
    },
    getCategoryTree: async function (args: CommonArgs): Promise<Category[]> {
        return await (await initCommerceAPI(configLocator)).getCategoryTree(args)
    },
    getCustomerGroups: async function (args: CommonArgs): Promise<CustomerGroup[]> {
        return await (await initCommerceAPI(configLocator)).getCustomerGroups(args)
    },
    vendor: async function (): Promise<string> {
        return (await cacheApiConfig(configLocator)).vendor
    }
}

export { initCommerceAPI, commerceApi }