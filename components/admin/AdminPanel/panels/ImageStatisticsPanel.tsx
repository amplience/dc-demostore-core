import React, { FC, useState } from 'react';
import { Button, Chip, CircularProgress, Divider, LinearProgress, Theme, Typography } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles'
import ImageStatisticsModal from '../modals/ImageStatisticsModal';
import Modal from '@components/ui/Modal';

export interface ImageStatistics {
  src: string;
  name: string;
  types: { [key: string]: string }
  sizes: { [key: string]: number }
  completed: number,
  total: number
}

const formatTests = ['auto', 'webp', 'jpeg', 'png', 'avif'];

const expectedTypes: { [key: string]: string } = {
  webp: 'image/webp',
  jpeg: 'image/jpeg',
  png: 'image/png',
  avif: 'image/avif'
};

async function DetermineImageSizes(onChange: (stats: ImageStatistics[]) => void) {
  const images = Array.from(document.images);

  const result: ImageStatistics[] = [];

  const promises: Promise<any>[] = [];

  for (const image of images) {
    const src = image.currentSrc;
    try {
      const url = new URL(src);

      const isAmplienceRequest = url.pathname.startsWith('/i/');
      const accountName = url.pathname.split('/')[2];

      if (isAmplienceRequest) {
        const imageResult: ImageStatistics = {
          src,
          name: url.pathname.split('/')[3],
          types: {},
          sizes: {},
          completed: 0,
          total: formatTests.length
        }

        result.push(imageResult);

        onChange(result);

        const formatPromises = formatTests.map(async format => {
          url.searchParams.set('fmt', format);

          const src = url.toString();

          try {
            const response = await fetch(src);

            const headLength = response.headers.get("content-length");
            const size = headLength ? Number(headLength) : (await response.arrayBuffer()).byteLength;
    
            imageResult.sizes[format] = size;
            imageResult.types[format] = response.headers.get("content-type") ?? '';
            imageResult.completed++;

            onChange(result);
          } catch (e) {
            console.log(`Could not scan image ${image.currentSrc}`);
          }
        });

        promises.push(...formatPromises);
      }
    } catch (e) {
      console.log(`Not a valid URL ${image.currentSrc}`);
    }
  }

  onChange(result);

  await Promise.all(promises);

  return result;
}

function getProgress(stats: ImageStatistics[]): number {
  let completed = 0;
  let total = 0;

  for (const stat of stats) {
    completed += stat.completed;
    total += stat.total;
  }

  return 100 * (completed / total);
}

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

const styles = (theme: Theme) => ({
    root: {
        width: '100%'
    },
    formControl: {
        marginBottom: 10
    },
    input: {
    },
    progress: {
    }
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties
}

const ImageStatisticsPanel: FC<Props> = (props) => {
    const {
        classes,
        ...other
    } = props;

    const [calculating, setCalculating] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [result, setResult] = useState<ImageStatistics[]>([]);

    const closeModal = () => {
      setModalOpen(false);
    }

    const openModal = () => {
      setModalOpen(true);
    }

    const startCalculating = async () => {
      setCalculating(true);
      await DetermineImageSizes((result) => { setResult([ ...result ]) });
      setCalculating(false);
    }

    return (<>
        <form noValidate>
            <Button startIcon={calculating && <CircularProgress className={classes.progress} size="1em" color="primary" />} variant="contained" color="primary" onClick={startCalculating} disabled={calculating}>
                Get Image Statistics
            </Button>
            <Modal open={modalOpen} onClose={closeModal}>
              {modalOpen && <ImageStatisticsModal stats={result} />}
            </Modal>
            {
              false && !calculating && result.length > 0 && <>
                <Button variant="contained" color="primary" onClick={openModal}>
                  Open Details
                </Button>
              </>
            }
            {
              result.length > 0 && <>
                <Typography component="p">
                  {result.length} Amplience Images detected.
                </Typography>
                <LinearProgress variant="determinate" value={getProgress(result)} />
                {
                  result.map(stat => {
                    const maxSize = getMaxSize(stat);

                    return <>
                      <Divider sx={{margin: '10px'}} />
                      <Typography component="p">
                        {stat.name}
                      </Typography>
                      {Object.keys(stat.sizes).sort().map(key => {
                        const size = stat.sizes[key];
                        const pctMax = (size / maxSize);
                        const lowest = isLowest(stat, key);
                        const valid = isValid(stat, key);

                        return <Chip 
                          key={key}
                          label={`${key}: ${Math.round(pctMax * 1000) / 10}%`}
                          size="small"
                          color={valid ? (lowest ? 'success' : 'primary') : 'error'}
                          variant={lowest ? 'filled' : 'outlined'}
                          />
                      })}
                    </>
                  })
                }
              </>
            }
        </form>
    </>);
};

export default withStyles(styles)(ImageStatisticsPanel);