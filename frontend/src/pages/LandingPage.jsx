import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
    const navigate = useNavigate();
    const navRef = useRef(null);

    /* ── Intersection Observer for reveal-up animations ── */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                    }
                });
            },
            { threshold: 0.15 }
        );

        const reveals = document.querySelectorAll(".lp-reveal");
        reveals.forEach((el) => observer.observe(el));

        /* ── Glassmorphism scroll shadow ── */
        const handleScroll = () => {
            if (navRef.current) {
                if (window.scrollY > 40) {
                    navRef.current.classList.add("scrolled");
                } else {
                    navRef.current.classList.remove("scrolled");
                }
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            reveals.forEach((el) => observer.unobserve(el));
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="landing-page">
            {/* ════════════════════════════════════
                NAVIGATION — Glassmorphism
            ════════════════════════════════════ */}
            <nav className="lp-nav" ref={navRef}>
                <div className="lp-nav__brand">SMART HOTEL</div>

                <ul className="lp-nav__links">
                    <li>
                        <a className="lp-nav__link" href="#services">
                            Services
                        </a>
                    </li>
                    <li>
                        <a className="lp-nav__link" href="#portfolio">
                            Destinations
                        </a>
                    </li>
                    <li>
                        <a className="lp-nav__link" href="#stats">
                            Intelligence
                        </a>
                    </li>
                    <li>
                        <a className="lp-nav__link" href="#footer">
                            Contact
                        </a>
                    </li>
                </ul>

                <button
                    className="lp-nav__cta"
                    onClick={() => navigate("/login")}
                >
                    Get Started
                </button>
            </nav>

            {/* ════════════════════════════════════
                HERO SECTION
            ════════════════════════════════════ */}
            <section className="lp-hero">
                <div className="lp-hero__content">
                    <div className="lp-reveal">
                        <span className="lp-label">AI-Powered Platform</span>
                    </div>

                    <h1 className="lp-hero__headline lp-reveal lp-delay-1">
                        SMART
                        <br />
                        <em>hotel</em>
                        <br />
                        TRAFFIC
                    </h1>

                    <p className="lp-hero__subtitle lp-reveal lp-delay-2">
                        Experience the next generation of intelligent hotel
                        management — powered by real-time traffic analytics,
                        AI-driven recommendations, and deep packet inspection
                        for unmatched security.
                    </p>

                    <div
                        className="lp-hero__arrow-cta lp-reveal lp-delay-3"
                        onClick={() => navigate("/login")}
                    >
                        Explore Platform <span>→</span>
                    </div>
                </div>

                <div className="lp-hero__visual lp-reveal lp-delay-2">
                    <div className="lp-badge">
                        <span className="lp-badge__number">01</span>
                        <span className="lp-badge__text">Premium</span>
                    </div>

                    <div className="lp-hero__card">
                        <img
                            src="/images/hero-hotel.png"
                            alt="Luxury hotel exterior at dusk"
                        />
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════
                SERVICES GRID
            ════════════════════════════════════ */}
            <section className="lp-services" id="services">
                <div className="lp-services__header lp-reveal">
                    <span className="lp-label">What We Offer</span>
                    <h2 className="lp-services__title">
                        Premium
                        <br />
                        Services
                    </h2>
                </div>

                <div className="lp-services__grid">
                    <div className="lp-service-card lp-reveal lp-delay-1">
                        <div className="lp-service-card__icon">◆</div>
                        <h3 className="lp-service-card__title">
                            AI Recommendations
                        </h3>
                        <p className="lp-service-card__text">
                            Our weighted scoring algorithm analyzes location
                            preferences, budget constraints, ratings, room
                            availability, and real-time traffic congestion to
                            recommend the perfect stay.
                        </p>
                    </div>

                    <div className="lp-service-card lp-reveal lp-delay-2">
                        <div className="lp-service-card__icon">◈</div>
                        <h3 className="lp-service-card__title">
                            Traffic Intelligence
                        </h3>
                        <p className="lp-service-card__text">
                            Real-time traffic-aware ranking penalizes
                            congested zones and rewards low-traffic areas,
                            ensuring guests arrive stress-free at the best
                            destinations.
                        </p>
                    </div>

                    <div className="lp-service-card lp-reveal lp-delay-3">
                        <div className="lp-service-card__icon">◇</div>
                        <h3 className="lp-service-card__title">
                            DPI Security Monitor
                        </h3>
                        <p className="lp-service-card__text">
                            Deep Packet Inspection engine analyzes network
                            traffic in real-time, identifying suspicious
                            protocols and high-bandwidth anomalies to
                            protect your digital infrastructure.
                        </p>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════
                PORTFOLIO — Staggered Grid
            ════════════════════════════════════ */}
            <section className="lp-portfolio" id="portfolio">
                <div className="lp-portfolio__header lp-reveal">
                    <span className="lp-label">Featured Destinations</span>
                    <h2 className="lp-portfolio__title">
                        Curated
                        <br />
                        Experiences
                    </h2>
                </div>

                <div className="lp-portfolio__grid">
                    {/* Item 1 */}
                    <div className="lp-portfolio__item lp-reveal">
                        <div className="lp-portfolio__img-wrap">
                            <img
                                src="/images/hotel-suite.png"
                                alt="Luxury hotel suite interior"
                            />
                            <div className="lp-portfolio__overlay">
                                <div className="lp-portfolio__overlay-circle">
                                    <span className="lp-portfolio__overlay-text">
                                        View Case
                                    </span>
                                </div>
                            </div>
                        </div>
                        <span className="lp-portfolio__category lp-label">
                            Luxury Suites
                        </span>
                        <h3 className="lp-portfolio__item-title">
                            Royal Penthouse Collection
                        </h3>
                        <div className="lp-portfolio__meta">
                            <span>Interior Design</span>
                            <span>Premium Tier</span>
                            <span>2026</span>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="lp-portfolio__item lp-reveal lp-delay-2">
                        <div className="lp-portfolio__img-wrap">
                            <img
                                src="/images/hotel-lobby.png"
                                alt="Grand luxury hotel lobby"
                            />
                            <div className="lp-portfolio__overlay">
                                <div className="lp-portfolio__overlay-circle">
                                    <span className="lp-portfolio__overlay-text">
                                        View Case
                                    </span>
                                </div>
                            </div>
                        </div>
                        <span className="lp-portfolio__category lp-label">
                            Grand Lobbies
                        </span>
                        <h3 className="lp-portfolio__item-title">
                            The Art of First Impressions
                        </h3>
                        <div className="lp-portfolio__meta">
                            <span>Architecture</span>
                            <span>Heritage</span>
                            <span>2026</span>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="lp-portfolio__item lp-reveal">
                        <div className="lp-portfolio__img-wrap">
                            <img
                                src="/images/hotel-pool.png"
                                alt="Rooftop infinity pool"
                            />
                            <div className="lp-portfolio__overlay">
                                <div className="lp-portfolio__overlay-circle">
                                    <span className="lp-portfolio__overlay-text">
                                        View Case
                                    </span>
                                </div>
                            </div>
                        </div>
                        <span className="lp-portfolio__category lp-label">
                            Wellness
                        </span>
                        <h3 className="lp-portfolio__item-title">
                            Infinity Edge Sanctuaries
                        </h3>
                        <div className="lp-portfolio__meta">
                            <span>Rooftop Design</span>
                            <span>Exclusive</span>
                            <span>2026</span>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="lp-portfolio__item lp-reveal lp-delay-2">
                        <div className="lp-portfolio__img-wrap">
                            <img
                                src="/images/hotel-dining.png"
                                alt="Fine dining restaurant"
                            />
                            <div className="lp-portfolio__overlay">
                                <div className="lp-portfolio__overlay-circle">
                                    <span className="lp-portfolio__overlay-text">
                                        View Case
                                    </span>
                                </div>
                            </div>
                        </div>
                        <span className="lp-portfolio__category lp-label">
                            Gastronomy
                        </span>
                        <h3 className="lp-portfolio__item-title">
                            Culinary Excellence Redefined
                        </h3>
                        <div className="lp-portfolio__meta">
                            <span>Fine Dining</span>
                            <span>Michelin</span>
                            <span>2026</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════
                STATS SECTION
            ════════════════════════════════════ */}
            <section className="lp-stats" id="stats">
                <div className="lp-stats__grid">
                    <div className="lp-reveal">
                        <div className="lp-stat__number">500+</div>
                        <div className="lp-stat__label">Hotels Managed</div>
                    </div>
                    <div className="lp-reveal lp-delay-1">
                        <div className="lp-stat__number">12K</div>
                        <div className="lp-stat__label">
                            Active Bookings
                        </div>
                    </div>
                    <div className="lp-reveal lp-delay-2">
                        <div className="lp-stat__number">99.8%</div>
                        <div className="lp-stat__label">
                            Uptime Guarantee
                        </div>
                    </div>
                    <div className="lp-reveal lp-delay-3">
                        <div className="lp-stat__number">24/7</div>
                        <div className="lp-stat__label">
                            DPI Monitoring
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════
                FOOTER
            ════════════════════════════════════ */}
            <footer className="lp-footer" id="footer">
                <div className="lp-footer__grid">
                    <div className="lp-footer__brand">
                        <div className="lp-footer__brand-name">
                            SMART HOTEL
                        </div>
                        <p className="lp-footer__brand-text">
                            The future of intelligent hospitality management.
                            Combining AI-driven recommendations, real-time
                            traffic intelligence, and advanced network
                            security — all in one platform designed for
                            the modern hotelier.
                        </p>
                    </div>

                    <div className="lp-footer__right">
                        <div className="lp-footer__col">
                            <div className="lp-footer__col-title">
                                Platform
                            </div>
                            <div className="lp-footer__col-links">
                                <a
                                    className="lp-footer__col-link"
                                    href="#services"
                                >
                                    Services
                                </a>
                                <a
                                    className="lp-footer__col-link"
                                    href="#portfolio"
                                >
                                    Destinations
                                </a>
                                <a
                                    className="lp-footer__col-link"
                                    href="#stats"
                                >
                                    Intelligence
                                </a>
                                <a
                                    className="lp-footer__col-link"
                                    onClick={() => navigate("/login")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Dashboard
                                </a>
                            </div>
                        </div>

                        <div className="lp-footer__col">
                            <div className="lp-footer__col-title">
                                Features
                            </div>
                            <div className="lp-footer__col-links">
                                <span className="lp-footer__col-link">
                                    AI Recommendations
                                </span>
                                <span className="lp-footer__col-link">
                                    Traffic Analysis
                                </span>
                                <span className="lp-footer__col-link">
                                    DPI Security
                                </span>
                                <span className="lp-footer__col-link">
                                    Real-time Alerts
                                </span>
                            </div>
                        </div>

                        <div className="lp-footer__col">
                            <div className="lp-footer__col-title">
                                Locations
                            </div>
                            <div className="lp-footer__col-links">
                                <span className="lp-footer__col-link">
                                    Delhi
                                </span>
                                <span className="lp-footer__col-link">
                                    Mumbai
                                </span>
                                <span className="lp-footer__col-link">
                                    Bengaluru
                                </span>
                                <span className="lp-footer__col-link">
                                    Pune
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lp-footer__bottom">
                    <span className="lp-footer__copyright">
                        © 2026 SMART HOTEL TRAFFIC PLATFORM. ALL RIGHTS
                        RESERVED.
                    </span>
                    <div className="lp-footer__legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
