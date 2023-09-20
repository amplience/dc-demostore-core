import React, { FC, useState } from "react";
import { CSVLink } from "react-csv";
import { ImageStatistics } from "../panels/AcceleratedMediaPanel";
import { Button, Card, CardContent, CardMedia, Chip, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import ImageStatisticsStack from "../ImageStatisticsStack";
import { getImageURL } from "@utils/getImageURL";
import {
  ListOutlined,
  AppsOutlined
} from '@mui/icons-material'

const expectedTypes: { [key: string]: string } = {
  webp: 'image/webp',
  jpeg: 'image/jpeg',
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
  const [gridView, setGridView] = useState(true)

  const headers = [
    { label: "Name", key: "name" },
    { label: "Source", key: "src" }
  ];

  Object.keys(expectedTypes).forEach((key: string) => {
    headers.push({
      label: key,
      key
    })
    headers.push({
      label: '% of max',
      key: `${key}_pct_of_max`
    })
    headers.push({
      label: 'Valid',
      key: `${key}_valid`
    })
    headers.push({
      label: 'Lowest',
      key: `${key}_lowest`
    })
  })

  const data: any = []
  stats.forEach((stat, index) => {
    const entry: any = {}
    entry['name'] = stat.name
    entry['src'] = stat.src
    const maxSize = getMaxSize(stat);
    Object.keys(expectedTypes).forEach((key: string) => {
      const size = stat.sizes[key];
      const pctMax = size / maxSize;
      const lowest = isLowest(stat, key);
      const valid = isValid(stat, key);
      const pct = `${Math.round(pctMax * 1000) / 10}%`
      entry[key] = size
      entry[`${key}_pct_of_max`] = pct
      entry[`${key}_valid`] = valid
      entry[`${key}_lowest`] = lowest
    })
    data.push(entry)
  })

  const csvReport = {
    data: data,
    headers: headers,
    filename: 'demsostore-accelerated-media-report.csv'
  };

  return (
    <div>
      <h2>Image Statistics</h2>
      <p>{stats.length} Amplience Images detected.</p>
      <IconButton size="small" onClick={() => setGridView(!gridView)}>
        {gridView && <ListOutlined />}
        {!gridView && <AppsOutlined />}
      </IconButton>
      <CSVLink {...csvReport}>Export to CSV</CSVLink>
      {gridView &&
        <div className="af-form-field" style={{ height: '70vh', width: '90vw', overflow: 'hidden auto' }}>
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
                    <CardContent sx={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <Typography sx={{ fontSize: 14, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'noWrap' }} color="text.secondary" gutterBottom>
                        {stat.name}
                      </Typography>
                      <ImageStatisticsStack stat={stat} />
                    </CardContent>
                  </Card>
                </Grid>
              })
            }
          </Grid>
        </div>
      }
      {!gridView &&
        <div style={{ height: '70vh', width: '90vw', overflow: 'hidden auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    borderBottom: 'none',
                    fontWeight: 'bold'
                  }}
                  component='th'>
                  Media
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: 'none',
                    fontWeight: 'bold'
                  }}
                  component='th'>
                  Name
                </TableCell>
                {
                  Object.keys(expectedTypes).map((key: string) => {
                    return (
                      <>
                        <TableCell
                          sx={{
                            borderBottom: 'none',
                            fontWeight: 'bold'
                          }}
                          component='th'>
                          {key}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderBottom: 'none',
                            fontWeight: 'bold'
                          }}
                          component='th'>
                          % of max
                        </TableCell>
                      </>
                    )
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                stats.map((stat, index) => {
                  const maxSize = getMaxSize(stat);
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <img src={getImageURL(stat.src, { width: 32, height:32 }, true)} width={32} height={32} alt={stat.name} />
                      </TableCell>
                      <TableCell>
                        {stat.name}
                      </TableCell>
                      {
                        Object.keys(expectedTypes).map((key: string) => {
                          const size = stat.sizes[key];
                          const pctMax = size / maxSize;
                          const lowest = isLowest(stat, key);
                          const valid = isValid(stat, key);
                          return (
                            <>
                              <TableCell>
                                {stat.sizes[key]}
                              </TableCell>
                              <TableCell>
                                <Chip
                                  key={key}
                                  label={`${Math.round(pctMax * 1000) / 10}%`}
                                  size="small"
                                  color={valid ? (lowest ? "success" : "primary") : "error"}
                                  variant={lowest ? "filled" : "outlined"}
                                />
                              </TableCell>
                            </>
                          )
                        })
                      }
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
      }
      <div style={{ height: '100%', display: 'flex', justifyContent: 'end' }}>
        <Button variant="contained" color="primary" onClick={onClose} size='small'>
          Done
        </Button>
      </div>
    </div>
  );
};

export default ImageStatisticsModal;
