import React from "react";
import { Theme } from "@mui/material";
import { withStyles, WithStyles } from "@mui/styles";

const styles = (theme: Theme) => ({
  root: {
    marginTop: 10,
  },
  header: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #000",
    cursor: "pointer",
    padding: "10px 47.6px 10px 20px",
  },
  headerText: {
    "&::before": {
      content: '"+"',
      fontSize: 20,
      position: "absolute",
      display: "inline-block",
      right: 20,
      top: 15,
    },
  },
  body: {
    padding: "15px 0px 0px 15px",
    display: "inline-block",
  },
});

interface Props extends WithStyles<typeof styles> {
  className?: string;
  style?: React.CSSProperties;
  title: string;
}

const Accordion: React.FC<Props> = (props) => {
  const { classes, title, children, ...other } = props;

  if (!React.Children.count(children)) {
    return <></>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <span className={classes.headerText}>{title}</span>
      </div>
      <div className={classes.body}>{children}</div>
    </div>
  );
};

export default withStyles(styles)(Accordion);
