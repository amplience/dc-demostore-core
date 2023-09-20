import React, { FC, useState } from "react";
import { CSVLink } from "react-csv";
import { ImageStatistics } from "../ImageStatistics";
import { Box, Button, Card, CardContent, CardMedia, Chip, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import ImageStatisticsStack from "../ImageStatisticsStack";
import { getImageURL } from "@utils/getImageURL";
import {
  ListOutlined,
  AppsOutlined,
  FileDownload
} from '@mui/icons-material'
import ImageStatisticsBars from "../ImageStatisticsBars";

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
    <div style={{
      width: '95vw',
      height: '95vh',
      margin: '20px auto',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '15px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden auto'
    }}>
      <Typography variant="h4">Image Statistics</Typography>
      <Typography variant="body1">{stats.length} Amplience image{stats.length > 1 && 's'} detected.</Typography>
      {gridView &&
        <div className="af-form-field" style={{ marginTop: '10px', maxHeight: '70vh', overflow: 'scroll' }}>
          <Grid container spacing={2} columns={{ xs: 4, sm: 6, md: 8, xl: 12 }}>
            {
              stats.map((stat, index) => {
                const maxSize = getMaxSize(stat);

                return <Grid item xs={2} key={index}>
                  <Card sx={{ mt: 1, mb: 1 }}>
                    <a href={stat.src} target="_blank" rel="noreferrer">
                      <CardMedia
                        sx={{ aspectRatio: '1' }}
                        image={stat.src}
                        title="green iguana"
                      />
                    </a>
                    <CardContent sx={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <Typography sx={{ fontSize: 14, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'noWrap' }} color="text.secondary" gutterBottom>
                        {stat.name}
                      </Typography>
                      <ImageStatisticsBars stat={stat} />
                    </CardContent>
                  </Card>
                </Grid>
              })
            }
          </Grid>
        </div>
      }
      {!gridView &&
        <div className="af-form-field" style={{ marginTop: '10px', maxHeight: '70vh', overflow: 'scroll' }}>
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
                        <a href={stat.src} target="_blank" rel="noreferrer">
                          <img src={getImageURL(stat.src, { width: 32, height: 32 }, true)} width={32} height={32} alt={stat.name} />
                        </a>
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
      <div style={{ flexGrow: 1 }} />
      <div style={{ paddingTop: '12px', display: 'flex', justifyContent: 'end' }}>

        <Button
          sx={{ m: 1, mb: 2 }}
          title={gridView ? 'List View' : 'Grid View'}
          variant='outlined'
          startIcon={gridView ? <ListOutlined /> : <AppsOutlined />}
          onClick={() => setGridView(!gridView)}
          size="small"
        >
          {gridView ? 'List View' : 'Grid View'}
        </Button>

        <Button
          sx={{ m: 1, mb: 2 }}
          title='Export as CSV'
          variant='outlined'
          startIcon={<FileDownload />}
          size="small"
        >
          <CSVLink {...csvReport}>Export as CSV</CSVLink>
        </Button>

        <Button
          sx={{ m: 1, mb: 2 }}
          variant="contained" color="primary" onClick={onClose} size='small'>
          Done
        </Button>
      </div>
    </div>
  );
};

export default ImageStatisticsModal;
