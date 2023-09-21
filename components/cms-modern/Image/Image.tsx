import React, { FC } from 'react'
import { CmsContent } from '@lib/cms/CmsContent';
import { Box } from '@mui/material';
import { getImageURL } from '@utils/getImageURL';

type Props = {
    image: any;
    query?: any;
    format?: string;
    imageAltText?: string;
} & CmsContent;

const Image: FC<Props> = ({
    display,
    image,
    imageAltText,
    seoText,
    query,
    roundel
}) => {

    if (!image) {
        return null;
    }
    
    const getRoundelConfig = (roundel: any) => {
        if (roundel &&
            roundel[0] &&
            roundel[0].roundel &&
            roundel[0].roundel.name) {
            const roundelParams = [];
            let imageRoundelIndex;
            for (let x = 0; x < roundel.length; x++) {
                let roundelParam = '';
                switch (roundel[x].roundelPosition) {
                    case 'Bottom Right':
                        roundelParam = 'p1_img=';
                        imageRoundelIndex = 1;
                        break;
                    case 'Bottom Left':
                        roundelParam = 'p2_img=';
                        imageRoundelIndex = 2;
                        break;
                    case 'Top Left':
                        roundelParam = 'p3_img=';
                        imageRoundelIndex = 3;
                        break;
                    case 'Top Right':
                        roundelParam = 'p4_img=';
                        imageRoundelIndex = 4;
                        break;
                }

                const roundelRatio = roundel[x].roundelRatio;
                roundelParam +=
                    roundel[x].roundel.name +
                    (roundelRatio
                        ? '&roundelRatio' + imageRoundelIndex + '=' + roundelRatio
                        : '');
                roundelParams.push(roundelParam);
            }

            return roundelParams.join('&');
        } else {
            return '';
        }
    }

    const getImageHost = (host: string) => {
        if (host === 'i1.adis.ws') {
            return 'cdn.media.amplience.net';
        }
        return host;
    }

    const buildSrcUrl = ({ width, poiAspect, format }: any) => {
        let baseUrl = `https://${getImageHost(image.defaultHost)}/i/${image.endpoint}/${encodeURIComponent(image.name)}`;
        if (seoText) {
            baseUrl += `/${encodeURIComponent(seoText)}`
        };
        let queryString = `w=${width}&upscale=false&strip=true`;
        if (display == 'Point of Interest' && poiAspect) {
            queryString += `&{($root.layer0.metadata.pointOfInterest.w==0)?0.5:$root.layer0.metadata.pointOfInterest.x},{($root.layer0.metadata.pointOfInterest.w==0)?0.5:$root.layer0.metadata.pointOfInterest.y},{$root.layer0.metadata.pointOfInterest.w},{$root.layer0.metadata.pointOfInterest.h}&scaleFit=poi&sm=aspect&aspect=1:1&aspect=${poiAspect}`
        }
        if (query) {
            queryString += `&${query}`;
        }
        if (roundel && roundel[0] && roundel[0].roundel && roundel[0].roundelPosition && roundel[0].roundelRatio) {
            queryString += `&$roundel$&${getRoundelConfig(roundel)}`
        }
        return getImageURL(`${baseUrl}?${queryString}`);
    };

    const source = ({ minWidth, maxWidth, width, highDensityWidth, format, poiAspect }: any) => {
        return <source srcSet={`${buildSrcUrl({ width, format, poiAspect })} 1x, ${buildSrcUrl({ width: highDensityWidth, format, poiAspect })}`}
            media={minWidth ? `(min-width: ${minWidth}px)` : (maxWidth ? `(max-width: ${maxWidth}px)` : undefined)}
            type={format ? `image/${format}` : undefined} />;
    };

    const imageTag = display == 'Static' ? (
        <picture className="amp-dc-image">
            <img loading="lazy" src={`//${image.endpoint}.a.bigcontent.io/v1/static/${image.name}`} className="amp-dc-image-pic" alt={imageAltText} title={seoText}/>
        </picture>
    ) : (
            <picture className="amp-dc-image">
                {/* High density widths selected to be below max avif image size at aspect ratio. (2.5mil pixels) */}
                {source({ minWidth: '1280', width: '1500', highDensityWidth: '2234', poiAspect: '2:1' })}
                {source({ minWidth: '1024', width: '1280', highDensityWidth: '2234', poiAspect: '2:1' })}
                {source({ minWidth: '768', width: '1024', highDensityWidth: '1920', poiAspect: '1.5:1' })}
                {source({ maxWidth: '768', width: '768', highDensityWidth: '1536', poiAspect: '1:1' })}

                <img loading="lazy" src={buildSrcUrl({ width: '1600' })} className="amp-dc-image-pic" alt={imageAltText} title={seoText} />
            </picture>
        );

    return <Box style={{position: 'relative', width: 'auto'}}>
        {imageTag}
    </Box>
}

export default Image;