import React from 'react';
import { ImageStatistics, formatColors } from './ImageStatistics';
import { Typography } from '@mui/material';

interface ImageStatisticsGraphProps {
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

const ImageStatisticsGraph = ({ stats }: ImageStatisticsGraphProps) => {
    const formats = getAllFormats(stats);
    const maxSize = getMaxSize(stats);
    const minSize = getMinSize(stats);

    return (
        <table
            style={{
                width: '100%',
                margin: '12px 0px',
            }}
        >
            <thead>
                <tr>
                    <th
                        style={{
                            width: '0',
                        }}
                    ></th>
                    <th
                        style={{
                            textAlign: 'center' as 'center',
                        }}
                    >
                        Images Weight (bytes)
                    </th>
                </tr>
            </thead>
            <tbody>
                {formats.map((format) => {
                    const size = sumSizes(stats, format);
                    return (
                        <tr key={format}>
                            <td
                                style={{
                                    textAlign: 'end' as 'end',
                                    verticalAlign: 'middle',
                                    borderRight: '1px solid gray',
                                    paddingRight: '4px',
                                }}
                            >
                                {format}
                            </td>
                            <td>
                                <div
                                    style={{
                                        padding: '4px 0px 4px 4px',
                                        color: '#444444',
                                        width: `${(100 * size) / maxSize}%`,
                                        backgroundColor: formatColors[format],
                                    }}
                                >
                                    <Typography variant="caption">{size}</Typography>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ImageStatisticsGraph;
