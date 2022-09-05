import React, { FC, useState } from "react";
import {
  Theme,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import { StagingEnvironmentFactory } from "dc-delivery-sdk-js";
import { useCmsContext } from "@lib/cms/CmsContext";
import { useAppContext } from "@lib/config/AppContext";
import { withStyles, WithStyles } from "@mui/styles";

const styles = (theme: Theme) => ({
  root: {
    width: "100%",
  },
  formControl: {
    marginBottom: 10,
  },
  input: {},
  progress: {},
});

interface Props extends WithStyles<typeof styles> {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const ContentPreviewPanel: FC<Props> = (props) => {
  const { classes, ...other } = props;

  const { cms } = useAppContext();
  const { stagingApi: cmsContextStagingApi, timestamp } = useCmsContext() || {};

  const { reload, push } = useRouter();

  const [mode, setMode] = useState(() => {
    if (timestamp) {
      return "TIME";
    }
    if (cmsContextStagingApi) {
      return "STAGING";
    }
    return "PRODUCTION";
  });
  const [date, setDate] = useState(() => {
    const dateObject = timestamp ? new Date(Number(timestamp)) : new Date();
    let value = dateObject.toISOString();
    value = value.slice(0, value.lastIndexOf("."));
    return value;
  });
  const [applying, setApplying] = useState(false);

  const handleChangeMode = (e: any) => {
    setMode(e.target.value);
  };

  const handleChangeDate = (e: any) => {
    setDate(e.target.value);
  };

  const handleApply = async () => {
    setApplying(true);

    switch (mode) {
      case "PRODUCTION":
        await fetch("/cms/preview/current");
        break;
      case "STAGING":
        await fetch(`/cms/preview/timestamp?vse=${cms.stagingApi}`);
        break;
      case "TIME":
        const factory = new StagingEnvironmentFactory(cms.stagingApi as string);
        const timestamp = new Date(date).getTime();
        if (timestamp && cms.stagingApi) {
          const stagingEnvironmentAtTimestamp = await factory.generateDomain({
            timestamp: timestamp,
          });
          await fetch(
            `/cms/preview/timestamp?vse=${stagingEnvironmentAtTimestamp}&timestamp=${timestamp}`
          );
        }
        break;
    }

    await push(window.location.href);

    setApplying(false);
  };

  return (
    <>
      <div className={classes.root}>
        <form noValidate>
          <FormControl className={classes.formControl}>
            <InputLabel>Mode</InputLabel>
            <Select
              value={mode}
              onChange={handleChangeMode}
              className={classes.input}
            >
              <MenuItem value={"PRODUCTION"}>Production</MenuItem>
              <MenuItem value={"STAGING"}>Staging</MenuItem>
              <MenuItem value={"TIME"}>Time</MenuItem>
            </Select>
          </FormControl>
          {mode === "TIME" ? (
            <FormControl className={classes.formControl}>
              <TextField
                id="datetime-local"
                label="Start Time"
                type="datetime-local"
                className={classes.input}
                value={date}
                onChange={handleChangeDate}
              />
            </FormControl>
          ) : null}
          <div>
            <Button
              startIcon={
                applying && (
                  <CircularProgress
                    className={classes.progress}
                    size="1em"
                    color="primary"
                  />
                )
              }
              variant="contained"
              color="primary"
              onClick={handleApply}
              disabled={applying}
            >
              Preview
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default withStyles(styles)(ContentPreviewPanel);
