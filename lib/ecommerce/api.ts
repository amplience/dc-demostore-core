import { CommerceAPI, CommonArgs, getResponse, isServer } from '@amplience/dc-demostore-integration';
import { stringify } from 'querystring';
import { configLocator } from '@lib/config/AppContext';

const apiURL = isServer() ? '' : (window as any)?.isStorybook ? 'https://core.amprsa.net' : ''
const fetchApi = (operation: string) => async (args: CommonArgs): Promise<any> => {
    if (isServer()) {
        return await getResponse({ ...args, operation, config_locator: configLocator })
    }
    return await (await fetch(`${apiURL}/api?operation=${operation}&config_locator=${configLocator}&${stringify(args)}`)).json()
}

const api: CommerceAPI = {
    getProduct:         fetchApi('getProduct'),
    getProducts:        fetchApi('getProducts'),
    getCategory:        fetchApi('getCategory'),
    getMegaMenu:        fetchApi('getMegaMenu'),
    getCustomerGroups:  fetchApi('getCustomerGroups')
}
export default api