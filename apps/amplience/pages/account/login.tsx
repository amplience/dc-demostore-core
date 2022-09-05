import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
const Cookies = require('cookies');

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const {
        res,
        req,
        query
    } = context;
    
    const {
        username,
        redirect = '/'
    } = query || {};

    if (res) {
        const cookies = new Cookies(req, res);
        cookies.set('segment', username);
        
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

export default function Login({
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div></div>
    )
}
