import React, { FC, useState } from "react";
import { ImageStatistics } from "../panels/AcceleratedMediaPanel";
import { Button, Card, CardContent, CardMedia, Chip, Grid } from "@mui/material";

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
      <p>{stats.length} Amplience Images detected.</p>
      <div className="af-form-field" style={{maxHeight: '70vh', overflow: 'hidden auto', boxShadow: 'inset 0px -12px 12px -12px rgba(0,0,0,0.2)', borderRadius: '4px', padding: '10px'}}>
        <Grid container spacing={2} columns={{ xs: 4, sm: 6, md: 8, xl: 12 }}>
          {
            stats.map((stat, index) => {
              const maxSize = getMaxSize(stat);
              
              return <Grid item xs={2} key={index}>
                <Card>
                  <CardMedia
                    sx={{ aspectRatio: '1' }}
                    image={stat.src}
                    title="green iguana"
                  />
                  <CardContent sx={{display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center'}}>
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
                  </CardContent>
                </Card>
              </Grid>
            })
          }
        </Grid>
      </div>
      <div style={{display: 'flex', justifyContent: 'end'}}>
        <Button variant="contained" color="primary" onClick={onClose} size='small'>
          Done
        </Button>
      </div>
    </>
  );
};

export default ImageStatisticsModal;
