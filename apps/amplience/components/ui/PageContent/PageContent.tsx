import React, { PropsWithChildren } from "react";
import { Theme } from "@mui/material";
import clsx from "clsx";
import { withStyles, WithStyles } from "@mui/styles";

const styles = (theme: Theme) => ({
  root: {
    padding: "0 32px",
    margin: "0 auto",
    maxWidth: 1400,
  },
});

interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
  className?: string;
  style?: React.CSSProperties;
}

const PageContent: React.FC<Props> = (props) => {
  const { classes, className, children, ...other } = props;

  return (
    <div className={clsx(classes.root, className)} {...other}>
      {children}
    </div>
  );
};

export default withStyles(styles)(PageContent);
