import React, { useState, useEffect, useRef } from 'react';
import './Info.css';
import sea from '../assets/img/sea.png';
import yellow from '../assets/img/yellow.png';
import info from '../assets/img/info.png';

function Info() {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const section = sectionRef.current;
            const windowHeight = window.innerHeight;

            // window.scrollY 기준으로 섹션 내부 스크롤 진행도 계산
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollY = window.scrollY;

            // 섹션 시작점부터의 스크롤 거리
            const scrollFromStart = scrollY - sectionTop;
            // 섹션 높이 대비 진행도 (0 ~ 1)
            const progress = Math.max(0, Math.min(1, scrollFromStart / (sectionHeight - windowHeight)));

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // 초기 실행

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    // 각 이미지의 애니메이션 진행도 계산
    const getCardStyle = (index) => {
        // 순차적 애니메이션을 위한 설정 (총 구간 0~1 중 0.75까지 사용, 나머지 0.25는 대기)
        // 1번: 0.0 ~ 0.25
        // 2번: 0.25 ~ 0.5
        // 3번: 0.5 ~ 0.75
        const configs = [
            { start: 0.0, end: 0.25, startRot: -15, endRot: -6 },
            { start: 0.25, end: 0.5, startRot: 10, endRot: 4 },
            { start: 0.5, end: 0.75, startRot: -10, endRot: -2 }
        ];

        const config = configs[index];

        // 현재 스크롤 진행도(scrollProgress)가 이 카드의 구간 내에서 얼마나 진행되었는지 (0~1)
        let localProgress = (scrollProgress - config.start) / (config.end - config.start);
        localProgress = Math.max(0, Math.min(1, localProgress));

        // 화면 하단에서 위로 올라오는 거리
        const translateY = (1 - localProgress) * window.innerHeight;

        // 회전
        const rotation = config.startRot + (config.endRot - config.startRot) * localProgress;
        const scale = 1 + (localProgress * 0.05);

        return {
            transform: `translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
            opacity: 1,
            zIndex: index + 1
        };
    };

    return (
        <section className="info" id="info" ref={sectionRef}>
            {/* top */}
            <div className="top">
                <h2 className="name">KIM SEUNG YEON</h2>
                <div className="big box"></div>
                <p className="info-profile-title">Profile</p>
            </div>

            {/* sticky-wrap: sticky 전용 스크롤 컨테이너 (이미지 애니메이션용) */}
            <div className="sticky-wrap">
                {/* sticky-viewport-fix: 실제로 화면에 고정될 래퍼 */}
                <div className="sticky-viewport-fix">
                    {/* lines (데코레이션 라인은 sticky-viewport-fix 내부에 위치하여 고정됨) */}
                    <div className="topline"></div>
                    <div className="bottomline"></div>
                    {/* bottom small box */}
                    <div className="small box"></div>

                    {/* bottom */}
                    <div className="bottom">
                        <div className="info-left">
                            <div className="info-img-stack">
                                <div className="info-img-card" style={getCardStyle(0)}>
                                    <img src={sea} alt="" />
                                </div>
                                <div className="info-img-card" style={getCardStyle(1)}>
                                    <img src={yellow} alt="" />
                                </div>
                                <div className="info-img-card" style={getCardStyle(2)}>
                                    <img src={info} alt="" />
                                </div>
                            </div>
                        </div>

                        <div className="text">
                            <div className="left">
                                {/* info */}
                                <div className="info section-item">
                                    <p className="title"><i>Info</i></p>
                                    <div className="text-line"></div>
                                    <div className="text-box">
                                        <p>김승연</p>
                                        <p>2001.11.12</p>
                                        <p>인천 남동구 에코중앙로 163</p>
                                    </div>
                                </div>

                                {/* career */}
                                <div className="career section-item">
                                    <p className="title"><i>Career</i></p>
                                    <div className="text-line"></div>
                                    <div className="text-box">
                                        <ul>
                                            <li>
                                                <p className="year">2023.01</p>
                                                <p className="content">미추홀종합장애인복지관 순환실습</p>
                                            </li>
                                            <li>
                                                <p className="year">2024.06~2024.12</p>
                                                <p className="content">태화복지재단 인천기독교종합사회복지관 사회복지사</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* certificate */}
                                <div className="certificate section-item">
                                    <p className="title"><i>Certificate</i></p>
                                    <div className="text-line"></div>
                                    <div className="text-box">
                                        <ul>
                                            <li>
                                                <p className="year">2026</p>
                                                <p className="content">웹디자인개발기능사 2급 필기 합격</p>
                                            </li>
                                            <li>
                                                <p className="year">2025</p>
                                                <p className="content">사회조사분석사 2급</p>
                                                <p className="content">GTQ 포토샵 1급</p>
                                            </li>
                                            <li>
                                                <p className="year">2024</p>
                                                <p className="content">자동차운전면허 1종</p>
                                                <p className="content">사회복지사 1급</p>
                                                <p className="content">컴퓨터활용능력 2급</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="right">
                                {/* education */}
                                <div className="education section-item">
                                    <p className="title"><i>Education</i></p>
                                    <div className="text-line"></div>
                                    <div className="text-box">
                                        <ul>
                                            <li>
                                                <p className="year">2025.08 - 2026.02</p>
                                                <p className="content">이젠 아카데미 UI/UX 디자인 & 프론트엔드 부트캠프</p>
                                            </li>
                                            <li>
                                                <p className="year">2024.03 - 2026.04</p>
                                                <p className="content">그린컴퓨터아트학원 포토샵 GTQ 1급 그래픽 디자인</p>
                                            </li>
                                            <li>
                                                <p className="year">2020.02 ~ 2024.02</p>
                                                <p className="content">백석대학교 사회복지학 전공</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* skill */}
                                <div className="skill section-item">
                                    <p className="title"><i>Skill</i></p>
                                    <div className="text-line"></div>
                                    <div className="text-box">
                                        <div className="skill-item">
                                            <p>PHOTOSHOP</p>
                                            <span>이미지 편집, 리터칭, 색 보정</span>
                                        </div>
                                        <div className="skill-item">
                                            <p>ILLUSTRATOR</p>
                                            <span>로고 및 일러스트 디자인</span>
                                        </div>
                                        <div className="skill-item">
                                            <p>FIGMA</p>
                                            <span>와이어프레임 제작, UI 프로토타입 구성</span>
                                        </div>
                                        <div className="skill-item">
                                            <p>MIDJOURNEY</p>
                                            <span>이미지 및 영상 제작</span>
                                        </div>
                                        <div className="skill-item">
                                            <p>HTML/CSS</p>
                                            <span>반응형 레이아웃 구현, 애니메이션 및 인터렉션 적용</span>
                                        </div>
                                        <div className="skill-item">
                                            <p>JAVASCRIPT/REACT</p>
                                            <span>사용자 인터랙션 및 화면 동작 구현</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Info;
