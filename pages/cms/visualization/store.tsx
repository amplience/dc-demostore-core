import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { StandaloneLayout } from '@components/core';
import { ContentBlock } from '@components/cms-modern';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import Image from 'next/image';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { content: contentId } = context.query;

    const data = await fetchStandardPageData(
        {
            content: {
                content: { id: contentId as string },
            },
        },
        context
    );

    return {
        props: {
            ...data,
        },
    };
}

function Home({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div
            style={{
                position: 'relative',
                margin: 5,
                paddingTop: '2.8%',
                paddingLeft: '4.3%',
                paddingRight: '4.4%',
                paddingBottom: '11%',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,1)',
                }}
            >
                <Image
                    src="https://elyseo.eu/content/dam/tcl-dam/brand/website/homepage/videos/TV%20Frame.png"
                    alt="TV frame"
                />
            </div>
            <ContentBlock content={content.content} />
        </div>
    );
}

export default Home;

Home.Layout = StandaloneLayout;
