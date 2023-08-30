import _ from 'lodash'
import { DemoStoreConfiguration } from './types'
import { CryptKeeper } from './crypt-keeper'

/**
 * Get a content item from a Dynamic Content hub and "decrypts" it.
 * @param hub Dynamic Content hub
 * @param args ID or key of the content item
 * @returns Decrypted content item from DC or null
 */
export const getContentItem = async (hub: string, args: any): Promise<any> => {
	const path = args.id && `id/${args.id}` || args.key && `key/${args.key}`
	const response = await fetch(`https://${hub}.cdn.content.amplience.net/content/${path}?depth=all&format=inlined`)
	return response.status === 200 ? CryptKeeper((await response.json()).content, hub).decryptAll() : null
}

/**
 * Gets the demostore config content item given a configLocator string.
 * @param configLocator Locator to use as part of the delivery key
 * @returns Demostore config content item
 */
export const getContentItemFromConfigLocator = async (configLocator: string): Promise<any> => {
	let [hub, lookup] = configLocator.split(':')

    if (lookup.indexOf('/') === -1) {
        lookup = `config/${lookup}`
    }

	const contentItem = await getContentItem(hub, { key: `demostore/${lookup}` })

	if (!contentItem) {
		// todo: add help url
		throw new Error(`no content item found for config_locator ${configLocator}`)
	}
	return contentItem
}

/**
 * Gets the demostore config given a key string.
 * @param key Locator to use as part of the delivery key
 * @returns Demostore config object
 */
export const getDemoStoreConfig = async (key: string): Promise<DemoStoreConfiguration> => {
	const obj: any = await getContentItemFromConfigLocator(key)

    if (!obj) {
        throw new Error(`[ demostore ] Couldn't find config with key '${key}'`)
    }

	return {
		...obj,
		algolia: {
			credentials: _.keyBy(obj.algolia.credentials, 'key'),
			indexes: _.keyBy(obj.algolia.indexes, 'key')
		}        
	}
}

// getConfig still used in place of getDemoStoreConfig as of v1.1.3
export const getConfig = getDemoStoreConfig