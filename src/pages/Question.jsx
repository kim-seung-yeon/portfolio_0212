import React, { useEffect, useRef, useState } from 'react';
import './Question.css';

const Question = () => {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const element = sectionRef.current;
            const { top } = element.getBoundingClientRect();
            const height = element.offsetHeight;
            const windowHeight = window.innerHeight;

            // Calculate progress: 0 when section top hits viewport top (sticky start)
            // to 1 when sticky ends.
            // Adjust calculation to be more precise for the sticky duration.
            // Sticky height is roughly total height - viewport height.
            const totalScrollDistance = height - windowHeight;

            // We want progress 0 when top is 0.
            // As we scroll down, top becomes negative.
            let progress = -top / totalScrollDistance;

            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Init

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animation Logic
    // Total 3 cards.
    // Progress 0.0 -> 0.33: Card 1 enters
    // Progress 0.33 -> 0.66: Card 2 enters
    // Progress 0.66 -> 1.0: Card 3 enters

    const getCardStyle = (index) => {
        // Stagger timestamps
        const start = index * 0.25;
        const end = start + 0.4;

        // Normalize progress for this card
        let localProgress = (scrollProgress - start) / (end - start);
        if (localProgress < 0) localProgress = 0;
        if (localProgress > 1) localProgress = 1;

        // Easing
        const ease = t => t * (2 - t); // Ease out
        const smoothProgress = ease(localProgress);

        // Position calculations - responsive
        // Calculate card width dynamically based on viewport
        const viewportWidth = window.innerWidth;
        const cardWidth = Math.min(Math.max(300, viewportWidth * 0.446), 857.2);

        // Calculate spacing so that 3 cards span the full viewport width
        // Total cards = 3 (index 0, 1, 2)
        // Formula: cardWidth + (2 * spacing) = viewportWidth
        // spacing = (viewportWidth - cardWidth) / 2
        const cardSpacing = (viewportWidth - cardWidth) / 2;

        // Final position: cards stack from left edge
        // First card at 0, second at spacing, third at 2*spacing
        const finalPosition = index * cardSpacing;

        // Start position: offscreen right
        const startPosition = viewportWidth + 500;

        const translateX = startPosition - ((startPosition - finalPosition) * smoothProgress);

        // Background Color Logic
        let backgroundColor = '#F3F1E8'; // Default
        if (index === 0 && smoothProgress > 0.95) {
            backgroundColor = '#CFCABC';
        } else if (index === 1 && smoothProgress > 0.95) {
            backgroundColor = '#E4E0D0';
        }

        return {
            transform: `translateX(${translateX}px)`,
            zIndex: index + 1,
            opacity: localProgress > 0.1 ? 1 : 0,
            backgroundColor: backgroundColor,
            transition: 'background-color 0.5s ease'
        };
    };

    return (
        <section className="question-page" id="question" ref={sectionRef}>
            <div className="question-sticky-wrapper">
                <div className="question-header">
                    <h2>FAQ</h2>
                    <p>저의 가치관과 역량을 깊이 있게 살피실 수 있도록<br />정성을 담아 예상 문답을 준비했습니다.</p>
                </div>

                <div className="question-cards-track">
                    <div className="q-card" style={getCardStyle(0)}>
                        <div className="text-box">
                            <span className="q-num">01</span>
                            <h3>비전공자의 불확실함을 <br />어떻게 확신으로 바꿨나요?</h3>
                            <p className="q-desc">부트캠프를 통해 복잡한 문제를 사용자 관점으로 구조화하며<br />제 사고방식이 가장 잘 발휘됨을 느꼈습니다. 모호함을 걷어내고 논리적인 설계를 구축하며<br />이 직무가 제게 잘 맞는다는 확신을 얻었습니다.</p>
                        </div>
                    </div>
                    <div className="q-card" style={getCardStyle(1)}>
                        <div className="text-box">
                            <span className="q-num">02</span>
                            <h3>다른 디자이너와 차별화되는<br />본인만의 무기는 무엇인가요?</h3>
                            <p className="q-desc">단순한 시각적 효과보다 사용자의 불편을 해결하는 인터페이스의 논리를 우선시합니다.<br />본질에 집중하게 만드는 관찰력으로 비즈니스 목표를<br />명확한 시각 언어로 구현하겠습니다.</p>
                        </div>
                    </div>
                    <div className="q-card" style={getCardStyle(2)}>
                        <div className="text-box">
                            <span className="q-num">03</span>
                            <h3>이전 직무(사회복지사)의 경험은 <br />어떤 의미인가요?</h3>
                            <p className="q-desc">현장에서 사람들의 숨은 니즈를 관찰하고 해결책을 세우며<br />후회 없이 마침표를 찍은 소중한 경험이었습니다. 그때 익힌 문제 해결 방식을 토대로<br />이제는 디자인이라는 명확한 목표 안에서 역량을 증명하겠습니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Question;
