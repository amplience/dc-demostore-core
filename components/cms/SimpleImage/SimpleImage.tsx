import React, { FC } from 'react'
import { CmsContent } from '@lib/cms/CmsContent';

type Props = {

} & CmsContent;

const SimpleImage: FC<Props> = ({
    image,
    imageref,
    mobileImage,
    mobileimageref,
    gifImage,
    imageAltText,
    seoText
}) => {

    // Fallbacks if no mobile
    var mimg = mobileImage ? mobileImage : image?.image;
    var dimg = image?.image;

    // fallbacks for image ref
    var mimgrefstr = mobileimageref ? mobileimageref : imageref;
    var dimgrefstr = imageref;

    // amplience url base str
    var mampstr = gifImage ? 'https://willow.a.bigcontent.io/v1/static/' + mimg?.endpoint : 'https://' + mimg?.defaultHost + '/i/' + mimg?.endpoint + '/' + mimg?.name;
    var dampstr = gifImage ? 'https://willow.a.bigcontent.io/v1/static/' + dimg?.endpoint : 'https://' + dimg?.defaultHost + '/i/' + dimg?.endpoint + '/' + dimg?.name;

    // choose betweem image
    var mimgstr = mimg ? mampstr : mimgrefstr
    var dimgstr = dimg ? dampstr : dimgrefstr

    // check end result for external for logic below in picture tag
    var isExtM = mimgstr == mimgrefstr;
    var isExtD = dimgstr == dimgrefstr;

    return (
        <picture>
            <source srcSet={isExtM ? mimgstr : mimgstr + '/' + seoText + '.webp?fmt.jpeg.chroma=1,1,1'} media="(max-width: 768px)" type="image/webp"/>
            <source srcSet={isExtM ? mimgstr : mimgstr + '/' + seoText + '.jpg?fmt.jpeg.chroma=1,1,1'} media="(max-width: 768px)"/>
            <source srcSet={isExtD ? dimgstr : dimgstr + '/' + seoText + '.webp?fmt.jpeg.chroma=1,1,1'} media="(min-width: 768px)" type="image/webp"/>
            <source srcSet={isExtD ? dimgstr : dimgstr + '/' + seoText + '.jpg?fmt.jpeg.chroma=1,1,1'} media="(min-width: 768px)"/>
            <img src={isExtM ? mimgstr : mimgstr + '/' + seoText + '.jpg?fmt.jpeg.chroma=1,1,1'} width="100%" alt={imageAltText} />
        </picture>
    )
}

export default SimpleImage;