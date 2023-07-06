import React, { useEffect, useRef, useState } from "react";
import { Theme, Typography, SwipeableDrawer } from "@mui/material";
import {
  CmsImage,
  ImageScaleMode,
  ImageTransformations,
  ImageScaleFit,
} from "@utils/getImageURL";
import DefaultAdaptiveImage from "../../cms-modern/AdaptiveImage/DefaultAdaptiveImage";
import { Overlay, InfoPanel } from "@components/ui";
import { CallToAction } from "../../cms-modern";
import { DefaultAdaptiveImageSkeleton } from "../../cms-modern/AdaptiveImage";
import { nanoid } from 'nanoid'
import { makeStyles } from '@mui/styles'
import axios from "axios"
import LooksByIds from "../LooksByIds/LooksByIds";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  image: {
    width: "100%",
  },
  imageleft: {
    width: "50%",
  },
  imageright: {
    width: "50%",
    marginLeft: "50%",
  },
  overlay: {
    [theme.breakpoints.down('md')]: {
      position: "unset !important",
      background: "red",
    },
  },
  infoPanel: {
    maxWidth: '100%'
  },
  header: {
  },
  subheader: {
    color: "inherit",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "14px",
  },
  description: {
    fontWeight: 400,
    fontSize: "16px",
    color: "inherit",
    marginTop: 20,
    marginBottom: 20,
  },
  cta: {
    marginTop: "15px !important",
    marginRight: "15px !important",
  }
}));

/**
 * AdvancedBanner Props
 */
export interface AdvancedShoppableBannerProps {
  
  /**
   * Image properties
   */
  image: {
    img: {
      image: ImageTransformations & {
        image: CmsImage;
      };
    };
    disablePoiAspectRatio: boolean;
  };

  /**
   * Background color
   */
  bgcol?: string;

  /**
   * Text lines
   */
  textLines?: [
    {
      text: string;
      variant: "h1" | "h2" | "h3"| "h4"| "h5"| "h6"| "subtitle1"| "subtitle2";
      col: string;
    }
  ];

  /**
   * Overlay panel configuration
   */
  overlaypanel?: {
    opacity?: number;
    col?: string;
    borderStyle?: string;
    offsetH?: string;
    offsetV?: string;
    w?: number;
  };

  /**
   * Call-to-actions configuration
   */
  ctas?: [
    {
      buttonText: string;
      linkUrl: string;
      variant: "h1" | "h2" | "h3"| "h4"| "h5"| "h6"| "subtitle1"| "subtitle2";
    }
  ];

  /**
   * Disclaimer text
   */
  disclaimer?: {
    text: string;
    col: string;
    variant: "h1" | "h2" | "h3"| "h4"| "h5"| "h6"| "subtitle1"| "subtitle2";
    align: "left"| "center"| "right"| "inherit"| "justify";
    fontFamily: string;
  }

  /**
   * Horizontal and vertical text alignment
   */
  textPositioning: {
    textPositionHorizontal: "left" | "center" | "right";
    textPositionVertical: "top" | "middle" | "bottom";
  };

  /**
   * Products for Stylitics
   */

  products?:[]
}

const AdvancedShoppableBanner: React.FC<AdvancedShoppableBannerProps> = ({
  image,
  bgcol,
  textLines,
  ctas,
  overlaypanel,
  textPositioning = {
    textPositionHorizontal: "left",
    textPositionVertical: "middle"
  },
  disclaimer,
  products = [],
  ...other
}) => {
  const classes = useStyles();

  const [imageLoading, setImageLoading] = useState(true);
  const imageRef = useRef<any>();

  const [isLooks, setIsLooks] = useState(false);
  const [showLooks, setShowLooks] = useState(false);

  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  const handleClickLooks = (event: any) => {
    console.log("I should be showing something now")
    setShowLooks(!showLooks)
  }

  useEffect(() => {
    if (imageRef?.current?.complete && imageLoading) {
      setImageLoading(false);
    }

    console.log("what are the products!", products)

    for (let i = 0; i < products?.length; i++) {
      if(isLooks) break
      axios.get('https://widget-api.stylitics.com/api/outfits?username=puma&item_number=531850_01&min=1&max=1&total=1')
      .then((response) => {
        if(response?.data?.length){
          setIsLooks(true)
        }
      })
      
    }

  }, [imageRef?.current?.complete, imageLoading, products]);

  const { img } = image || {};

  const transformations: ImageTransformations = {
    ...img?.image,
    upscale: false,
    strip: true,
    quality: 80,
    scaleMode: !image?.disablePoiAspectRatio
      ? ImageScaleMode.ASPECT_RATIO
      : undefined,
    scaleFit: !image?.disablePoiAspectRatio
      && img?.image?.poi
      && img?.image?.poi.x != -1
      && img?.image?.poi.y != -1
      ? ImageScaleFit.POINT_OF_INTEREST
      : undefined,
  };

  const isOverlayVisible = true; //bannerText?.header || bannerText?.subheader || bannerText?.description || ctaSettings?.buttonText;

  var edgePercHoriz = overlaypanel?.offsetH || '0';
  var edgePercVertical = overlaypanel?.offsetV || '0';

  var panelwidth = overlaypanel?.w ? overlaypanel?.w + 'px' : null;

  var edgepadStyle = {
    right: '',
    left: '',
    top: '',
    bottom: '',
    width: panelwidth
  }
  if (textPositioning?.textPositionHorizontal === 'right') {
    edgepadStyle.right = edgePercHoriz;
  }
  if (textPositioning?.textPositionHorizontal === 'left') {
    edgepadStyle.left = edgePercHoriz;
  }
  if (textPositioning?.textPositionVertical === 'top') {
    edgepadStyle.top = edgePercVertical;
  }
  if (textPositioning?.textPositionVertical === 'bottom') {
    edgepadStyle.bottom = edgePercVertical;
  }

  var newCSS = edgepadStyle as React.CSSProperties;

  var looksCSS = edgepadStyle as React.CSSProperties;
  looksCSS.top = 0
  looksCSS.right = 0
  

  return (
    <div
      className={classes.root}
      {...other}
      style={{ backgroundColor: bgcol ? bgcol : "white" }}
    >
      <Overlay
        variant="responsive"
        floatingHorizontalAlignment={textPositioning?.textPositionHorizontal}
        floatingVerticalAlignment={textPositioning?.textPositionVertical}
        overlayStyle={newCSS}

        overlay={
          isOverlayVisible ? (
            <InfoPanel
              className={classes.infoPanel}
              variant="absolute"
              opacity={overlaypanel?.opacity}
              col={overlaypanel?.col}
              borderStyle={overlaypanel?.borderStyle}
            >
              {textLines?.map((line: any) => {
                return (
                  <Typography
                    key={nanoid()}
                    variant={line.variant}
                    align={line.align}
                    component="h1"
                    className={classes.header}
                    style={{ color: line.col, fontFamily: line.fontFamily, whiteSpace: 'pre-wrap' }}
                  >
                    {line.text}
                  </Typography>
                );
              })}
              {ctas?.map((cta: any) => {
                return (
                  <CallToAction
                    key={cta?.buttonText}
                    href={cta?.linkUrl}
                    className={classes.cta}
                    variant={cta?.variant}
                  >
                    {cta?.buttonText}
                  </CallToAction>
                );
              })}
            </InfoPanel>
          ) : null
        }
      >
        {imageLoading ? <DefaultAdaptiveImageSkeleton /> : null}
        <div style={{ display: `${imageLoading ? "none" : "block"}` }}>
          <DefaultAdaptiveImage
            ref={imageRef}
            onLoad={() => handleImageLoaded()}
            image={img?.image.image}
            transformations={transformations}
            className={classes.image}
          />
        </div>
        <Typography
          variant={disclaimer?.variant}
          align={disclaimer?.align}
          component="h1"
          className={classes.header}
          style={{ color: disclaimer?.col, position: 'absolute', bottom: '5px', width: '100%', fontFamily: disclaimer?.fontFamily }}
        >
          {disclaimer?.text}
        </Typography>
        {
          isLooks ? <a onClick={handleClickLooks}>
          <CallToAction
                key={nanoid()}
                className={classes.cta}
                href='#'
                variant='contained'
                style={{bottom:10, right:0, position:'absolute', zIndex:1}}
              >
                SHOP LOOKS 🛍️
          </CallToAction>
        </a> : null
        }
      </Overlay>

      {
        showLooks ?
        <div>
          <Typography
          variant="h2"
          align="center"
          component="h2"
          className={classes.header}
          style={{ paddingTop: '10px', paddingBottom: '10px', width: '100%'}}
        >
          Looks from Stylitics
        </Typography>
        <LooksByIds products={products}></LooksByIds>
        
        </div> : null
      }

    </div>
  );
};

export default AdvancedShoppableBanner;
