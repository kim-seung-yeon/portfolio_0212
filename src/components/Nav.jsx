import React, { useEffect, useState } from 'react';
import './Nav.css';

const groups = [
    { id: 'info-section', label: 'INFO' },
    { id: 'project-section', label: 'PROJECT' },
    { id: 'experience-section', label: 'ABOUT ME' },
    { id: 'faq-section', label: 'FAQ' },
    { id: 'contact', label: 'CONTACT' }
];

const Nav = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isLightMode, setIsLightMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const scrollThreshold = scrollY + windowHeight / 2;

            let foundIndex = 0;
            let currentP = 0;

            for (let i = 0; i < groups.length; i++) {
                const el = document.getElementById(groups[i].id);
                if (!el) continue;

                const rect = el.getBoundingClientRect();
                const start = rect.top + scrollY;
                const end = start + el.offsetHeight;

                if (scrollThreshold >= start && scrollThreshold < end) {
                    foundIndex = i;
                    currentP = (scrollThreshold - start) / el.offsetHeight;
                    break;
                } else if (scrollThreshold >= end) {
                    foundIndex = i + 1;
                    currentP = 0;
                }
            }

            if (foundIndex >= groups.length) {
                foundIndex = groups.length - 1;
                currentP = 1;
            }

            setCurrentIndex(foundIndex);
            setProgress(Math.min(1, Math.max(0, currentP)));

            const x = window.innerWidth / 2;
            const y = 40;
            const elements = document.elementsFromPoint(x, y);

            let isLight = false;

            for (const el of elements) {
                if (el.classList.contains('nav-wrapper') || el.closest('.nav-wrapper')) continue;

                const style = window.getComputedStyle(el);
                const bgColor = style.backgroundColor;

                // Skip transparent
                if (!bgColor || bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') continue;

                // Parse RGB/RGBA
                const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                if (match) {
                    const r = parseInt(match[1], 10);
                    const g = parseInt(match[2], 10);
                    const b = parseInt(match[3], 10);
                    const a = match[4] !== undefined ? parseFloat(match[4]) : 1;

                    // If almost transparent, skip
                    if (a < 0.1) continue;

                    // Calculate brightness (Perceived brightness formula)
                    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

                    // Threshold: > 128 is technically light, picking 140 for safety
                    if (brightness > 140) {
                        isLight = true;
                    }
                    // If we found a substantial background color, stop looking
                    break;
                }
            }

            setIsLightMode(isLight);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const scrollToGroup = (id) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({
                top: el.offsetTop,
                behavior: 'smooth'
            });
            setIsMenuOpen(false); // 메뉴 클릭 시 닫기
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`nav-wrapper ${isLightMode ? 'light-mode' : ''}`}>
            {/* 햄버거 메뉴 버튼 (모바일 전용) */}
            <div className={`nav-hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className={`nav-container ${isMenuOpen ? 'active' : ''}`}>
                {groups.map((group, index) => (
                    <div key={group.id} className={`nav-item ${currentIndex === index ? 'active' : ''}`}>
                        <button
                            className={`nav-btn ${currentIndex === index ? 'active' : ''} ${index < currentIndex ? 'past' : ''}`}
                            onClick={() => scrollToGroup(group.id)}
                        >
                            <span className="btn-text-wrapper">
                                <span className="btn-text">
                                    {group.label.split('').map((char, i) => (
                                        <span key={i} className="char" style={{ transitionDelay: `${i * 15}ms` }}>
                                            {char === ' ' ? '\u00A0' : char}
                                        </span>
                                    ))}
                                </span>
                                <span className="btn-text-clone">
                                    {group.label.split('').map((char, i) => (
                                        <span key={i} className="char" style={{ transitionDelay: `${i * 15}ms` }}>
                                            {char === ' ' ? '\u00A0' : char}
                                        </span>
                                    ))}
                                </span>
                            </span>
                        </button>

                        {index < groups.length - 1 && (
                            <div
                                className="nav-line-track"
                                style={{
                                    width: currentIndex === index ? 'var(--nav-line-width)' : '0px',
                                    opacity: currentIndex === index ? 1 : 0
                                }}
                            >
                                <div
                                    className="nav-line-fill"
                                    style={{
                                        width: `${progress * 100}%`
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default Nav;
