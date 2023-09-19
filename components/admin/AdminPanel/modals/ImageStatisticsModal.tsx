import React, { FC, useState } from "react";
import { useUI } from "../../../ui/UIContext";
import { ImageStatistics } from "../panels/AcceleratedMediaPanel";
import { Button, Chip, Divider, Typography } from "@mui/material";

const expectedTypes: { [key: string]: string } = {
  webp: 'image/webp',
  jpeg: 'image/jpeg',
  png: 'image/png',
  avif: 'image/avif'
};

function getMaxSize(stat: ImageStatistics): number {
  let maxSize = 0;

  for (const key of Object.keys(stat.sizes)) {
    maxSize = Math.max(maxSize, stat.sizes[key]);
  }

  return maxSize;
}

function isLowest(stat: ImageStatistics, key: string): boolean {
  let minSize = stat.sizes[key];

  for (const key of Object.keys(stat.sizes)) {
    if (stat.sizes[key] < minSize) {
      return false;
    }
  }

  return true;
}

function isValid(stat: ImageStatistics, key: string): boolean {
  let type = stat.types[key];

  return key === 'auto' || type === expectedTypes[key];
}

interface Props {
  stats: ImageStatistics[];
  onClose: () => void;
}

const ImageStatisticsModal: FC<Props> = ({ stats, onClose }) => {
  return (
    <>
      <h2>Image Statistics</h2>
      <div className="af-form-field">
        {stats.map((stat) => {
          const maxSize = getMaxSize(stat);

          return (
            <>
              <Divider sx={{ margin: "10px" }} />
              <Typography component="p">{stat.name}</Typography>
              {Object.keys(stat.sizes)
                .sort()
                .map((key) => {
                  const size = stat.sizes[key];
                  const pctMax = size / maxSize;
                  const lowest = isLowest(stat, key);
                  const valid = isValid(stat, key);

                  return (
                    <Chip
                      key={key}
                      label={`${key}: ${Math.round(pctMax * 1000) / 10}%`}
                      size="small"
                      color={valid ? (lowest ? "success" : "primary") : "error"}
                      variant={lowest ? "filled" : "outlined"}
                    />
                  );
                })}
            </>
          );
        })}
      </div>
      <Button variant="contained" color="primary" onClick={onClose} size='small'>
        Done
      </Button>
    </>
  );
};

export default ImageStatisticsModal;
