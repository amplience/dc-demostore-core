import React from "react";
import { Theme, Paper } from "@mui/material";
import { withStyles, WithStyles } from "@mui/styles";
import clsx from "clsx";
import { alpha } from "@mui/material/styles";

const styles = (theme: Theme) => ({
  root: {},
  background: {
    position: "fixed" as "fixed",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 1100,
    transition: "all 200ms ease-out",
    display: "none",

    "&$open": {
      background: alpha(theme.palette.common.black, 0.3),
      display: "unset",
    },
  },
  panel: {
    position: "fixed" as "fixed",
    width: 300,
    bottom: 0,
    top: 0,
    zIndex: 1100,
    transition: "all 200ms ease-out",
  },
  left: {
    left: -300,
    "&$open": {
      left: 0,
    },
  },
  right: {
    right: -300,
    "&$open": {
      right: 0,
    },
  },
  paper: {
    width: "100%",
    height: "100%",
    overflowY: "auto" as "auto",
  },

  open: {},
});

interface Props extends WithStyles<typeof styles> {
  className?: string;
  style?: React.CSSProperties;
  open: boolean;
  variant?: "left" | "right";
  onClose?: () => void;
}

const Sidebar: React.FC<Props> = (props) => {
  const {
    classes,
    variant = "left",
    open,
    children,
    onClose,
    ...other
  } = props;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={classes.root} {...other}>
      <div
        onClick={handleClose}
        className={clsx(classes.background, {
          [classes.open]: open,
        })}
      ></div>
      <aside
        className={clsx(classes.panel, {
          [classes.open]: open,
          [classes.right]: variant === "right",
          [classes.left]: variant === "left",
        })}
      >
        <Paper
          className={classes.paper}
          style={{ width: "100%", height: "100%" }}
          elevation={3}
        >
          {children}
        </Paper>
      </aside>
    </div>
  );
};

export default withStyles(styles)(Sidebar);
