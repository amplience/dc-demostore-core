import React from 'react';
import { CmsContent } from '@lib/cms/CmsContent';
import { getImageURL } from '@utils/getImageURL';

type BaseImageProps = {
    name: string;
    defaultHost: string;
    endpoint: string;
} & CmsContent;

const BaseImage = ({ ...data }: BaseImageProps) => {
    return (
        <picture key={data.name} className="amp-dc-image">
            <img src={getImageURL(data, { strip: true })} className="amp-dc-image-pic" width="100%" alt={data.name} />
        </picture>
    );
};

export default BaseImage;
