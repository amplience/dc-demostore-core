// Generated with util/create-component.js
import React, { useEffect } from "react";
import { Grid, CardContent, Typography, Card as MuiCard, CardActions, Button, Box } from '@mui/material';
import { CmsContent } from '@lib/cms/CmsContent';
import { withStyles, WithStyles } from '@mui/styles'
import { Theme } from '@mui/material';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

interface ParallaxSectionsProps extends WithStyles<typeof styles> {
    className?: string;

    /**
     * List of Cards
     */
    cards?: CmsContent[];
}

const ParallaxSections: React.FC<ParallaxSectionsProps> = ({ 
  cards,
  classes
}) => {
    useEffect(() => {
        let getRatio = (el: any) => window.innerHeight / (window.innerHeight + el.offsetHeight);
        gsap.utils.toArray("section").forEach((section: any, i: number) => {
            section.parallaxBg = section.querySelector(".parallaxBg"); 
            if (section.parallaxBg) {

                // use function-based values in order to keep things responsive
                gsap.fromTo(section.parallaxBg, {
                    backgroundPosition: () => i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px"
                }, {
                    backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
                    ease: "none",
                    scrollTrigger: {
                    trigger: section,
                    start: () => i ? "top bottom" : "top top", 
                    end: "bottom top",
                    scrub: true,
                    invalidateOnRefresh: true // to make it responsive
                    }
                });
            }
        });
    }, []);

  return (
      <Box data-testid="ParallaxSections" className={classes.root}>
        {
            cards?.map((card: any, index: number) => {
                return (
                    <section className="parallax" key={Math.random().toString(36).substr(2, 9)}>
                        <div className="parallaxBg" style={{
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
                    </section>
                )
            })
        }
      </Box>
  )
};

export default withStyles(styles)(ParallaxSections);