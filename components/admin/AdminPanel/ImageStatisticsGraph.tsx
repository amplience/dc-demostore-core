import React from 'react';
import { ImageStatistics, formatColors } from './ImageStatistics';
import { Theme, Typography } from '@mui/material';

const styles = (theme: Theme) => ({
    table: {
        width: '100%',
        margin: '12px 0px',
    },
    formatHead: {
        width: '0',
    },
    weightHead: {
        textAlign: 'center' as 'center',
    },
    format: {
        textAlign: 'end' as 'end',
        verticalAlign: 'middle',
        borderRight: '1px solid gray',
        paddingRight: '4px',
    },
    bar: {
        padding: '4px 0px 4px 4px',
        color: '#444444',
    },
});

interface Props {
    classes?: any;
    stats: ImageStatistics[];
}

function getAllFormats(stats: ImageStatistics[]) {
    const obj: { [key: string]: boolean } = {};

    for (const stat of stats) {
        const keys = Object.keys(stat.sizes);
        for (const key of keys) {
            obj[key] = true;
        }
    }

    return Object.keys(obj).sort();
}

function getMaxSize(stats: ImageStatistics[]) {
    const sizes: { [key: string]: number } = {};
    let maxSize = 0;

    for (const stat of stats) {
        const keys = Object.keys(stat.sizes);
        for (const key of keys) {
            sizes[key] = (sizes[key] ?? 0) + stat.sizes[key];

            maxSize = Math.max(maxSize, sizes[key]);
        }
    }

    return maxSize;
}

function sumSizes(stats: ImageStatistics[], format: string) {
    let size = 0;

    for (const stat of stats) {
        size += stat.sizes[format] ?? 0;
    }

    return size;
}

function getMinSize(stats: ImageStatistics[]): number {
    const sizes: { [key: string]: number } = {};

    for (const stat of stats) {
        const keys = Object.keys(stat.sizes);
        for (const key of keys) {
            sizes[key] = (sizes[key] ?? 0) + stat.sizes[key];
        }
    }

    let minSize = Infinity;
    for (const key of Object.keys(sizes)) {
        if (sizes[key] < minSize) {
            minSize = sizes[key];
        }
    }

    return minSize;
}

const ImageStatisticsGraph = ({ stats, classes }: Props) => {
    const formats = getAllFormats(stats);
    const maxSize = getMaxSize(stats);
    const minSize = getMinSize(stats);

    return (
        <table className={classes?.table}>
            <tr>
                <th className={classes?.formatHead}></th>
                <th className={classes?.weightHead}>Images Weight (bytes)</th>
            </tr>
            {formats.map((format) => {
                const size = sumSizes(stats, format);
                return (
                    <tr key={format}>
                        <td className={classes?.format}>{format}</td>
                        <td>
                            <div
                                className={classes?.bar}
                                style={{ width: `${(100 * size) / maxSize}%`, backgroundColor: formatColors[format] }}
                            >
                                <Typography variant="caption">{size}</Typography>
                            </div>
                        </td>
                    </tr>
                );
            })}
        </table>
    );
};

export default ImageStatisticsGraph;
