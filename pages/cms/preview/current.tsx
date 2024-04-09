import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
const Cookies = require('cookies');

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { res, req, query } = context;
    const { redirect = '/' } = query || {};

    if (res) {
        const cookies = new Cookies(req, res);
        cookies.set('amplience-host');
        cookies.set('timestamp');

        res.setHeader('Cache-Control', 'no-cache ');
        res.writeHead(301, {
            Location: redirect,
        });
        res.end();
    }

    return {
        props: {},
    };
}

export default function Timestamp({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <div></div>;
}
