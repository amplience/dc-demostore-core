let config = {
    _meta: {
        schema: 'https://demostore.amplience.com/site/integration/elasticpath'
    },
    client_id: 'L20xPsBYoQCQmHhg4m9PkXzViWLDX5Jp0OLYaJsxq7',
    client_secret: 'h4sokq7LiduYn3KHDAcHBvKHcehGzBKQJq09TchamQ',
    baseUrl: 'https://api.moltin.com',
    authUrl: 'https://api.moltin.com/oauth/access_token',
    pcmUrl: 'https://api.moltin.com/pcm'
}

let commerceToolsConfig = {
    _meta: {
        schema: 'https://demostore.amplience.com/site/integration/commercetools'
    },
    client_id: 'rT8wuJyF8yZ_0Un0s30TieTT',
    client_secret: 'A_upL187BxOg7XP_RtYJT3EUDmmcURVE',
    oauth_url: 'https://auth.europe-west1.gcp.commercetools.com',
    api_url: 'https://api.europe-west1.gcp.commercetools.com',
    project: 'anyafinn',
    scope: 'manage_project:anyafinn'
}

let restConfig = {
    _meta: {
        schema: 'https://demostore.amplience.com/site/integration/rest'
    },
    productURL: "https://nova-amprsa-product-catalog.s3.us-east-2.amazonaws.com/refactor/products.json",
    categoryURL: "https://nova-amprsa-product-catalog.s3.us-east-2.amazonaws.com/refactor/categories.json",
    translationsURL: "https://nova-amprsa-product-catalog.s3.us-east-2.amazonaws.com/translations.json"
}

const includesAnyOf = (array, targets) => {
    return _.find(targets, target => _.includes(array, target))
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const getRandom = array => {
    if (Array.isArray(array)) {
        let index = getRandomInt(array.length + 1)
        return array[index]
    }
    else {
        return array
    }
}

import chalk from 'chalk'
import { getCommerceAPIFromCodecConfig, QueryContext } from '@amplience/dc-demostore-integration'
import _ from 'lodash'
import fetch from 'isomorphic-unfetch'
import fs from 'fs-extra'
import axios from 'axios'
export const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

let selectedConfig = config
let commerceAPI = await getCommerceAPIFromCodecConfig(selectedConfig)

console.log(`💡  using codec for schema ${chalk.blueBright(selectedConfig._meta.schema)}`)

let _time = console.time
console.time = str => {
    console.log(str + ` ${chalk.greenBright('start')}`)
    _time(str)
}

let mainTag = '⏰  test run'
console.time(mainTag)

// megamenu section
let megaMenuSectionTag = '☯️  get megamenu'
console.time(megaMenuSectionTag)
let megaMenu = await commerceAPI.getMegaMenu({})
let second = _.reduce(megaMenu, (sum, n) => { return _.concat(sum, n.children) }, [])
let third = _.reduce(_.flatMap(megaMenu, 'children'), (sum, n) => { return _.concat(sum, n.children) }, [])
let categories = _.concat(megaMenu, second, third)
console.log(`${megaMenuSectionTag} [ ${chalk.green(megaMenu.length)} top level ] [ ${chalk.green(second.length)} second level ] [ ${chalk.green(third.length)} third level ]`)
console.timeEnd(megaMenuSectionTag)
// end megamenu section

// get category section
let categorySlug = getRandom(categories).slug
let categorySectionTag = `🧰  get category ${chalk.green(categorySlug)}`
console.time(categorySectionTag)
let category = await commerceAPI.getCategory(new QueryContext({ args: { key: categorySlug } }))
console.log(`${categorySectionTag} found category [ ${chalk.yellow(category.name)} ]`)
console.timeEnd(categorySectionTag)
// end get category section

// get product section
let productId = getRandom(category.products).id
let productSectionTag = `💰  get product [ ${chalk.blue(productId)} ]`
console.time(productSectionTag)
let product = await commerceAPI.getProduct(new QueryContext({ args: { id: productId } }))
console.log(`${productSectionTag} found product [ ${chalk.yellow(product.name)} ]`)
console.timeEnd(productSectionTag)
// end get product section

// get products section
let productsSectionTag = '💎  get products'
console.time(productsSectionTag)
let productIds = [productId]
let products = await commerceAPI.getProducts(new QueryContext({ args: { productIds: productIds.join(',') } }))
console.log(`${productsSectionTag} got [ ${chalk.green(products.length)} ] products for [ ${chalk.gray(productIds.length)} ] productIds`)
console.timeEnd(productsSectionTag)
// end get products section

console.timeEnd(mainTag)
process.exit(0)

export { }