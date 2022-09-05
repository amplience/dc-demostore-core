import React from "react";
import { DefaultAdaptiveImageSkeleton } from "../AdaptiveImage";

const SkeletonMapping: any = {
  "https://demostore.amplience.com/content/simple-banner":
    DefaultAdaptiveImageSkeleton,
  "https://demostore.amplience.com/content/simple-localized-banner":
    DefaultAdaptiveImageSkeleton,
};

interface Props {
  className?: string;
  style?: React.CSSProperties;
  schema: string;
}

const ContentBlockSkeleton: React.FC<Props> = (props) => {
  const { schema, ...other } = props;

  const Component = SkeletonMapping[schema];

  return Component ? <Component {...other} /> : null;
};

export default ContentBlockSkeleton;
