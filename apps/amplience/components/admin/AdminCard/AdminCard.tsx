import React, { PropsWithChildren } from "react";
import { Theme, Card } from "@mui/material";
import { withStyles, WithStyles } from "@mui/styles";
import clsx from "clsx";

const styles = (theme: Theme) => ({
  root: {
    borderLeft: `6px solid ${theme.palette.primary.main}`,
    width: "100%",
    marginBottom: theme.spacing(),
  },
});

interface Props extends PropsWithChildren<WithStyles<typeof styles>> {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const AdminCard: React.FC<Props> = (props) => {
  const { classes, className, children, ...other } = props;

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      {children}
    </Card>
  );
};

export default withStyles(styles)(AdminCard);
