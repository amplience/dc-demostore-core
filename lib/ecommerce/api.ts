import { CommonArgs } from '@amplience/dc-demostore-integration';
import { getResponse } from 'pages/api';
import isServer from '@utils/isServer';
import { stringify } from 'querystring';

const fetchApi = (operation: string) => async (args: CommonArgs): Promise<any> => {
    if (isServer()) {
        return await getResponse({ ...args, operation })
    }

    let apiUrl = (window as any).isStorybook ? 'https://core.amprsa.net' : ''
    return await (await fetch(`${apiUrl}/api?operation=${operation}&${stringify(args)}`)).json()
}

const api = {
    getProduct: fetchApi('product'),
    getProducts: fetchApi('products'),
    getCategory: fetchApi('category'),
    getMegaMenu: fetchApi('megaMenu')
}

export default api