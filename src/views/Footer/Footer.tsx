import { useRef } from "react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../../assets/Icons";
import "./Footer.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../../components/Button/Button";
import CircularText from "../../components/CircularText/CircularText";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const titleRef = useRef(null);

    useGSAP(() => {
        if (titleRef.current) {
            gsap.to(titleRef.current, {
                x: "-5%",
                duration: 10,
                ease: "none",
                repeat: -1,
                yoyo: true,
            });
        }
    }, []);

    return (
        <footer id="contact" className="contact--section">
            <div className="footer--wrapper">
                <div className="footer--content">
                    <div className="side">
                        <div className="social-links">
                            {[
                                <CircularText
                                    text="LINKEDIN * LINKEDIN * LINKEDIN * "
                                    spinDuration={50}
                                    onHover="goBonkers"
                                    onClick={() => window.open("https://www.linkedin.com/in/lucas-poujardieu/")}
                                    icon={<LinkedinIcon color="#fff" />}
                                />,
                                <CircularText
                                    text="GITHUB * GITHUB * GITHUB * "
                                    spinDuration={50}
                                    onHover="goBonkers"
                                    onClick={() => window.open("https://github.com/lupoujardieu")}
                                    icon={<GithubIcon color="#fff" />}
                                />,
                                <CircularText
                                    text="TWITTER * X * TWITTER * X * "
                                    spinDuration={50}
                                    onHover="goBonkers"
                                    onClick={() => window.open("https://x.com/PoujardieuL")}
                                    icon={<TwitterIcon color="#fff" />}
                                />,
                            ].map((item, i) => (
                                <div key={i} className="footer-icon-wrapper">
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="copyright">
                            © {currentYear} Lucas Poujardieu <br />
                            Tous droits réservés.
                        </div>
                    </div>
                    <div className="contact">
                        <a href="mailto:lucas.poujardieu@gmail.com">lucas.poujardieu@gmail.com</a>
                        <a href="tel:+33613379495">06 13 37 94 95</a>
                        <p>Basé à Bordeaux 🍇</p>
                    </div>
                    <div className="footer--nav">
                        <Button
                            text="Retour au début"
                            type="footer"
                            onClick={() => {
                                window.location.href = "#start";
                            }}
                        />
                    </div>
                </div>

                <h3 ref={titleRef} className="footer--title">
                    Contact Contact Contact Contact Contact Contact Contact Contact Contact Contact
                </h3>
            </div>
        </footer>
    );
};

export default Footer;
