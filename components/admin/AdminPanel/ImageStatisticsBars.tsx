import React, { FC } from 'react'
import { ImageStatistics, typeFromFormat, formatColors } from './ImageStatistics';
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
    color: '#444444',
    height: '20px',
    margin: '2px 0',
    fontSize: '12px',
    gap: '5px'
  },
  format: {
    fontSize: '12px',
    marginLeft: '4px',
    whiteSpace: 'nowrap' as 'nowrap'
  },
  size: {
    fontSize: '12px',
    marginRight: '4px',
  }
});

interface Props extends WithStyles<typeof styles> {
  stat: ImageStatistics;
}

interface OrderedFormat {
  key: string,
  size: number,
  auto: boolean,
  realKey: string | null
}

function getRealType(stat: ImageStatistics, key: string): string | null {
  let type = stat.types[key];

  const realKey = typeFromFormat[type] ?? key;

  return key === 'auto' || realKey == key ? null : realKey;
}

function getOrderedFormats(stat: ImageStatistics): OrderedFormat[] {
    // Formats ordered by size.
    const formatSizes = Object.keys(stat.sizes)
      .sort()
      .filter(key => key !== 'auto')
      .map(key => ({
        key,
        size: stat.sizes[key],
        same: [key],
        auto: key === stat.auto,
        realKey: getRealType(stat, key)
      }));

    formatSizes.sort((a, b) => a.size - b.size);

    return formatSizes;
}

const ImageStatisticsBars: FC<Props> = ({stat, classes}) => {
    const ordered = getOrderedFormats(stat);
    const maxSize = ordered[ordered.length - 1].size;
    const maxKey = ordered[ordered.length - 1].key;
    // ordered.reverse();

    return <div className={classes.container}>
        {
          ordered.map((elem, index) => {
            const size = elem.size;
            const name = elem.key;
            const invalid = elem.realKey != null;
            const titleName = invalid ? `"${name}" (got ${elem.realKey})` : name;
            const title = `${titleName}: ${elem.size} bytes (${Math.round(1000 * elem.size / maxSize) / 10}% of ${maxKey})`;

            return <Tooltip key={elem.key} title={title}>
              <div className={classes.barBase} style={{
                backgroundColor: formatColors[invalid ? 'auto' : elem.key],
                width: `${(size / maxSize) * 100}%`,
                outline: invalid ? '1px solid red' : ''
              }}>
                <span>
                  <span className={classes.format} style={{textDecoration: invalid ? 'line-through' : ''}}>{`${name}${elem.auto ? ' (auto)' : ''}`}</span>
                  {invalid ? <span className={classes.format}>{elem.realKey}</span> : null}
                </span>
                <span className={classes.size}>{elem.size}</span>
              </div>
            </Tooltip>
          })
        }
    </div>
}

export default withStyles(styles)(ImageStatisticsBars);
