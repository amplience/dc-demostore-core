import { middleware, getCommerceAPI } from '@amplience/dc-demostore-integration'

// add the /api route
export default middleware

const commerceApi = getCommerceAPI
export { commerceApi }