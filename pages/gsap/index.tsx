import React, { useEffect } from 'react';
import { Layout } from '@components/core';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import fetchStandardPageData from '@lib/page/fetchStandardPageData';
import { PageContent } from '@components/ui';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const data = await fetchStandardPageData(
        {
            content: {},
        },
        context
    );

    return {
        props: {
            ...data,
        },
    };
}

export default function GSAP({
    content
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    useEffect(() => {

        gsap.utils.toArray(".comparisonSection").forEach((section: any) => {
            let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "center center",
                // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
                        end: () => "+=" + section.offsetWidth, 
                        scrub: true,
                        pin: true,
                anticipatePin: 1
                    },
                    defaults: {ease: "none"}
                });
            // animate the container one way...
            tl.fromTo(section.querySelector(".afterImage"), { xPercent: 100, x: 0}, {xPercent: 0})
              // ...and the image the opposite way (at the same time)
              .fromTo(section.querySelector(".afterImage img"), {xPercent: -100, x: 0}, {xPercent: 0}, 0);

        });

        gsap.to('.c', {
            scrollTrigger: {
                trigger: '.c',
                start: 'top center',
                end: 'bottom 100px',
                scrub: 1,
                pin: true,
                toggleActions: 'play pause reverse pause',
                markers: true
            },
            x: 400,
            rotation: 360,
            duration: 3
        });

        gsap.registerPlugin(ScrollTrigger);

let getRatio = (el: any) => window.innerHeight / (window.innerHeight + el.offsetHeight);

gsap.utils.toArray("section").forEach((section: any, i: number) => {
  section.bg = section.querySelector(".bg"); 

  if (section.bg) {

    // Give the backgrounds some random images
    section.bg.style.backgroundImage = `url(https://picsum.photos/1600/800?random=${i})`;
    
    // the first image (i === 0) should be handled differently because it should start at the very top.
    // use function-based values in order to keep things responsive
    gsap.fromTo(section.bg, {
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
                <div>
                <section className="parallax">
                <div className="bg"></div>
                <h1>Simple parallax sections</h1>
                </section>
                <section className="parallax">
                <div className="bg"></div>
                <h1>Hey look, a title</h1>
                </section>
                <section className="parallax">
                <div className="bg"></div>
                <h1>They just keep coming</h1>
                </section>
                <section className="parallax">
                <div className="bg"></div>
                <h1>So smooth though</h1>
                </section>
                <section className="parallax">
                <div className="bg"></div>
                <h1>Nice, right?</h1>
                </section>
            <div className="comparisonSection" style={{maxWidth: 1440, margin: "0 auto"}}>
            <div className="comparisonImage beforeImage">
                <img src="https://assets.codepen.io/16327/before.jpg" alt="before"/>
            </div>
            <div className="comparisonImage afterImage">
                <img src="https://assets.codepen.io/16327/after.jpg" alt="after"/>
            </div>
            </div>
            <div style={{paddingBottom: 250}}>Hello!</div>
            <div style={{width: 100, padding: 40, marginBottom: 150, backgroundColor: 'red'}} className='a'>A</div>
            <div style={{width: 100, padding: 40, marginBottom: 150, backgroundColor: 'green'}} className='b'>B</div>
            <div style={{width: 100, padding: 40, marginBottom: 150, backgroundColor: 'blue'}} className='c'>C</div>
            <div style={{width: 100, padding: 40, marginBottom: 150, backgroundColor: 'yellow'}} className='d'>D</div>
            </div>
    );
}

GSAP.Layout = Layout;
