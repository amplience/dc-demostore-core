import React from 'react';
import { ImageStatistics, typeFromFormat, formatColors } from './ImageStatistics';
import { Tooltip } from '@mui/material';

interface Props {
    stat: ImageStatistics;
}

interface OrderedFormat {
    key: string;
    size: number;
    auto: boolean;
    realKey: string | null;
}

function getRealType(stat: ImageStatistics, key: string): string | null {
    let type = stat.types[key];
    const realKey = typeFromFormat[type] ?? key;

    return key === 'auto' || realKey == key ? null : realKey;
}

function getOrderedFormats(stat: ImageStatistics): OrderedFormat[] {
    const formatSizes = Object.keys(stat.sizes)
        .sort()
        .filter((key) => key !== 'auto')
        .map((key) => ({
            key,
            size: stat.sizes[key],
            same: [key],
            auto: key === stat.auto,
            realKey: getRealType(stat, key),
        }));
    formatSizes.sort((a, b) => a.size - b.size);

    return formatSizes;
}

const ImageStatisticsBars = ({ stat }: Props) => {
    const ordered = getOrderedFormats(stat);
    const maxSize = ordered[ordered.length - 1].size;
    const maxKey = ordered[ordered.length - 1].key;

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column' as 'column',
            }}
        >
            {ordered.map((elem) => {
                const size = elem.size;
                const name = elem.key;
                const invalid = elem.realKey != null;
                const titleName = invalid ? `"${name}" (got ${elem.realKey})` : name;
                const title = `${titleName}: ${elem.size} bytes (${
                    Math.round((1000 * elem.size) / maxSize) / 10
                }% of ${maxKey})`;

                return (
                    <Tooltip key={elem.key} title={title}>
                        <div
                            style={{
                                backgroundColor: formatColors[invalid ? 'auto' : elem.key],
                                width: `${(size / maxSize) * 100}%`,
                                outline: invalid ? '1px solid red' : '',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                color: '#444444',
                                height: '20px',
                                margin: '2px 0',
                                fontSize: '12px',
                                gap: '5px',
                            }}
                        >
                            <span>
                                <span
                                    style={{
                                        fontSize: '12px',
                                        marginLeft: '4px',
                                        whiteSpace: 'nowrap' as 'nowrap',
                                        textDecoration: invalid ? 'line-through' : '',
                                    }}
                                >{`${name}${elem.auto ? ' (auto)' : ''}`}</span>
                                {invalid ? (
                                    <span
                                        style={{
                                            fontSize: '12px',
                                            marginLeft: '4px',
                                            whiteSpace: 'nowrap' as 'nowrap',
                                        }}
                                    >
                                        {elem.realKey}
                                    </span>
                                ) : null}
                            </span>
                            <span
                                style={{
                                    fontSize: '12px',
                                    marginRight: '4px',
                                }}
                            >
                                {elem.size}
                            </span>
                        </div>
                    </Tooltip>
                );
            })}
        </div>
    );
};

export default ImageStatisticsBars;
