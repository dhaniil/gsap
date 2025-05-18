"use client"
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useEffect} from "react";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    useEffect(() => {
        ScrollTrigger.create({
            trigger: '#expanding-section',
            markers: true,
            start: 'top top',
            end: '+=800%',
            scrub: true,
            pin: true,
            onUpdate: (self) => {
                const progress = self.progress;
                gsap.to('.box', {
                    width: `${progress * 100}vw`,
                    duration: 0.1,
                    ease: 'power2.inOut',
                });

                if (progress >= 1) {
                    gsap.to('#section-3', {
                        opacity: (progress - 0.5) * 2,
                        y: 0,
                        duration: 0.1,
                        ease: 'power2.inOut',
                    });

                    gsap.to('#box-content', {
                        opacity: (progress - 0.6) * 2.5,
                        scale: 1,
                        duration: 0.1,
                        ease: 'power2.inOut',
                    });
                } else {
                    gsap.to('#section-3', {
                        opacity: 0,
                        y: 50,
                        duration: 0.1,
                    });

                    gsap.to('#box-content', {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.1,
                    });
                }
            },
        });

        // Animation for regular sections
        gsap.utils.toArray<HTMLElement>('section').forEach((section) => {
            const content = section.querySelector('.content');
            if(content) {
                gsap.fromTo(content, {
                    y: 70,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "expo.in",
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'top 30%',
                        toggleActions: "play none none reverse"
                    }
                });
            }
        });
    }, []);

    return (
        <div className={"relative text-black overflow-x-hidden"}>
            <div className={"fixed inset-0 -z-10 bg-cover bg-center bg-zinc-800"} />
            <section className={"min-h-screen flex items-center justify-center bg-white"}>
                <div className={"content text-2xl font-bold"}>
                    Hero Section
                </div>
            </section>
            <section
                id="expanding-section"
                className="min-h-screen flex flex-col justify-center bg-transparent relative overflow-hidden"
            >
                <div className="box bg-blue-500 h-full w-32 absolute left-1/2 top-0 -translate-x-1/2 z-0 rounded-none">
                    <div id="box-content" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold opacity-0 scale-90 w-full flex items-center justify-center flex-col gap-6">
                        <h2>Content Inside Blue Box</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
                            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg">
                                <h3 className="text-xl mb-3">Feature 1</h3>
                                <p className="text-base font-normal">Description of feature 1 with details and benefits.</p>
                            </div>
                            <div id={""} className="bg-white/20 backdrop-blur-sm p-6 rounded-lg">
                                <h3 className="text-xl mb-3">Feature 2</h3>
                                <p className="text-base font-normal">Description of feature 2 with details and benefits.</p>
                            </div>
                            <div id={"feature"} className="bg-white/20 backdrop-blur-sm p-6 rounded-lg">
                                <h3 className="text-xl mb-3">Feature 3</h3>
                                <p className="text-base font-normal">Description of feature 3 with details and benefits.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="min-h-screen flex items-center justify-center relative z-10 text-white text-4xl font-bold">
                    Section 2 Content
                </div>

                <div id="section-3" className="min-h-screen flex items-center justify-center relative z-10 text-white opacity-0 translate-y-12">
                    <div className="text-3xl font-semibold text-center px-6 py-12 bg-black/40 rounded-xl w-3/4">
                        Section 3: Appears after blue box expands
                    </div>
                </div>
            </section>

        </div>
    );
}