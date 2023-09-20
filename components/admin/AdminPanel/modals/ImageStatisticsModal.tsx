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
  const [gridView, setGridView] = useState(true)

  const headers = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Age", key: "age" }
  ];
   
  const data = [
    { firstName: "Warren", lastName: "Morrow", email: "sokyt@mailinator.com", age: "36" },
    { firstName: "Gwendolyn", lastName: "Galloway", email: "weciz@mailinator.com", age: "76" },
    { firstName: "Astra", lastName: "Wyatt", email: "quvyn@mailinator.com", age: "57" },
    { firstName: "Jasmine", lastName: "Wong", email: "toxazoc@mailinator.com", age: "42" },
    { firstName: "Brooke", lastName: "Mcconnell", email: "vyry@mailinator.com", age: "56" },
    { firstName: "Christen", lastName: "Haney", email: "pagevolal@mailinator.com", age: "23" },
    { firstName: "Tate", lastName: "Vega", email: "dycubo@mailinator.com", age: "87" },
    { firstName: "Amber", lastName: "Brady", email: "vyconixy@mailinator.com", age: "78" },
    { firstName: "Philip", lastName: "Whitfield", email: "velyfi@mailinator.com", age: "22" },
    { firstName: "Kitra", lastName: "Hammond", email: "fiwiloqu@mailinator.com", age: "35" },
    { firstName: "Charity", lastName: "Mathews", email: "fubigonero@mailinator.com", age: "63" }
  ];
   
  const csvReport = {
    data: data,
    headers: headers,
    filename: 'demsostore-maccelerated-media-report.csv'
  };

  return (
    <div style={{
    }}>
      <h2>Image Statistics</h2>
      <p>{stats.length} Amplience Images detected.</p>
      <IconButton size="small" onClick={() => setGridView(!gridView)}>
        {gridView && <ListOutlined />}
        {!gridView && <AppsOutlined />}
      </IconButton>
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
        <CSVLink {...csvReport}>Export to CSV</CSVLink>
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
                        <img src={getImageURL(stat.src, { width: 32, height: 32 })} width={32} alt={stat.name} />
                      </TableCell>
                      <TableCell>
                        {stat.name}
                      </TableCell>
                      {
                        Object.keys(stat.sizes).map((key: string) => {
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
