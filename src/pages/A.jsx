import React, { useState, useRef, useEffect } from 'react';
import './A.css';

// import papa_video from '../assets/video/papa_video.mp4';
import papa from '../assets/img/papa.png';
import force1 from '../assets/img/force1.png';
import split from '../assets/img/split.png';
import skill_html from '../assets/img/skill_html.png';
import skill_css from '../assets/img/skill_css.png';
import skill_js from '../assets/img/skill_js.png';
import skill_react from '../assets/img/skill_react.png';
import skill_ps from '../assets/img/skil_ps.png';
import skill_pr from '../assets/img/skill_pr.png';
import skill_mid from '../assets/img/skill_mid.png';
import skill_lii from '../assets/img/skill_lii.png';
import skill_visual from '../assets/img/skill_visual.png';

import papa_1 from '../assets/video/papa_1.mp4';
import papa_2 from '../assets/video/papa_2.mov';
import papa_3 from '../assets/video/papa_3.mp4';
import papa_4 from '../assets/video/papa_4.mp4';
import force1_video from '../assets/video/force1.mp4';
import split_video from '../assets/video/split.mp4';

const A = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [selectedCard, setSelectedCard] = useState(null);
    const [videoIndex, setVideoIndex] = useState(0);
    const containerRef = useRef(null);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const isSmallMobile = typeof window !== 'undefined' && window.innerWidth <= 480;

    const papaVideos = [papa_1, papa_2, papa_3, papa_4];

    useEffect(() => {
        if (selectedCard?.id === 1) {
            setVideoIndex(0);
        }
    }, [selectedCard]);

    const handleVideoEnd = () => {
        setVideoIndex((prev) => (prev + 1) % papaVideos.length);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const element = containerRef.current;
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate progress (0 to 1) based on sticky scroll
            const totalDistance = element.offsetHeight - windowHeight;
            let progress = -rect.top / totalDistance;
            progress = Math.max(0, Math.min(1, progress));

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Init

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cards = [
        {
            id: 1,
            content: papa,
            title: "K-Brand Rebranding",
            category: "WEB/MOBILE UIUX",
            desc: "브랜드 '파파레서피'의 신뢰를 공고히 하고 본연의 가치를 극대화하기 위한 리브랜딩 제안입니다.",
            overview: "가치 소비를 지향하는 미닝아웃 시대에 발맞춰, 브랜드 '파파레서피'의 신뢰를 공고히 하고 본연의 가치를 극대화하기 위한 리브랜딩을 제안합니다.",
            contribution: [
                { label: "기획", value: "80%" },
                { label: "디자인", value: "30%" },
                { label: "퍼블리싱", value: "40%" }
            ],
            process: "제품의 정보 전달력을 높이고 브랜드 스토리를 강조하는 레이아웃을 통해 고객 경험을 개선하고, 일관된 톤앤매너로 브랜드 아이덴티티를 확립하였습니다.",
            tools: "Midjourney, Figma, HTML, CSS, Javascript",
            members: "총 6명 (Team Project)",
            period: "2025.11.25 ~ 2025.12.29",
            role: "기획, 서브페이지 디자인 및 퍼블리싱",
            color: "#FFCC33",
            // video: papa_video,
            planUrl: "https://www.figma.com/proto/qfe5do0OqwaHThxOBESAxa/%ED%8F%AC%ED%8F%B4-%EB%A7%81%ED%81%AC?node-id=1-3652&t=ZRitH56l7g3hAUWh-1",
            websiteUrl: "https://solsol3318.github.io/ssol/"
        },
        {
            id: 2,
            content: force1,
            title: "Fandom Platform",
            category: "APP UIUX",
            desc: "Force1은 한국 F1 팬덤을 위한 몰입형 팬 경험 플랫폼으로, 팬들의 참여와 소통을 중심으로 UX를 설계했습니다.",
            overview: "Force1은 한국 F1 팬덤을 위한 몰입형 팬 경험 플랫폼으로, 팬들의 참여와 소통을 중심으로 UX를 설계했습니다. 직관적 데이터 시각화와 인터랙티브 요소를 통해 신규 팬과 매니아 모두 몰입할 수 있는 환경을 제공합니다.",
            contribution: [
                { label: "기획", value: "80%" },
                { label: "디자인", value: "40%" },
                { label: "퍼블리싱", value: "40%" }
            ],
            process: "팬들의 경험과 행동을 관찰하며, 국내 F1 팬덤의 몰입과 소통에서 공통된 불편을 발견했습니다. 팬 활동 데이터를 분석하여, 누구나 쉽게 참여하고 서로 연결될 수 있는 몰입형 인터페이스와 개인 맞춤형 경험을 설계했습니다.",
            tools: "Midjourney, Figma, React",
            members: "총 7명 (Team Project)",
            period: "2026.01.02 ~ 2026.01.25",
            role: "기획, 팀드라이버 페이지 디자인 및 퍼블리싱",
            color: "#FFCC33",
            planUrl: "https://www.figma.com/proto/qfe5do0OqwaHThxOBESAxa/%ED%8F%AC%ED%8F%B4-%EB%A7%81%ED%81%AC?node-id=1-377&t=ZRitH56l7g3hAUWh-1",
            websiteUrl: "https://force1-five.vercel.app/onboarding"
        },
        {
            id: 3,
            content: split,
            title: "Split Project",
            category: "APP UIUX",
            desc: "정산 과정의 불편과 혼란을 줄이고, 정산 과정을 명확하게 만드는 데 초점을 둔 프로젝트입니다.",
            overview: "정산 과정은 항목이 늘어날수록 금액 확인과 계산이 반복되어 부담이 커집니다. 특히 여러 품목을 함께 정산할 때, 누가 얼마나 부담해야 하는지 파악하기 어렵습니다. 정산 시 발생하는 불편과 혼란을 줄이고, 정산 과정을 명확하게 만드는 데 초점을 두었습니다.",
            contribution: [
                { label: "기획", value: "100%" },
                { label: "디자인", value: "100%" }
            ],
            process: "개인의 작은 불편함에서 시작해 2030세대로 관찰 대상을 넓히며 공통의 문제를 발견했습니다. 타인이 느끼는 정산 피로도를 조사하고, 그 데이터를 바탕으로 개별 소비를 존중하는 합리적 정산 기능을 설계하였습니다.",
            tools: "Figma, Midjourney",
            members: "1명 (Personal Project)",
            period: "2025.10.13 ~ 2025.11.24",
            role: "1인 기획, 디자인, 퍼블리싱",
            color: "#FFCC33",
            planUrl: "https://www.figma.com/proto/qfe5do0OqwaHThxOBESAxa/%ED%8F%AC%ED%8F%B4-%EB%A7%81%ED%81%AC?node-id=37-1618&t=9FYb5DVv9oaH5irG-1",
            websiteUrl: null,
            prototypeUrl: "https://www.figma.com/proto/qfe5do0OqwaHThxOBESAxa/%ED%8F%AC%ED%8F%B4-%EB%A7%81%ED%81%AC?node-id=8-810&t=SRGvjpr37gHeYyXd-1"
        }
    ];

    return (
        <div className="a-container" ref={containerRef}>


            {/* Sticky Scroll Container */}
            <div className="card-scroll-container">
                <div className="project-title">
                    <p className='subtitle'>About the</p>
                    <h2 className='title'>Project</h2>
                    <p className='title-text'>UX 기획부터 설계까지 전 과정을 수행한 프로젝트입니다.</p>
                </div>
                <div className="card-sticky-wrapper">
                    {cards.map((card, index) => {
                        // 3 cards: -1, 0, 1 from center (index 1)
                        const offset = index - 1;

                        const baseRotate = isMobile ? 10 : 15;
                        const baseX = isSmallMobile ? 120 : isMobile ? 200 : 350;
                        const baseY = isMobile ? 25 : 40;

                        const rotate = offset * baseRotate * scrollProgress;
                        const x = offset * baseX * scrollProgress;
                        const y = Math.abs(offset) * baseY * scrollProgress;
                        const scale = isMobile
                            ? (0.7 + (0.3 * scrollProgress))
                            : (0.8 + (0.2 * scrollProgress));

                        return (
                            <div
                                key={card.id}
                                className="card-wrapper"
                                style={{
                                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotate}deg) scale(${scale})`,
                                    zIndex: index === 1 ? 10 : 5,
                                    pointerEvents: 'auto'
                                }}
                                onClick={() => setSelectedCard(card)}
                            >
                                <div className={`card card-${index + 1}`}>
                                    <div className="card-inner">
                                        <div className="card-face card-front">
                                            <div className="card-bg-full" style={{ backgroundImage: `url(${card.content})` }}></div>
                                            <div className="card-initial-view">
                                                <h3 className="text-mask">
                                                    <span>{card.category}</span>
                                                    <span className="text-mask-title">{card.title}</span>
                                                </h3>
                                            </div>
                                            <div className="hover-btn">Click</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Project Detail Modal */}
            {selectedCard && (
                <div className="project-modal-overlay" onClick={() => setSelectedCard(null)}>
                    <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedCard(null)}>&times;</button>
                        <div className="modal-inner">
                            <div className="modal-layout">
                                <div
                                    className={`modal-left ${selectedCard.id !== 1 ? 'modal-vertical' : ''}`}
                                    style={{
                                        width: isMobile ? '100%' : (selectedCard.id === 2 ? '430px' : selectedCard.id === 3 ? '390px' : undefined)
                                    }}
                                >
                                    {selectedCard.id === 1 ? (
                                        <video
                                            key={videoIndex}
                                            src={papaVideos[videoIndex]}
                                            autoPlay
                                            muted
                                            playsInline
                                            onEnded={handleVideoEnd}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                    ) : selectedCard.id === 2 ? (
                                        <video
                                            src={force1_video}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                    ) : selectedCard.id === 3 ? (
                                        <video
                                            src={split_video}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                    ) : (
                                        <img src={selectedCard.content} alt={selectedCard.title} />
                                    )}
                                </div>
                                <div className="modal-right">
                                    <div className="modal-text">
                                        <span className="modal-category">{selectedCard.category}</span>
                                        <h1 className="modal-title-main">{selectedCard.title}</h1>

                                        <div className="project-detail-grid">
                                            <div className="grid-item overview">
                                                <h3>OVERVIEW</h3>
                                                <p>{selectedCard.overview}</p>
                                            </div>

                                            <div className="grid-item contribution">
                                                <h3>Contribution</h3>
                                                <div className="progress-group">
                                                    {selectedCard.contribution.map((item, idx) => (
                                                        <div className="progress-item" key={idx}>
                                                            <span>{item.label}</span>
                                                            <div className="bar-bg">
                                                                <div className="bar-fill" style={{ width: item.value }}></div>
                                                            </div>
                                                            <span className="percent">{item.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid-item process-role">
                                                <div className="process-block">
                                                    <h3>PROCESS</h3>
                                                    <p>{selectedCard.process}</p>
                                                </div>
                                                <div className="role-block">
                                                    <h3>ROLE</h3>
                                                    <p>{selectedCard.role}</p>
                                                </div>
                                            </div>

                                            <div className="grid-item meta-group">
                                                <div className="meta-block">
                                                    <h3>PARTICIPANTS</h3>
                                                    <p>{selectedCard.members}</p>
                                                </div>
                                                <div className="meta-block">
                                                    <h3>PERIOD</h3>
                                                    <p>{selectedCard.period}</p>
                                                </div>
                                                <div className="meta-block">
                                                    <h3>TOOL</h3>
                                                    <p>{selectedCard.tools}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="project-btns">
                                            <a
                                                href={selectedCard.planUrl}
                                                className="btn-ani"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                view plan
                                            </a>
                                            {selectedCard.websiteUrl && (
                                                <a
                                                    href={selectedCard.websiteUrl}
                                                    className="btn-ani visit-figma"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    visit website
                                                </a>
                                            )}
                                            {selectedCard.prototypeUrl && (
                                                <a
                                                    href={selectedCard.prototypeUrl}
                                                    className="btn-ani visit-figma"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    view prototype
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default A;
