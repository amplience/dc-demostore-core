import React, { useMemo } from "react";
import { Theme } from "@mui/material";
import { CmsContent } from "@lib/cms/CmsContent";
import { ContentBlock } from "@components/cms-modern";
import { withStyles, WithStyles } from "@mui/styles";

const styles = (theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row" as "row",
    flexBasis: 1,
    flex: 1,

    [theme.breakpoints.down("md")]: {
      flexDirection: "column" as "column",
      alignItems: "unset",
    },
  },
  column: {
    [theme.breakpoints.down("md")]: {
      maxWidth: "100% !important",
    },
    paddingTop: "20px",
  },
});

interface Props extends WithStyles<typeof styles> {
  className?: string;
  style?: React.CSSProperties;

  split: string;
  bgcol: string;
  content: CmsContent[];
}

const SplitBlock: React.FC<Props> = (props) => {
  const { classes, split = "50/50", bgcol, content = [], ...other } = props;

  const splits = useMemo(() => {
    return split.split("/").map((x) => Number(x) / 100);
  }, [split]);

  return (
    <div className={classes.root} style={{ backgroundColor: bgcol }}>
      {content.map((content, index) => {
        return (
          <div
            key={index}
            className={classes.column}
            style={{ flex: splits[index], maxWidth: `${splits[index] * 100}%` }}
          >
            <ContentBlock content={content} />
          </div>
        );
      })}
    </div>
  );
};

export default withStyles(styles)(SplitBlock);
