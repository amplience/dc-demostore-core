import React, { FC } from "react";
import clsx from "clsx";
import { useContentAnalytics } from "@lib/analytics";

interface Props {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: "outlined" | "contained";
  children?: React.ReactNode;
}

const Layout: FC<Props> = ({
  children,
  href,
  className,
  variant = "outlined",
  ...other
}) => {
  const { trackEvent } = useContentAnalytics();

  const handleTrack = (e: any) => {
    trackEvent({
      category: "Content",
      action: "ClickCta",
      label: href,
    });
  };

  return (
    <a
      onClick={handleTrack}
      href={href}
      className={clsx(
        `af-call-to-action`,
        {
          ["af-call-to-action-dark"]: variant === "contained",
        },
        className
      )}
      {...other}
    >
      {children}
    </a>
  );
};

export default Layout;
