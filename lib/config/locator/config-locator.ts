import { getContentItem, getContentItemFromConfigLocator } from "./amplience"
import { CONSTANTS } from "./constants"

export async function getConfig(config_locator: string) {
    let config = await getContentItemFromConfigLocator(config_locator)
    return config;
}

export async function getApiConfig(config_locator: string) {
    const [hub, lookup, integration] = config_locator.split(':')
    let config = await getContentItemFromConfigLocator(config_locator)
    if (config._meta.schema === CONSTANTS.demostoreConfigUri) {
        // we have an item
        if (lookup.indexOf('/') === -1) {
            // check if there is a specific otherwise return the normal version
            if(integration){
                config = await getContentItem(hub, { key: `demostore/integration/${integration}`})
            }else{
                // We should look for the item in linked to the config
                config = await getContentItem(hub, config.commerce)
            }
        }
    }

    return config;
}