import _ from 'lodash'
import { getCommerceAPI, Product, Category, GetCommerceObjectArgs, GetProductsArgs, CommonArgs } from '@amplience/dc-demostore-integration';

import { configLocator } from '@lib/config/AppContext';
import isServer from '@utils/isServer';
import { stringify } from 'querystring';

const fetchApiURL = async (operation: string, args: CommonArgs) => {
    let apiUrl = (window as any).isStorybook ? 'https://core.amprsa.net' : ''
    return await (await fetch(`${apiUrl}/api/${operation}?${stringify((args as any))}`)).json()
}

export const getProduct = async (args: GetCommerceObjectArgs): Promise<Product> => isServer() ? await (await getCommerceAPI(configLocator)).getProduct(args) : await fetchApiURL('product', args)
export const getProducts = async (args: GetProductsArgs): Promise<Product[]> => isServer() ? await (await getCommerceAPI(configLocator)).getProducts(args) : await fetchApiURL('products', args)
export const getCategory = async (args: GetCommerceObjectArgs): Promise<Category> => isServer() ? await (await getCommerceAPI(configLocator)).getCategory(args) : await fetchApiURL('category', args)
export const getMegaMenu = async (args: CommonArgs): Promise<Category> => isServer() ? await (await getCommerceAPI(configLocator)).getMegaMenu(args) : await fetchApiURL('megaMenu', args)