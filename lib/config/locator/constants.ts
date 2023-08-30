const demostoreBaseUri          = process.env.NEXT_PUBLIC_DEMOSTORE_BASE_URI || 'https://demostore.amplience.com'
const demostoreSiteUri          = `${demostoreBaseUri}/site`
const demostoreIntegrationUri   = `${demostoreSiteUri}/integration`
const demostoreConfigUri        = `${demostoreSiteUri}/demostoreconfig`
const demostoreProductGridUri   = `${demostoreBaseUri}/content/product-grid`

export const CONSTANTS = {
	demostoreBaseUri,
	demostoreSiteUri,
	demostoreIntegrationUri,
	demostoreConfigUri,
	demostoreProductGridUri
}