import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "../../components/Button/Button";
import "./About.css";
import HorizontalScrollText from "../../components/HorizontalScrollText/HorizontalScrollText";
import DownloadButton from "../../components/Button/DownloadButton";
import AboutExperience from "./components/AboutExperience";

const About = () => {
    const blobRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(blobRef.current, {
                borderRadius: () => {
                    const rand = () => gsap.utils.random(35, 70);
                    return `${rand()}% ${rand()}% ${rand()}% ${rand()}% / ${rand()}% ${rand()}% ${rand()}% ${rand()}%`;
                },
                duration: 2,
                ease: "power1.inOut",
                repeat: -1,
                repeatRefresh: true,
            });
        });

        return () => ctx.revert();
    }, []);

    const scrollItems = [
        "PHP",
        "Symfony",
        "MySQL",
        "PHPUnit",
        "OpenAPI",
        "Laravel",
        "Express JS",
        "Supabase",
        "PostgreSQL",
        "MongoDB",
        "Wordpress",
        "WebToLead Salesforce",
        "SCORM",
        "Javascript",
        "TypeScript",
        "React",
        "MUI",
        "Angular",
        "ThreeJS",
        "I18next",
        "Redux",
        "Docker",
        "Traefik",
        "Linux",
        "Vercel",
        "Google Cloud Platform",
        "Kubernetes",
        "Uptime Kuma",
        "Grafana",
        "Vaultwarden / Bitwarden",
        "Jenkins",
        "Macos",
        "Debian",
        "Postman",
        "PHPStorm",
        "Figma",
        "Davinci Resolve",
        "HubSpot",
        "Notion",
        "Elevenlabs",
    ];

    return (
        <section className="about-section" id="about-me">
            <AboutExperience />

            <div className="about-text--wrapper" ref={blobRef}>
                <h3>Hello !</h3>
                <p>
                    Moi c’est Lucas, un développeur basé en région bordelaise spécialisé dans la{" "}
                    <span>création d’application Full Stack</span>. J’utilise principalement des technologies comme{" "}
                    <span>React</span>, <span>Symfony</span>, <span>MySQL</span>.
                </p>
                <p>
                    Je m’intéresse notamment aux pratiques <span>DevOps</span> sur <span>Docker</span> et au{" "}
                    <span>creative developement</span> avec la librairie <span>ThreeJS</span>.
                </p>
                <div className="btns--wrapper">
                    <DownloadButton
                        text="Télécharger mon CV"
                        type="main"
                        attachement="/docs/Lucas_Poujardieu_CV.pdf"
                        attachementType="pdf"
                    />
                    <Button text="Mes projets" type="clear" />
                </div>
            </div>

            <HorizontalScrollText items={scrollItems} speed={20} />
            {/* <div  style={{ visibility: "hidden", position: "absolute", bottom: 0 }}></div> */}
        </section>
    );
};

export default About;
