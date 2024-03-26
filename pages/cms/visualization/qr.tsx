import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { useAppContext } from '@lib/config/AppContext';
import Image from 'next/image';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { content: contentId } = context.query;
    const data = await fetchStandardPageData(
        {
            content: {},
        },
        context
    );

    return {
        props: {
            ...data,
            contentId,
        },
    };
}

export default function QrCode({ context, contentId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { url, cms } = useAppContext();
    const { locale } = context.cmsContext;

    return (
        <Image
            src={`https://qrickit.com/api/qr.php?d=${url}/visualization?vse=${cms.stagingApi}%26content=${contentId}%26locale=${locale}&addtext=SCAN%20TO%20VIEW%20ON%20MOBILE&txtcolor=e80d8c&fgdcolor=29333f&bgdcolor=FFFFFF&qrsize=1000&t=p&e=m`}
            width={600}
            height={600}
            alt="QR code for mobile"
        />
    );
}
