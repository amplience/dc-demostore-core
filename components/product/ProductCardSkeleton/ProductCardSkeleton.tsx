import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ProductCardSkeleton = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column' as 'column',
            }}
        >
            <div
                style={{
                    position: 'relative' as 'relative',
                    paddingTop: '150%',
                }}
            >
                <Skeleton
                    style={{
                        position: 'absolute' as 'absolute',
                        top: 0,
                        bottom: 0,
                        width: '100%',
                    }}
                />
            </div>
            <div
                style={{
                    marginTop: 30,
                    marginBottom: 60,
                }}
            >
                <Skeleton count={3} />
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
