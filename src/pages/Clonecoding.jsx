import React, { useRef, useEffect } from 'react';
import './Clonecoding.css';
import musign from '../assets/img/musign.png';
import crewa from '../assets/img/crew.png';
import po from '../assets/img/po.png';
import dea from '../assets/img/dea.png';

const clones = [
    { id: 1, title: 'Musign', label: '뮤자인', image: musign, url: '/clones/musign/index.html' },
    { id: 2, title: 'Crew A La', label: 'Crew A La', image: crewa, url: '/clones/crewal/index.html' },
    { id: 3, title: 'PHOMEIN', label: '포메인', image: po, url: '/clones/phomein/index.html' },
    { id: 4, title: 'DEABANG', label: '대방', image: dea, url: '/clones/daebang/index.html' }
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

const CloneCard = ({ item, delayIdx }) => {
    return (
        <div className="clone-card" style={{ transitionDelay: `${delayIdx * 0.2}s` }}>
            <div className="clone-image-area">
                {item.image ? (
                    <img src={item.image} alt={item.title} className="clone-img" />
                ) : (
                    <div className="clone-placeholder"></div>
                )}
                <div className="clone-overlay">
                    <h3 className="clone-card-title">{item.title}</h3>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="click-btn">
                        click
                    </a>
                </div>
            </div>
            <div className="clone-info">
                <span className="clone-label">{item.label}</span>
            </div>
        </div>
    );
};

const Clonecoding = () => {
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, { threshold: 0.1 });

        if (headerRef.current) observer.observe(headerRef.current);
        if (gridRef.current) observer.observe(gridRef.current);

        // Additionally observe each card for safety
        const cards = gridRef.current?.querySelectorAll('.clone-card');
        if (cards) {
            cards.forEach(card => observer.observe(card));
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="clone-section">
            <div className="clone-inner">
                <div className="clone-header" ref={headerRef}>
                    <h1 className="clone-main-title">
                        <div className="line-wrapper">
                            <SplitText text="CLONE" className="split-line" />
                        </div>
                        <div className="line-wrapper">
                            <SplitText text="CODING" className="split-line" />
                        </div>
                    </h1>
                    <div className="clone-subtitle-wrapper">
                        <p className="clone-subtitle">디자인 의도와 사용자 흐름을 해석해 코드로 구현하였습니다.</p>
                        <div className="clone-square-dot"></div>
                    </div>
                </div>

                <div className="clone-grid" ref={gridRef}>
                    <div className="clone-col">
                        <CloneCard item={clones[0]} delayIdx={0} />
                        <CloneCard item={clones[2]} delayIdx={2} />
                    </div>
                    <div className="clone-col">
                        <CloneCard item={clones[1]} delayIdx={1} />
                        <CloneCard item={clones[3]} delayIdx={3} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Clonecoding;
