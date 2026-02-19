import React, { useState } from 'react';
import './Favorite.css';
import space from '../assets/img/space.png';
import travel from '../assets/img/trevel.png';
import mood from '../assets/img/mood.png';
import hobby from '../assets/img/hobby.PNG';

// 플레이스홀더 이미지 혹은 에셋
const categories = [
    {
        id: 'SPACE',
        label: 'PLACES',
        desc: '매일 만년필로 일기를 쓰며 나만의 공간에서 생각을 정리합니다.\n기록을 통해 복잡한 내용의 핵심을 단순하게 추려내는 과정을 즐깁니다.',
        image: space
    },
    {
        id: 'TRAVEL',
        label: 'TRAVEL',
        desc: '계획에 얽매이지 않고 걷다 마주치는 고즈넉한 책방과 골목에서\n정형화되지 않은 자유로움을 즐깁니다.',
        image: travel
    },
    {
        id: 'HOBBY',
        label: 'HOBBY',
        desc: '필라테스, 수영 등 다양한 운동으로 몸과 정신을 건강하게 가꿉니다.\n스스로를 아끼고 돌보는 시간은 일상을 지속하는 단단한 에너지가 됩니다.',
        image: hobby
    },
    {
        id: 'MOOD',
        label: 'MOOD',
        desc: '인위적이지 않은 자연의 초록빛을 사랑합니다.\n자연의 색감이 주는 편안하고 깊이 있는 분위기 처럼,\n작업에 있어서도 시각적인 안정감과 따뜻한 감성이 느껴지는 디자인을 지향합니다.',
        image: mood
    }
];


const Favorite = () => {
    const [hovered, setHovered] = React.useState(null);
    const [scrollActive, setScrollActive] = React.useState(null);
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };



    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                let maxRatio = 0;
                let activeId = null;
                let isAnyIntersecting = false;

                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        isAnyIntersecting = true;
                        if (entry.intersectionRatio > maxRatio) {
                            maxRatio = entry.intersectionRatio;
                            activeId = entry.target.getAttribute('data-id');
                        }
                    }
                });

                if (activeId) {
                    setScrollActive(activeId);
                } else if (!isAnyIntersecting) {
                    setScrollActive(null);
                }
            },
            { threshold: 0.1 }
        );

        const items = document.querySelectorAll('.fav-item');
        items.forEach((item) => observer.observe(item));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="favorite-section" onMouseMove={handleMouseMove}>
            <div className="fav-header">
                <p className="subtitle">of tastes</p>
                <h2 className="title">Gallery</h2>
                <p className="title-text">저를 표현하는 사진을 소개합니다.</p>
            </div>

            <div className="fav-list">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        data-id={cat.id}
                        className={`fav-item ${hovered === cat.id || (!hovered && scrollActive === cat.id) ? 'active' : ''}`}
                        onMouseEnter={() => setHovered(cat.id)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <div className="fav-content">
                            <span className="fav-label">{cat.label}</span>
                            <p className="fav-text">
                                {cat.desc.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 마우스 따라다니는 혹은 스크롤 활성화된 이미지 */}
            {(hovered || scrollActive) && (
                <div
                    className={`floating-image ${!hovered && scrollActive ? 'scroll-active' : ''}`}
                    style={{
                        left: hovered ? mousePos.x : '70%',
                        top: hovered ? mousePos.y : '50%'
                    }}
                >
                    {(() => {
                        const activeId = hovered || scrollActive;
                        const activeCat = categories.find(c => c.id === activeId);
                        return activeCat && activeCat.image ? (
                            <img src={activeCat.image} alt={activeCat.label} className="fav-img-content" />
                        ) : (
                            <div className="img-placeholder">{activeId}</div>
                        );
                    })()}
                </div>
            )}
        </section>
    );
};

export default Favorite;
