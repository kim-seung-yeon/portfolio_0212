import React, { useState, useEffect, useRef } from 'react';
import './Experience.css';

// 이미지 import
// ... (rest of imports)
import ex1 from '../assets/img/ex_1.png';
import ex1_2 from '../assets/img/ex_1_1.png';
import ex2 from '../assets/img/ex_2.png';
import ex2_2 from '../assets/img/ex_2_2.png';
import ex3 from '../assets/img/ex_3.png';
import ex3_2 from '../assets/img/ex_3_2.png';
import ex4 from '../assets/img/ex_4.png';
import ex4_2 from '../assets/img/ex_4_2.png';
import ex5 from '../assets/img/ex_5.png';
import ex5_2 from '../assets/img/ex_5_2.png';

const experiences = [
    {
        id: 1,
        title: "문화 예술 동아리",
        desc: `타 전공생과 호흡하며
협업의 즐거움을
배울 수 있었습니다.`,
        image: ex1,
        hoverImage: ex1_2
    },
    {
        id: 2,
        title: "전공 학술제 참여",
        desc: `행복과 복지의 상관관계를 연구하여,
대상자의 삶을 개선하는
설계를 경험하였습니다.`,
        image: ex2,
        hoverImage: ex2_2
    },
    {
        id: 3,
        title: "토론 동아리장",
        desc: `독서 토론 동아리장을 맡아
다양한 의견을 조율하며,
커뮤니케이션 역량을 쌓았습니다.`,
        image: ex3,
        hoverImage: ex3_2
    },
    {
        id: 4,
        title: "사회복지 모의 프로그램 진행",
        desc: `다양한 계층의 니즈를 분석해
맞춤형 솔루션을 설계하며
최적화된 서비스를 기획 및 진행하였습니다.`,
        image: ex4,
        hoverImage: ex4_2
    },
    {
        id: 5,
        title: `태화복지재단
인천기독교종합사회복지관 입사`,
        desc: `심층 상담을 통해
대상자 맞춤형 사례 계획을 수립하고
사용자 문제 해결을 위한 역량을 강화했습니다.`,
        image: ex5,
        hoverImage: ex5_2
    }
];

const SplitText = ({ text, className }) => {
    return (
        <span className={className}>
            {text.split('').map((char, i) => (
                <span key={i} className="char" style={{ transitionDelay: `${i * 30}ms` }}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
};

const Experience = () => {
    const [hoveredId, setHoveredId] = useState(null);
    const headerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, { threshold: 0.2 });

        if (headerRef.current) {
            observer.observe(headerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="experience" id="experience">
            <div className="experience-header" ref={headerRef}>
                <h1 className="exp-title">
                    <div className="line-wrapper">
                        <SplitText text="EXPERIENCE" className="split-line" />
                    </div>
                </h1>
                <div className="exp-subtitle-wrapper">
                    <p className="exp-subtitle">현재의 저를 완성한 경험의 기록입니다.</p>
                    <div className="exp-square-dot"></div>
                </div>
            </div>

            <div className="experience-content">
                {experiences.map((item) => (
                    <div
                        key={item.id}
                        className="exp-card"
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{ overflow: 'hidden' }}
                    >
                        <div
                            className="exp-bg"
                            style={{
                                backgroundImage: `url(${item.image})`,
                                transform: hoveredId === item.id ? 'scale(1.1)' : 'scale(1)',
                                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '100%',
                                height: '100%'
                            }}
                        ></div>
                        <div className="exp-overlay">
                            <h3 className="card-title" style={{ whiteSpace: 'pre-line' }}>
                                {item.title}
                            </h3>
                            <p className="card-desc" style={{ whiteSpace: 'pre-line' }}>
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bottom-marquee">
                <div className="marquee-content">
                    {Array(20).fill("Experiences That Define Me").map((text, i) => (
                        <span key={i}>{text}</span>
                    ))}
                </div>
                <div className="marquee-content" aria-hidden="true">
                    {Array(20).fill("Experiences That Define Me ").map((text, i) => (
                        <span key={i}>{text}</span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
