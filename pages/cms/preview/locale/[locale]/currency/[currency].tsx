import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
const Cookies = require('cookies');

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {
        res,
        req,
        query,
        params
    } = context;
    
    const {
        locale,
        currency
    } = params || {};

    const {
        redirect = '/'
    } = query || {};

    if (res) {
        const cookies = new Cookies(req, res);
        cookies.set('locale', locale);
        cookies.set('currency', currency);

        res.setHeader('Cache-Control', 'no-cache ');
        res.writeHead(301, {
            Location: redirect
        });
        res.end();
    }

    return {
        props: {}
    }
}

export default function Locale({
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div></div>
    )
}
