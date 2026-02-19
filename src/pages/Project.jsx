import React, { useEffect } from 'react';
import './Project.css';
import split from '../assets/img/split.png';
import force1 from '../assets/img/force1.png';
import papa from '../assets/img/papa.png';


const Project = () => {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -10% 0px" // Trigger slightly before it leaves or as it enters fully
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-text');
        const projectItems = document.querySelectorAll('.project-item');

        animatedElements.forEach(el => observer.observe(el));
        projectItems.forEach(el => observer.observe(el));

        return () => {
            animatedElements.forEach(el => observer.unobserve(el));
            projectItems.forEach(el => observer.unobserve(el));
        };
    }, []);

    return (
        <section className="project" id="project">
            <div className="project-inner">
                <div className="project-title">
                    <p className='subtitle'>About the</p>
                    <h2 className='title'>Project</h2>
                    <p className='title-text'>UX 기획부터 설계까지 전 과정을 수행한 프로젝트입니다.</p>
                </div>

                <div className="project-container">
                    {/* 1. Split Project */}
                    <div className="project-item split">
                        <div className="sticky-side">
                            <div className="project-img-box">
                                <img src={split} alt="Split Project" />
                                <div className="project-hover-overlay">
                                    <button className="project-click-btn">click</button>
                                </div>
                            </div>
                        </div>
                        <div className="scroll-side">
                            <div className="project-content">

                                <div className="project-detail-grid">
                                    <div className="grid-item overview animate-text">
                                        <h3>OVERVIEW</h3>
                                        <p>정산 과정은 항목이 늘어날수록 금액 확인과 계산이 반복되어 부담이 커집니다. 특히 여러 품목을 함께 정산할 때, 누가 얼마나 부담해야 하는지 파악하기 어렵습니다. 정산 시 발생하는 불편과 혼란을 줄이고, 정산 과정을 명확하게 만드는 데 초점을 두었습니다.</p>
                                    </div>

                                    <div className="grid-item contribution animate-text">
                                        <h3>Contribution</h3>
                                        <div className="progress-group">
                                            <div className="progress-item">
                                                <span>기획</span>
                                                <div className="bar-bg"><div className="bar-fill" style={{ width: '100%' }}></div></div>
                                                <span className="percent">100%</span>
                                            </div>
                                            <div className="progress-item">
                                                <span>디자인</span>
                                                <div className="bar-bg"><div className="bar-fill" style={{ width: '100%' }}></div></div>
                                                <span className="percent">100%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid-item process animate-text">
                                        <h3>PROCESS</h3>
                                        <p>개인의 작은 불편함에서 시작해 2030세대로 관찰 대상을 넓히며 공통의 문제를 발견했습니다. 타인이 느끼는 정산 피로도를 조사하고, 그 데이터를 바탕으로 개별 소비를 존중하는 합리적 정산 기능을 설계하였습니다.</p>
                                    </div>

                                    <div className="grid-item meta-group animate-text">
                                        <div className="meta-block">
                                            <h3>PARTICIPANTS</h3>
                                            <p>1명 (personal project)</p>
                                        </div>
                                        <div className="meta-block">
                                            <h3>PERIOD</h3>
                                            <p>2025.10.13 ~ 2025.11.24</p>
                                        </div>
                                        <div className="meta-block">
                                            <h3>TOOL</h3>
                                            <p>Figma, Midjourney</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="project-btns animate-text">
                                    <a href="#" className="btn-ani">view plan<div className="line-box"><div className="line-box-fill"></div></div></a>
                                    <a href="#" className="btn-ani visit-figma">visit figma<div className="line-box"><div className="line-box-fill"></div></div></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. K-Brand Project */}
                    <div className="project-item kbrand">
                        <div className="sticky-side">
                            <div className="project-img-box">
                                <img src={papa} alt="Papa Project" />
                                <div className="project-hover-overlay">
                                    <button className="project-click-btn">click</button>
                                </div>
                            </div>
                        </div>

                        <div className="scroll-side">
                            <div className="project-content">

                                <div className="project-detail-grid">
                                    <div className="grid-item overview animate-text">
                                        <h3>OVERVIEW</h3>
                                        <p>가치 소비를 지향하는 미닝아웃 시대에 발맞춰, 브랜드 '파파레서피'의 신뢰를 공고히 하고 본연의 가치를 극대화하기 위한 리브랜딩을 제안합니다.</p>
                                    </div>

                                    <div className="grid-item contribution animate-text">
                                        <h3>Contribution</h3>
                                        <div className="progress-group">
                                            <div className="progress-item">
                                                <span>기획</span>
                                                <div className="bar-bg"><div className="bar-fill" style={{ width: '80%' }}></div></div>
                                                <span className="percent">80%</span>
                                            </div>
                                            <div className="progress-item">
                                                <span>디자인</span>
                                                <div className="bar-bg"><div className="bar-fill" style={{ width: '30%' }}></div></div>
                                                <span className="percent">30%</span>
                                            </div>
                                            <div className="progress-item">
                                                <span>퍼블리싱</span>
                                                <div className="bar-bg"><div className="bar-fill" style={{ width: '40%' }}></div></div>
                                                <span className="percent">40%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid-item process animate-text">
                                        <h3>PROCESS</h3>
                                        <p>제품의 정보 전달력을 높이고 브랜드 스토리를 강조하는 레이아웃을 통해 신뢰도 높은 고객 경험을 개선하고, 일관된 톤앤매너로 브랜드 아이덴티티를 확립하였습니다.</p>
                                    </div>

                                    <div className="grid-item meta-group animate-text">
                                        <div className="meta-block">
                                            <h3>PARTICIPANTS</h3>
                                            <p>총 6명 (Team Project)</p>
                                        </div>
                                        <div className="meta-block">
                                            <h3>PERIOD</h3>
                                            <p>2025.11.25 ~ 2025.12.29</p>
                                        </div>
                                        <div className="meta-block">
                                            <h3>TOOL</h3>
                                            <p>Midjourney, Figma, HTML, CSS, Javascript</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="project-btns animate-text">
                                    <a href="#" className="btn-ani">view plan<div className="line-box"><div className="line-box-fill"></div></div></a>
                                    <a href="#" className="btn-ani visit-figma">visit figma<div className="line-box"><div className="line-box-fill"></div></div></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Fandom Project */}
                    <div className="project-item fandom">
                        <div className="sticky-side">
                            <div className="project-img-box">
                                <img src={force1} alt="Force1 Project" />
                                <div className="project-hover-overlay">
                                    <button className="project-click-btn">click</button>
                                </div>
                            </div>
                        </div>

                        <div className="scroll-side">
                            <div className="project-content">

                                <div className="project-detail-grid">
                                    <div className="grid-item overview animate-text">
                                        <h3>OVERVIEW</h3>
                                        <p>Force1은 한국 F1 팬덤을 위한 몰입형 팬 경험 플랫폼으로, 팬들의 참여와 소통을 중심으로 UX를 설계했습니다. 직관적 데이터 시각화와 인터랙티브 요소를 통해 신규 팬과 매니아 모두 몰입할 수 있는 환경을 제공합니다.</p>
                                    </div>

                                    <div className="grid-item contribution animate-text">
                                        <h3>Contribution</h3>
                                        <div className="progress-group">
                                            <div className="progress-item">
                                                <span>기획</span>
                                                <div className="bar-bg"><div className="bar-fill" style={{ width: '80%' }}></div></div>
                                                <span className="percent">80%</span>
                                            </div>
                                            <div className="progress-item">
                                                <span>디자인</span>
                                                <div className="bar-bg"><div className="bar-fill" style={{ width: '40%' }}></div></div>
                                                <span className="percent">40%</span>
                                            </div>
                                            <div className="progress-item">
                                                <span>퍼블리싱</span>
                                                <div className="bar-bg"><div className="bar-fill" style={{ width: '40%' }}></div></div>
                                                <span className="percent">40%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid-item process animate-text">
                                        <h3>PROCESS</h3>
                                        <p>팬들의 경험과 행동을 관찰하며, 국내 F1 팬덤의 몰입과 소통에서 공통된 불편을 발견했습니다. 팬 활동 데이터를 분석하여, 누구나 쉽게 참여하고 서로 연결될 수 있는 몰입형 인터페이스와 개인 맞춤형 경험을 설계했습니다.</p>
                                    </div>

                                    <div className="grid-item meta-group animate-text">
                                        <div className="meta-block">
                                            <h3>PARTICIPANTS</h3>
                                            <p>총 7명 (Team Project)</p>
                                        </div>
                                        <div className="meta-block">
                                            <h3>PERIOD</h3>
                                            <p>2026.01.02 ~ 2026.01.25</p>
                                        </div>
                                        <div className="meta-block">
                                            <h3>TOOL</h3>
                                            <p>Midjourney, Figma, React</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="project-btns animate-text">
                                    <a href="#" className="btn-ani">view plan<div className="line-box"><div className="line-box-fill"></div></div></a>
                                    <a href="#" className="btn-ani visit-figma">visit figma<div className="line-box"><div className="line-box-fill"></div></div></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Project;
