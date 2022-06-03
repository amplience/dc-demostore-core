import { middleware, CommerceAPI, ConfigLocatorBlock, getCommerceAPI as integrationGetCommerceAPI, Category, CommonArgs, CustomerGroup, GetCommerceObjectArgs, GetProductsArgs, Product } from '@amplience/dc-demostore-integration'
import { configLocator } from '@lib/config/AppContext'

// add the /api route
export default middleware

let configuredApi: CommerceAPI
const initCommerceAPI = async (config: ConfigLocatorBlock) => {
    return configuredApi = configuredApi || await integrationGetCommerceAPI(config)
}

let commerceApi: CommerceAPI = {
    getProduct: async function (args: GetCommerceObjectArgs): Promise<Product> {
        return await (await initCommerceAPI({ config_locator: configLocator })).getProduct(args)
    },
    getProducts: async function (args: GetProductsArgs): Promise<Product[]> {
        return await (await initCommerceAPI({ config_locator: configLocator })).getProducts(args)
    },
    getCategory: async function (args: GetCommerceObjectArgs): Promise<Category> {
        return await (await initCommerceAPI({ config_locator: configLocator })).getCategory(args)
    },
    getMegaMenu: async function (args: CommonArgs): Promise<Category[]> {
        return await (await initCommerceAPI({ config_locator: configLocator })).getMegaMenu(args)
    },
    getCustomerGroups: async function (args: CommonArgs): Promise<CustomerGroup[]> {
        return await (await initCommerceAPI({ config_locator: configLocator })).getCustomerGroups(args)
    }
}

export { initCommerceAPI, commerceApi }
