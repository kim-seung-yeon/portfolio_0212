import { useState, useEffect, useRef } from 'react'
import './Strengths.css'

const Strengths = () => {
    const sectionRef = useRef(null)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return

            const rect = sectionRef.current.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const scrollDistance = -rect.top
            const totalScrollable = rect.height - windowHeight

            if (totalScrollable <= 0) {
                setProgress(0)
                return
            }

            const newProgress = Math.min(Math.max(scrollDistance / totalScrollable, 0), 1)
            setProgress(newProgress)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // 초기 실행
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // 1. 단어들(top-1 ~ bottom-6)이 먼저 순차적으로 등장 (0.05 ~ 0.25 구간)
    // 2. 그 다음 h2 박스 모션 진행 (0.35 ~ 0.55 구간)
    const boxProgress = Math.min(Math.max((progress - 0.35) / 0.2, 0), 1)

    // 3. h2 모션 후 '약 0.5 정도의 시간적/스크롤 여유'를 둠 (0.55 ~ 0.75 구간은 대기)

    // 4. 원이 커지는 모션 (0.75 ~ 1.0 구간 - 마지막까지 꽉 채워서 커짐)
    const circleProgress = Math.min(Math.max((progress - 0.75) / 0.25, 0), 1)

    // 원이 화면을 가득 채웠을 때(거의 끝부분) 배경색 전환
    const isBackgroundChanged = circleProgress > 0.98

    const textItems = [
        { text: '논리분석', className: 'top-1', color: '#fff' },
        { text: 'ISFJ', className: 'top-2', color: '#888' },
        { text: '긍정적', className: 'top-3', color: '#fff' },
        { text: '정리정돈', className: 'top-4', color: '#888' },
        { text: '책임감', className: 'bottom-1', color: '#fff' },
        { text: '자존감', className: 'bottom-2', color: '#666' },
        { text: '통찰력', className: 'bottom-3', color: '#888' },
        { text: '자아성찰', className: 'bottom-4', color: '#666' },
        { text: '꾸준함', className: 'bottom-5', color: '#fff' },
        { text: '강점발견', className: 'bottom-6', color: '#888' },
    ]

    return (
        <section className="strengths" ref={sectionRef}>
            <div className="strengths-inner">

                {/* ✅ 배경 텍스트 (순차 등장) - h2 등장 전에 모두 완료되어야 함 */}
                <div className="text-bg-container">
                    {textItems.map((item, index) => {
                        // 0.05 ~ 0.25 구간 동안 빠르게 순차 등장
                        const start = 0.05 + (index * 0.02)
                        const duration = 0.05
                        const localProgress = Math.min(Math.max((progress - start) / duration, 0), 1)

                        const translateY = (1 - localProgress) * 50 // 아래에서 위로
                        const opacity = localProgress

                        return (
                            <p
                                key={index}
                                className={item.className}
                                style={{
                                    transform: `translateY(${translateY}px)`,
                                    opacity: opacity,
                                    color: item.color
                                }}
                            >
                                {item.text}
                            </p>
                        )
                    })}
                </div>

                <div
                    className="motion-area"
                    style={{
                        zIndex: 10
                    }}
                >
                    <div className="intro-text">
                        {/* 텍스트가 다 나온 뒤(0.25 이후)부터 등장 시작 -> '저는', '디자이너입니다' 먼저 등장하도록 0.1로 수정 */}
                        <h2 className="line-1" style={{ opacity: progress > 0.1 ? 1 : 0 }}>저는</h2>
                        <h2 className="line-2">
                            <span
                                className={`highlight-box ${boxProgress > 0.1 ? 'expanded' : ''}`}
                                style={{
                                    width: `${boxProgress * Math.min(960, windowWidth * 0.9)}px`,
                                    opacity: boxProgress > 0 ? 1 : 0,
                                    '--line-width': `${boxProgress * 4}px`
                                }}
                            >
                                <span className="highlight-text">
                                    {"모호함을 선명함으로 바꾸는".split('').map((char, i) => {
                                        const charProgress = Math.min(Math.max((boxProgress - (i * 0.03)) / 0.1, 0), 1);
                                        return (
                                            <span
                                                key={i}
                                                style={{
                                                    opacity: charProgress,
                                                    display: 'inline-block',
                                                    transform: `translateY(${(1 - charProgress) * 10}px)`
                                                }}
                                            >
                                                {char === ' ' ? '\u00A0' : char}
                                            </span>
                                        );
                                    })}
                                </span>
                            </span>
                            <span className="suffix-text" style={{ opacity: progress > 0.1 ? 1 : 0 }}>
                                디자이너입니다.
                            </span>
                        </h2>
                    </div>
                </div>

                <div
                    className="expanding-circle"
                    style={{
                        // 기본 top 50%에서 70%로 내려서 시작 위치 조정
                        // scale을 0~1로 변경 (CSS에서 이미 3000px로 크게 잡음)
                        left: '50%',
                        top: '70%',
                        transform: `translate(-50%, -50%) scale(${circleProgress})`,
                        zIndex: 50,
                        opacity: circleProgress > 0 ? 1 : 0
                    }}
                />

            </div>
        </section>
    )
}

export default Strengths
