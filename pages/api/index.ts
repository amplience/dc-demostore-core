import { NextApiRequest, NextApiResponse } from "next";
import NextCors from 'nextjs-cors'
import { getCommerceAPI } from "@amplience/dc-demostore-integration";
import { configLocator } from '@lib/config/AppContext';

export const getResponse = async (query: any): Promise<any> => {
    const commerceAPI = await getCommerceAPI(configLocator)
    switch (query.operation) {
        case 'category':
            return await commerceAPI.getCategory(query)
        case 'megaMenu':
            return await commerceAPI.getMegaMenu(query)
        case 'product':
            return await commerceAPI.getProduct(query)
        case 'products':
            return await commerceAPI.getProducts(query)
    }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200
    })
    return res.status(200).json(await getResponse(req.query))
}
export default handler