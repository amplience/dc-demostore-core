import { DemoStoreConfiguration } from "./types";

export async function getConfig(config_locator: string): Promise<DemoStoreConfiguration> {
    return JSON.parse(process.env.NEXT_PUBLIC_DEMOSTORE_CONFIG_JSON ?? '{}')
}

export async function getApiConfig(config_locator: string) {
    return JSON.parse(process.env.DEMOSTORE_CONFIG_ECOMM_JSON ?? '{}');
}