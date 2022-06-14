import React, { FC } from 'react'
import { CmsContent } from '@lib/cms/CmsContent';
import { ContentBlock } from '@components/cms-modern';

type Props = {

} & CmsContent;

const SimpleImageBanner: FC<Props> = ({
    bannerImage,
    link,
    analytics
}) => {



        return (
        <div className="amp-dc-banner js_dc_banner">
            <div className="amp-dc-banner-wrapper">
            { //@ts-ignore
                <a href={link} analyticsre="analytics">
                    <div className="amp-dc-banner-pic-wrap">
                        <ContentBlock content={bannerImage} />
                    </div>
                </a>
    }
            </div>
        </div>  
    )
}

export default SimpleImageBanner;