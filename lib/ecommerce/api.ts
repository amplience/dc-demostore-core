import _ from 'lodash'
import { CodecConfiguration, CommerceAPI, getCommerceAPI, QueryContext, getCommerceAPIFromCodecConfig } from '@amplience/aria';

import { configLocator } from '@lib/config/AppContext';
import isServer from '@utils/isServer';
import { stringify } from 'querystring';

const fetchApiURL = async (operation: string, context?: QueryContext) => {
    let apiUrl = (window as any).isStorybook ? 'https://core.amprsa.net' : ''
    return await (await fetch(`${apiUrl}/api/${operation}?${stringify(context?.args)}`)).json()
}

export const getProduct = async (context: QueryContext) => isServer() ? await (await getCommerceAPI(configLocator)).getProduct(context) : await fetchApiURL('product', context)
export const getProducts = async (context: QueryContext) => isServer() ? await (await getCommerceAPI(configLocator)).getProducts(context) : await fetchApiURL('products', context)
export const getCategory = async (context: QueryContext) => isServer() ? await (await getCommerceAPI(configLocator)).getCategory(context) : await fetchApiURL('category', context)
export const getMegaMenu = async () => isServer() ? await (await getCommerceAPI(configLocator)).getMegaMenu() : await fetchApiURL('megaMenu')