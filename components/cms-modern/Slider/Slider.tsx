import { CarouselProvider, Dot, Slider as PureSlider, Slide } from 'pure-react-carousel';
import ContentBlock from '../ContentBlock';
import { Box } from '@mui/material';
import clsx from 'clsx';
import SliderNextButton from './SliderNextButton';
import SliderBackButton from './SliderBackButton';

interface Props {
    className?: string;
    loop: boolean;
    navigationDots: boolean;
    slides: any[];
}

const Slider = ({ className, loop = false, navigationDots, slides = [] }: Props) => {
    return (
        <Box className={clsx(className)}>
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={50}
                visibleSlides={1}
                totalSlides={slides.length}
                infinite={loop}
                isPlaying={loop}
                interval={5000}
            >
                <PureSlider>
                    {slides.map((slide: any, index: number) => {
                        return (
                            <Slide key={index} index={index}>
                                <ContentBlock content={slide} />
                            </Slide>
                        );
                    })}
                </PureSlider>
                <SliderBackButton />
                <SliderNextButton />
                <Box style={{ textAlign: 'center', paddingTop: 15, paddingBottom: 30 }}>
                    {navigationDots &&
                        slides.map((slide: any, index: number) => {
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

export default Slider;
