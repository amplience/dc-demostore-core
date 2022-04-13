import { NextApiRequest, NextApiResponse } from "next";
import { getProducts } from "@lib/ecommerce/api";
import { qc } from "@amplience/dc-demostore-integration";

import NextCors from 'nextjs-cors'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    let result = await getProducts(qc({ args: req.query }))
    res.status(200).json(result)
}