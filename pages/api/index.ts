import {
    enableMiddleware,
    middleware as integrationMiddleware,
    CommerceAPI,
    getCommerceAPI as integrationGetCommerceAPI,
    Category,
    CommonArgs,
    CustomerGroup,
    GetCommerceObjectArgs,
    GetProductsArgs,
    Product,
} from '@amplience/dc-integration-middleware';
import { getApiConfig } from '@lib/config/locator/config-locator';
import isServer from '@utils/isServer';

enableMiddleware(true);

let configuredApi: CommerceAPI;
let apiConfig: any;

const cacheApiConfig = () => {
    if (!isServer()) {
        return {};
    }

    if (!apiConfig) {
        apiConfig = getApiConfig();
    }

    return apiConfig;
};

const initCommerceAPI = async () => {
    if (configuredApi) {
        return configuredApi;
    }

    return (configuredApi = await integrationGetCommerceAPI(cacheApiConfig()));
};

let commerceApi: CommerceAPI & { vendor: () => string } = {
    getProduct: async function (args: GetCommerceObjectArgs): Promise<Product> {
        return await (await initCommerceAPI()).getProduct(args);
    },
    getProducts: async function (args: GetProductsArgs): Promise<Product[]> {
        return await (await initCommerceAPI()).getProducts(args);
    },
    getRawProducts: async function (args: GetProductsArgs): Promise<Product[]> {
        return await (await initCommerceAPI()).getRawProducts(args);
    },
    getCategory: async function (args: GetCommerceObjectArgs): Promise<Category> {
        return await (await initCommerceAPI()).getCategory(args);
    },
    getCategoryTree: async function (args: CommonArgs): Promise<Category[]> {
        return await (await initCommerceAPI()).getCategoryTree(args);
    },
    getCustomerGroups: async function (args: CommonArgs): Promise<CustomerGroup[]> {
        try {
            return await (await initCommerceAPI()).getCustomerGroups(args);
        } catch (e) {
            console.warn((e as Error).message);
            return [];
        }
    },
    vendor: function (): string {
        return cacheApiConfig().vendor;
    },
};

export const middleware = async (req: any, res: any) => {
    const serverConfig = cacheApiConfig();

    const config = { ...(req.body || req.query), ...serverConfig };

    req.body = config;
    req.query = {};

    return await integrationMiddleware(req, res);
};

export default middleware;

export { initCommerceAPI, commerceApi };
