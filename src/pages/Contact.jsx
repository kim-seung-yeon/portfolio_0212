import React, { useEffect, useRef, useState } from 'react';
import './Contact.css';
import contact_video from '../assets/video/contact_video.mp4';

const Contact = () => {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Video play failed:", error);
            });
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const viewHeight = window.innerHeight;

            // Calculate how far we've scrolled through this specific section
            // start: top of section hits bottom of screen? No, the user wants to see it while it scrolls.
            // Let's use the standard "in-viewport" progress.
            const totalScrollable = rect.height - viewHeight;
            const currentScroll = -rect.top;

            let p = currentScroll / totalScrollable;
            p = Math.min(Math.max(p, 0), 1);

            setProgress(p);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="contact-page" id="contact" ref={sectionRef}>
            <div className="contact-sticky">
                <video
                    ref={videoRef}
                    className="contact-bg-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                >
                    <source src={contact_video} type="video/mp4" />
                </video>

                {/* Text Layering Container */}
                <div className="contact-text-layer">
                    {/* Layer 1: Normal Text (SVG for alignment stability) */}
                    <svg
                        className="stroke-svg"
                        width="100%"
                        height="100%"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1,
                            pointerEvents: 'none',
                            clipPath: `inset(0 0 ${progress * 100}% 0)`
                        }}
                    >
                        <text
                            className="mask-text"
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#fff"
                        >
                            <tspan x="50%" dy="-0.45em">CONTACT</tspan>
                            <tspan x="50%" dy="0.9em">ME</tspan>
                        </text>
                    </svg>

                    {/* Layer 2: SVG Curtain with Text Mask (Hole) */}
                    <svg
                        className="curtain-svg"
                        width="100%"
                        height="100%"
                    >
                        <defs>
                            <mask id="text-mask">
                                <rect width="100%" height="100%" fill="white" />
                                <text
                                    className="mask-text"
                                    x="50%"
                                    y="50%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="black"
                                >
                                    <tspan x="50%" dy="-0.45em">CONTACT</tspan>
                                    <tspan x="50%" dy="0.9em">ME</tspan>
                                </text>
                            </mask>
                        </defs>
                        {/* The Curtain Rect that grows from bottom */}
                        <rect
                            width="100%"
                            height={`${progress * 100}%`}
                            y={`${100 - (progress * 100)}%`}
                            fill="#FBFEE7"
                            mask="url(#text-mask)"
                        />
                    </svg>
                </div>

                <div className="contact-bottom">
                    <p>kimtmddus01@naver.com</p>
                    <p>모호함 속에서 가능성을 발견하고, 결과로 증명하겠습니다.</p>
                    <p>010-5062-3026</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
