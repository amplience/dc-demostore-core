// Generated with util/create-component.js
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { CmsContent } from '@lib/cms/CmsContent';
import { withStyles, WithStyles } from '@mui/styles'
import { Button, Theme, Typography } from '@mui/material';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = ["one", "two", "three", "four"];

const styles = (theme: Theme) => ({
    root: { marginBottom: 30 },
    links: { 
        paddingLeft: 20,
        paddingRight: 20,
        color: "#fff",
        backgroundColor: "#000",
        borderRadius: 3,
        "&:hover": {
            backgroundColor: "#000" 
        }
    },
    linkText: {
        color: "#fff"
    }
});

interface HorizontalScrollSectionsProps extends WithStyles<typeof styles> {
    className?: string;

    /**
     * List of Cards
     */
    cards?: CmsContent[];
}

const HorizontalScrollSections: React.FC<HorizontalScrollSectionsProps> = ({ 
  cards,
  classes
}) => {
    const itemRef = useRef() as MutableRefObject<HTMLDivElement>;
    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (itemRef.current != null) {
            let sections = gsap.utils.toArray(".hss-item");
            if (sections) {
                gsap.to(sections, {
                    xPercent: -100 * (sections.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".hss-section",
                        pin: true,
                        pinSpacing: true,
                        scrub: 1,
                        snap: 1 / (sections.length - 1),
                        end: () => "+=" + itemRef?.current?.offsetWidth
                    }
                });
            }
            setHeight(itemRef?.current?.offsetWidth + itemRef?.current?.offsetHeight);
        }
    }, [itemRef]);

    useEffect(() => {
        function handleResize() {
            if (itemRef.current != null) {
                setHeight(itemRef?.current?.offsetWidth + itemRef?.current?.offsetHeight);
            }
        }
        window.addEventListener('resize', handleResize)
    }, [])

  return (
    <div className="hss-appli" style={{height}}>
        <section className="hss-section">
            <div className="hss-horizontal-container" ref={itemRef}>
                {
                    cards?.map((card: any, index: number) => {
                        return (
                            <div className="hss-item" key={index}>
                                <div className="hss-background" style={{
                                    backgroundImage: `url(https://${card.image.image.defaultHost}/i/${card.image.image.endpoint}/${card.image.image.name})`
                                }}></div>
                                <div style={{paddingBottom: 20}}><h1>{card.cardName}</h1></div>
                                <div>
                                {
                                    card.links && card.links.map((link: any, i: number) => {
                                    if (link.label) {
                                        return (
                                        <Button className={classes.links} href={link.value} key={i}>
                                            <Typography variant="h4" className={classes.linkText}>{link.label}</Typography>
                                        </Button>
                                        )
                                    } else {
                                        return null;
                                    }
                                    })
                                }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    </div>
  )
};

export default withStyles(styles)(HorizontalScrollSections);