import React, { useState, useEffect, useContext } from 'react';
import { useAppContext } from '@lib/config/AppContext';
import { useCmsContext } from '@lib/cms/CmsContext';
import DynamicBlogListCard from './DynamicBlogListCard';
import { CarouselProvider, Dot, Slider as PureSlider, Slide } from 'pure-react-carousel';
import SliderNextButton from '@components/cms-modern/Slider/SliderNextButton';
import SliderBackButton from '@components/cms-modern/Slider/SliderBackButton';
import { Box } from '@mui/material';
import { useWindowContext } from '@components/core/WithWindowContext/WindowContext';

interface Props {
    header: string;
    numItems: number;
    tags?: { id: string }[];
    query?: string;
    navigationDots?: any;
}

const DynamicBlogList = (props: Props) => {
    const { header, tags, numItems = 3, query, navigationDots, ...other } = props;
    const [results, setResults] = useState([] as any);
    const { algolia, cms } = useAppContext();
    const { stagingApi, locale } = useCmsContext() || {};
    const indexName = stagingApi ? `${cms.hub}.blog-staging` : `${cms.hub}.blog-production`;

    useEffect(() => {
        let searchClient: any;
        if (typeof window !== 'undefined') {
            const { algoliasearch } = window as any;
            searchClient = algoliasearch(algolia.appId, algolia.apiKey);
        }
        searchClient &&
            searchClient
                .search([
                    {
                        indexName,
                        params: {
                            facetFilters: [
                                ...(tags || []).map((x: any) => `snippet.tags.id:${x.id}`),
                                (locale || 'en-US').indexOf('en-') === 0 ? `locale:en-US` : `locale:${locale}`,
                            ],
                            hitsPerPage: numItems,
                        },
                    },
                ])
                .then((response: any) => setResults(response.results?.[0]?.hits || []));
    }, [algolia, tags, numItems, locale, indexName]);

    const windowContext = useWindowContext()

    return (
        <Box {...other}>
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={150}
                isIntrinsicHeight={true}
                visibleSlides={Math.min(results.length, (windowContext.w < 1024 ? (windowContext.w < 768 ? 1 : 2) : 3) )}
                totalSlides={results.length}
                infinite={true}
                isPlaying={false}
            >
                <PureSlider>
                    {results.map((slide: any, index: number) => {
                        return (
                            <Slide key={index} index={index} style={{padding:10}}>
                                <DynamicBlogListCard data={slide}  />
                            </Slide>
                        );
                    })}
                </PureSlider>
                <SliderBackButton />
                <SliderNextButton />
                <Box style={{ textAlign: 'center', paddingTop: 15, paddingBottom: 30 }}>
                    {navigationDots &&
                        results.map((slide: any, index: number) => {
                            return (
                                <Dot
                                    key={index}
                                    slide={index}
                                    style={{
                                        backgroundColor: '#ccc',
                                        overflow: 'hidden',
                                        border: 0,
                                        marginRight: 15,
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                    }}
                                ></Dot>
                            );
                        })}
                </Box>
            </CarouselProvider>
        </Box>
    );
};

export default DynamicBlogList;
