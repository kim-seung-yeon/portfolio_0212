import React, { useEffect, useState } from 'react';
import './Visual.css';

const Visual = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAssembled, setIsAssembled] = useState(false);
    const [isShrinking, setIsShrinking] = useState(false);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            // Reference width 1920, height 1024
            const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1024);
            setScale(s);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        const timer = setTimeout(() => setIsVisible(true), 100);
        const assembleTimer = setTimeout(() => setIsAssembled(true), 3500);

        document.body.style.overflow = 'hidden';
        const unlockTimer = setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 4000);

        return () => {
            clearTimeout(timer);
            clearTimeout(assembleTimer);
            clearTimeout(unlockTimer);
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsShrinking(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className={`visual-section ${isVisible ? 'active' : ''} ${isAssembled ? 'assembled' : ''} ${isShrinking ? 'is-shrinking' : ''}`}>
            {/* Grid Lines inspired by the provided image */}
            <div className="grid-container" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
                {/* Vertical Lines */}
                <div className="line v-line lv-1"></div>
                <div className="line v-line lv-2"></div>
                <div className="line v-line lv-3 bold"></div>
                <div className="line v-line lv-4"></div>
                <div className="line v-line lv-5"></div>

                {/* Horizontal Lines */}
                <div className="line h-line lh-1"></div>
                <div className="line h-line lh-2 bold"></div>
                <div className="line h-line lh-3"></div>
                <div className="line h-line lh-4"></div>
            </div>

            <div className="text-container">
                <div className="assembly-wrapper" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
                    {/* Fixed X-positions for perfect centering */}
                    <div className="fragment-mask p-mask"><div className="text-fragment p-char allura">P</div></div>
                    <div className="fragment-mask ort-mask"><div className="text-fragment ort-chars neue">ort</div></div>
                    <div className="fragment-mask f-mask"><div className="text-fragment f-char allura">f</div></div>
                    <div className="fragment-mask olio-mask"><div className="text-fragment olio-chars neue">olio</div></div>
                    <div className="fragment-mask star-mask"><div className="text-fragment star-char neue">*</div></div>
                </div>
            </div>
        </section>
    );
};

export default Visual;
