import React, { useState, useEffect, useRef } from 'react';
import './Journey.css';
import y2017 from '../assets/img/y2017.png';
import y2024_1 from '../assets/img/y2024_1.png';
import y2024_1_2 from '../assets/img/y2024_1_2.png';
import y2024_2_1 from '../assets/img/y2024_2_1.jpg';
import y2024_2_2 from '../assets/img/y2024_2_2.png';
import y2025 from '../assets/img/y2025.png';
import journeyVideo from '../assets/video/journey_video.mp4';


const Journey = () => {
    const videoRef = useRef(null);
    const [activeYear, setActiveYear] = useState('2017');
    const contentRef = useRef(null);

    const [showFixedYear, setShowFixedYear] = useState(false);
    const [videoProgress, setVideoProgress] = useState(0);
    const [y2025Progress, setY2025Progress] = useState(0);
    const pauseSectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {

            // Video Section Progress
            if (!pauseSectionRef.current) return;
            const videoRect = pauseSectionRef.current.getBoundingClientRect();
            const viewH = window.innerHeight;
            const dist = -videoRect.top;
            const totalDist = videoRect.height - viewH;
            let rawV = Math.min(Math.max(dist / totalDist, 0), 1);

            // Phase 1: y2025 content animation (0% to 35% of totalDist)
            let p2025 = rawV / 0.35;
            if (p2025 > 1) p2025 = 1;
            setY2025Progress(p2025);

            // Phase 2: Pause (35% to 55%) - No specific progress state needed, just videoProgress stays 0

            // Phase 3: Video expansion (55% to 100% of totalDist)
            let vProg = (rawV - 0.55) / 0.45;
            if (vProg > 1) vProg = 1;
            if (vProg < 0) vProg = 0;
            setVideoProgress(vProg);

            // Force 2025 while in pause section
            if (rawV > 0) setActiveYear('2025');

            if (vProg > 0) {
                if (videoRef.current && videoRef.current.paused) {
                    videoRef.current.play().catch(e => console.log("Video play failed:", e));
                }
            } else {
                if (videoRef.current && !videoRef.current.paused) {
                    videoRef.current.pause();
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        const yearObserver = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter(e => e.isIntersecting);
                if (visibleEntries.length > 0) {
                    setShowFixedYear(true);
                    const mostVisible = visibleEntries.reduce((prev, curr) =>
                        curr.intersectionRatio > prev.intersectionRatio ? curr : prev
                    );
                    const newYear = mostVisible.target.getAttribute('data-year');
                    if (newYear) setActiveYear(newYear);
                }
            },
            { threshold: 0.1, rootMargin: "-20% 0px 0% 0px" }
        );

        const titleObserver = new IntersectionObserver(
            ([entry]) => { setShowFixedYear(!entry.isIntersecting); },
            { threshold: 0 }
        );

        const titleEl = document.querySelector('.journey-title');
        if (titleEl) titleObserver.observe(titleEl);

        const sections = document.querySelectorAll('.year-wrapper');
        sections.forEach(section => yearObserver.observe(section));

        const animateObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                    } else {
                        entry.target.classList.remove('show');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const animatedItems = document.querySelectorAll('.scroll-animate');
        animatedItems.forEach(item => animateObserver.observe(item));

        return () => {
            yearObserver.disconnect();
            titleObserver.disconnect();
            animateObserver.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [hasAutoScrolled, setHasAutoScrolled] = useState(false);

    useEffect(() => {
        if (videoProgress >= 1 && !hasAutoScrolled) {
            const timer = setTimeout(() => {
                const nextSection = document.getElementById('project-section');
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                    setHasAutoScrolled(true);
                }
            }, 3000);
            return () => clearTimeout(timer);
        } else if (videoProgress < 0.1) { // Reset earlier if user scrolls up
            setHasAutoScrolled(false);
        }
    }, [videoProgress, hasAutoScrolled]);

    const videoStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        // Rectangular expansion with smooth border radius
        clipPath: `inset(${(1 - videoProgress) * 45}% ${(1 - videoProgress) * 45}% ${(1 - videoProgress) * 45}% ${(1 - videoProgress) * 45}% round 30px)`,
        opacity: videoProgress > 0 ? 1 : 0,
        transition: 'all 0.1s ease-out'
    };

    return (
        <section className="journey">
            <div className="journey-inner">
                <div className="journey-title">
                    <p className="subtitle">A Personal</p>
                    <h2 className="title">Journey</h2>
                    <p className="title-text">선명한 삶을 만들어가는 과정입니다.</p>
                </div>

                <div className="journey-content" ref={contentRef}>
                    <div className="journey-year-fixed-container"
                        style={{
                            opacity: (showFixedYear && videoProgress < 0.9) ? 1 : 0,
                            transition: 'opacity 0.3s'
                        }}
                    >
                        <h2 key={activeYear} className="journey-year-fixed fade-enter">
                            {activeYear}
                        </h2>
                    </div>

                    {/* Background Grid Lines */}
                    <div className="journey-bg-grid" style={{ opacity: 1 - videoProgress, transition: 'opacity 0.3s' }}>
                        <div className="j-line j-v-1"></div>
                        <div className="j-line j-v-2"></div>
                        <div className="j-line j-v-4"></div>
                        <div className="j-line j-v-6"></div>
                        <div className="j-line j-v-8"></div>

                        <div className="j-line j-h-1"></div>
                        <div className="j-line j-h-2"></div>
                        <div className="j-line j-h-3"></div>
                        <div className="j-line j-h-4"></div>
                        <div className="j-line j-h-5"></div>
                        <div className="j-line j-h-6"></div>
                        <div className="j-line j-h-7"></div>
                        <div className="j-line j-h-8"></div>
                        <div className="j-line j-h-9"></div>
                        <div className="j-line j-h-10"></div>

                        {/* Star Vertices at Intersections (Selected 20 Irregular Points) */}
                        <div className="grid-star s-1"></div>
                        <div className="grid-star s-2"></div>
                        <div className="grid-star s-3"></div>
                        <div className="grid-star s-4"></div>
                        <div className="grid-star s-5"></div>
                        <div className="grid-star s-6"></div>
                        <div className="grid-star s-7"></div>
                        <div className="grid-star s-8"></div>
                        <div className="grid-star s-9"></div>
                        <div className="grid-star s-10"></div>
                        <div className="grid-star s-11"></div>
                        <div className="grid-star s-12"></div>
                        <div className="grid-star s-13"></div>
                        <div className="grid-star s-14"></div>
                        <div className="grid-star s-15"></div>
                        <div className="grid-star s-16"></div>
                        <div className="grid-star s-17"></div>
                        <div className="grid-star s-18"></div>
                        <div className="grid-star s-19"></div>
                        <div className="grid-star s-20"></div>
                    </div>

                    <div className="year-wrapper" data-year="2017">
                        <div className="y2017">
                            <div className="img2017 scroll-animate">
                                <div className="image-reveal-wrapper">
                                    <div className="color-mask"></div>
                                    <img src={y2017} alt="2017" />
                                </div>
                            </div>
                            <div className="textbox">
                                <p className="title scroll-animate">시선을 따라 걷다</p>
                                <p className="text scroll-animate">
                                    봉사에서 대상자의 시선을 따라 <br />
                                    필요를 발견하는 보람을 느꼈고, <br />
                                    사회복지 전공의 진학을 결심하였습니다. <br />
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="year-wrapper" data-year="2024">
                        <div className="y2024-1">
                            <div className="textbox">
                                <p className="title scroll-animate">사회복지 관점을 확장하며</p>
                                <p className="text scroll-animate">
                                    사회복지 재학 기간 동안 개인이 겪는 불편함을 찾아내고<br />
                                    실질적인 해결 방안을 도출하는 과정을 익혔고<br />
                                    이를 바탕으로 학업을 성공적으로 마쳤습니다.
                                </p>
                            </div>
                            <div className="img-group2024 scroll-animate">
                                <div className="img2024 back">
                                    <div className="image-reveal-wrapper">
                                        <div className="color-mask"></div>
                                        <img src={y2024_1_2} alt="" />
                                    </div>
                                </div>
                                <div className="img2024 front">
                                    <div className="image-reveal-wrapper">
                                        <div className="color-mask"></div>
                                        <img src={y2024_1} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="y2024-2">
                            <div className="y2024-top">
                                <div className="img2024_2_1 scroll-animate">
                                    <div className="image-reveal-wrapper">
                                        <div className="color-mask"></div>
                                        <img src={y2024_2_1} alt="" />
                                    </div>
                                </div>
                                <div className="textbox">
                                    <p className="title scroll-animate">현장에서 마주한 또 다른 가능성</p>
                                    <p className="text scroll-animate">
                                        사회복지사로 근무하며 사례관리 하는 과정에서  <br />
                                        개인의 문제를 넘어 반복되는 어려움의 근본 원인을 탐구하고자 <br />
                                        새로운 길을 탐색하게 되었습니다.
                                    </p>
                                </div>
                            </div>
                            <div className="img2024_2_2 scroll-animate">
                                <div className="image-reveal-wrapper">
                                    <div className="color-mask"></div>
                                    <img src={y2024_2_2} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Section (Unified Pause Section) */}
                    <div className="pause-section" ref={pauseSectionRef}>
                        <div className="sticky-wrapper">
                            {/* 2025 Content (Inside Sticky) */}
                            <div className="y2025-content" style={{ opacity: 1 }}>
                                <div className="y2025" style={{ opacity: y2025Progress, transform: `translateY(${(1 - y2025Progress) * 50}px)` }}>
                                    <div className="img2025">
                                        <div className="image-reveal-wrapper" style={{ opacity: 1 }}>
                                            <div className="color-mask" style={{
                                                transform: `translateY(${-y2025Progress * 100}%)`,
                                                top: 'auto',
                                                bottom: 0
                                            }}></div>
                                            <img src={y2025} alt="" style={{ opacity: y2025Progress > 0.1 ? 1 : 0 }} />
                                        </div>
                                    </div>
                                    <div className="textbox" style={{ opacity: y2025Progress, transition: 'opacity 0.5s' }}>
                                        <p className="title">새로운 도전</p>
                                        <p className="text">
                                            퇴사 후, 사회 문제를 데이터로 분석하는 과정을 익혔고, <br />
                                            데이터를 시각적 경험으로 연결하는 UIUX를 탐구하며 역량을 확장하였습니다.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Black Curtain - Made static */}
                            <div
                                className="bg-curtain"
                                style={{
                                    transform: 'translateY(0)',
                                    opacity: 1
                                }}
                            ></div>

                            {/* Video Overlay */}
                            <div className="sticky-video-container">
                                <video
                                    ref={videoRef}
                                    src={journeyVideo}
                                    muted
                                    loop
                                    playsInline
                                    autoPlay
                                    preload="auto"
                                    style={videoStyle}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Journey;
