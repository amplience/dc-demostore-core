import React, { FC } from 'react'
import { ImageStatistics } from './panels/AcceleratedMediaPanel';
import { Theme, Tooltip } from '@mui/material';
import { WithStyles, withStyles } from '@mui/styles';

const styles = (theme: Theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as 'column'
  },
  barBase: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    height: '20px',
    margin: '2px 0',
    overflow: 'hidden',
    fontSize: '12px',
    gap: '5px'
  },
  format: {
    fontSize: '12px',
    marginLeft: '4px'
  },
  size: {
    fontSize: '12px',
    marginRight: '4px',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
});

const colors: { [key: string]: string } = {
  jpeg: '#FFA200',
  webp: '#00B6FF',
  avif: '#65CC02',
  auto: '#8F9496',
  png: '#E94420'
}

interface Props extends WithStyles<typeof styles> {
  stat: ImageStatistics;
}

function getOrderedFormats(stat: ImageStatistics): {key: string, size: number, same: string[], dupe: boolean}[] {
    // Formats ordered by size.
    const formatSizes = Object.keys(stat.sizes).map(key => ({key, size: stat.sizes[key], same: [key], dupe: false}));

    formatSizes.sort((a, b) => a.size - b.size);

    for (let i = 0; i < formatSizes.length; i++) {
      for (let j = 0; j < i; j++) {
        if (formatSizes[i].size == formatSizes[j].size) {
          formatSizes[i].dupe = true;
          formatSizes[i].same.push(formatSizes[j].key);
          formatSizes[j].same.push(formatSizes[i].key);
        }
      }
    }

    return formatSizes;
}

const ImageStatisticsBars: FC<Props> = ({stat, classes}) => {
    const ordered = getOrderedFormats(stat);
    const maxSize = ordered[ordered.length - 1].size;
    const maxKey = ordered[ordered.length - 1].key;
    ordered.reverse();

    return <div className={classes.container}>
        {
          ordered.filter(elem => !elem.dupe).map((elem, index) => {
            const size = elem.size;
            const name = elem.same.join('/');

            return <Tooltip key={elem.key} title={`${name}: ${elem.size} bytes (${Math.round(1000 * elem.size / maxSize) / 10}% of ${maxKey})`}>
              <div className={classes.barBase} style={{backgroundColor: colors[elem.key], width: `${(size / maxSize) * 100}%` }}>
                <span className={classes.format}>{name}</span>
                <span className={classes.size}>{elem.size}</span>
              </div>
            </Tooltip>
          })
        }
    </div>
}

export default withStyles(styles)(ImageStatisticsBars);
