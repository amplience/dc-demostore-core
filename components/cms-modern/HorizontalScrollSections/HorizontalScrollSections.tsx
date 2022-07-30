// Generated with util/create-component.js
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { CmsContent } from '@lib/cms/CmsContent';
import { withStyles, WithStyles } from '@mui/styles'
import { Theme } from '@mui/material';
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

  return (
    <div className="hss-appli" style={{height}}>
        <section className="hss-section">
            <div className="hss-horizontal-container" ref={itemRef}>
                {items.map((i) => (
                <div className="hss-item">{i}</div>
                ))}
            </div>
        </section>
    </div>
  )
};

export default withStyles(styles)(HorizontalScrollSections);