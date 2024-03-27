import { GetServerSidePropsContext } from 'next';

export default function create404Error(pageData?: any, context?: GetServerSidePropsContext) {
    if (context && context.res) {
        context.res.statusCode = 404;
    }
    return {
        props: {
            ...pageData,
            statusCode: 404,
        },
    };
}
