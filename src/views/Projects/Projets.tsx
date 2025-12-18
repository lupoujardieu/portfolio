import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
    CakePHPIcon,
    DockerIcon,
    EyeIcon,
    GithubIcon,
    JavaScriptIcon,
    JqueryIcon,
    PhpIcon,
    PlusIcon,
    ReactIcon,
    SupabaseIcon,
    SymfonyIcon,
    TypeScriptIcon,
    VercelIcon,
} from "../../assets/Icons";
import "./Projets.css";
import CircularGallery from "../../components/CircularGallery/CircularGallery";
import { useGSAP } from "@gsap/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import { circularGalleryItems, modalDatas, type ModalData } from "../../assets/ModalData";

const Projets = () => {
    const IS_MOBILE_BREAKPOINT = 992;
    const [isMobile, setIsMobile] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState<ModalData>();

    const blockquoteRefs = useRef<Record<string, HTMLQuoteElement | null>>({});
    const modalRef = useRef<HTMLDivElement | null>(null);
    const modalContentRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            if (!showModal || !modalRef.current) return;

            // 🔒 lock scroll
            document.body.style.overflow = "hidden";

            // 🎨 thème dynamique
            modalRef.current.style.setProperty("--modal-accent", modalData?.accentColor || "var(--primary-color)");

            gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });

            gsap.fromTo(
                modalContentRef.current,
                { y: 40, scale: 0.96, opacity: 0 },
                {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 0.45,
                    ease: "power3.out",
                    delay: 0.1,
                },
            );

            // 🧼 cleanup auto useGSAP
            return () => {
                document.body.style.overflow = "";
            };
        },
        { dependencies: [showModal, modalData] },
    );

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= IS_MOBILE_BREAKPOINT);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleArticleClick = (articleId: string) => {
        const blockquote = blockquoteRefs.current[articleId];

        if (!blockquote) return;

        // Check if blockquote is currently visible
        const isVisible = gsap.getProperty(blockquote, "opacity") === 1;

        if (isVisible) {
            // Hide animation
            gsap.to(blockquote, {
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    gsap.set(blockquote, { display: "none" });
                },
            });
        } else {
            // Show animation
            gsap.set(blockquote, { display: "flex" });
            gsap.fromTo(
                blockquote,
                {
                    opacity: 0,
                    scale: 0.95,
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out",
                },
            );
        }
    };

    const closeModal = () => {
        if (!modalRef.current || !modalContentRef.current) {
            setShowModal(false);
            return;
        }

        gsap.to(modalContentRef.current, {
            y: 40,
            scale: 0.96,
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
        });

        gsap.to(modalRef.current, {
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
            delay: 0.05,
            onComplete: () => {
                document.body.style.overflow = "";
                setShowModal(false);
            },
        });
    };

    const getIconLink = (link: string) => {
        const color = "#1a1a1a";
        const host = new URL(link).hostname;

        switch (host) {
            case "github.com":
                return <GithubIcon color={color} />;
            default:
                return <EyeIcon color={color} />;
        }
    };

    return (
        <section className="projets-section" id="projets">
            <div className="projets--wrapper">
                <div className="projets-header">
                    <h3>Mes projets pro</h3>
                </div>
                <div className="bento--wrapper">
                    <article id="SFH" className="bento--item">
                        <img src="/imgs/projets/logo-Simforhealth-S.svg" alt="logo sfh" />
                    </article>
                    <article id="medicactiv" className="bento--item">
                        <img src="/imgs/projets/medicactiv.svg" alt="medicactiv" />
                        <ul className="bottom">
                            <div className="first--item">
                                <li>MedicActiv</li>
                            </div>
                            <li data-tooltip="PHP">
                                <PhpIcon color="#0055FF" />
                            </li>
                            <li data-tooltip="JavaScript">
                                <JavaScriptIcon color="#0055FF" />
                            </li>
                            <li data-tooltip="CakePHP">
                                <CakePHPIcon color="#0055FF" />
                            </li>
                            <li data-tooltip="JQuery">
                                <JqueryIcon color="#0055FF" />
                            </li>
                            <li
                                className="last--item"
                                data-tooltip="En savoir plus"
                                onClick={() => handleArticleClick("medicactiv")}
                                style={{ backgroundColor: "#0055FF" }}>
                                <PlusIcon color="#fff" />
                            </li>
                        </ul>
                        <blockquote
                            ref={(el) => {
                                blockquoteRefs.current["medicactiv"] = el;
                            }}
                            style={{ opacity: 0, display: "none" }}>
                            <div className="close-blockquote" onClick={() => handleArticleClick("medicactiv")}>
                                <PlusIcon color="#0055FF" />
                            </div>
                            <p>
                                MedicActiv c'est <strong>la plateforme de formation historique</strong> de Simforhealth.
                                <br />
                                <br />
                                Elle permet de lancer des <strong>serious games</strong> et{" "}
                                <strong>piloter des formations</strong> pour des groupes d'apprenants. <br />
                                J'ai du assurer <strong>la maintenance et l'évolution</strong> du projet jusqu'à son
                                remplacement par la plateforme <strong>mySimforhealth</strong>.
                                <br />
                                <br />
                                Cette plateforme m'a permis de faire mes armes sur un projet utilisé par beaucoup
                                d'utilisateurs (<strong>≃50 000</strong>).
                            </p>
                        </blockquote>
                    </article>
                    <article id="mySFH" className="bento--item">
                        <img src="/imgs/projets/mysfh.svg" alt="mysfh" />
                        <ul className="bottom">
                            <div className="first--item">
                                <li>
                                    my<span>Simforhealth</span>
                                </li>
                            </div>
                            <li data-tooltip="PHP">
                                <PhpIcon color="#0055FF" />
                            </li>
                            <li data-tooltip="JavaScript">
                                <JavaScriptIcon color="#0055FF" />
                            </li>
                            <li data-tooltip="Symfony">
                                <SymfonyIcon color="#0055FF" style={{ width: "34px", height: "34px" }} />
                            </li>
                            <li data-tooltip="ReactJS">
                                <ReactIcon color="#0055FF" />
                            </li>
                            <li data-tooltip="Docker">
                                <DockerIcon color="#0055FF" />
                            </li>
                            <li
                                className="last--item"
                                data-tooltip="En savoir plus"
                                onClick={() => handleArticleClick("mySFH")}
                                style={{ backgroundColor: "#0055FF" }}>
                                <PlusIcon color="#fff" />
                            </li>
                        </ul>

                        <blockquote
                            ref={(el) => {
                                blockquoteRefs.current["mySFH"] = el;
                            }}
                            style={{ opacity: 0, display: "none" }}>
                            <div className="close-blockquote" onClick={() => handleArticleClick("mySFH")}>
                                <PlusIcon color="var(--mySFH-2-color)" />
                            </div>
                            <p>
                                Une plateforme de formation <strong>LMS</strong> (Learning Management System) dédié à la{" "}
                                <strong>formation des étudiants, futur soignants et professionels de santé</strong>.
                                <br />
                                <br />
                                Ce projet avait été initié pour remplacer l'ancienne plateforme LMS de l'entreprise (
                                <strong>MedicActiv</strong>).
                                <br />
                                <br />
                                <strong>Mes réalisations clés :</strong>
                            </p>
                            <ol>
                                <li>
                                    Conception des wireframes sur <strong>Figma</strong>
                                </li>
                                <li>
                                    Création d'une <strong>architecture moderne</strong> et simplification des
                                    fonctionnalités complexes.
                                </li>
                                <li>
                                    Mise en place de <strong>tests unitaires et fonctionnels</strong> pour garantir la
                                    qualité du code.
                                </li>
                                <li>
                                    Migration complète des données de l'ancienne vers la nouvelle plateforme en respect
                                    du <strong>RGPD</strong>.
                                </li>
                                <li>
                                    Intégration d'<strong>outils de monitoring </strong>(Uptime Kuma, Grafana) et de
                                    sécurité (Vaultwarden).
                                </li>
                                <li>
                                    Génération de <strong>documentation technique</strong> (OpenAPI via Swagger/Redocly)
                                    et utilisateur. Modernisation continue de la stack technique.
                                </li>
                                <li>
                                    Maintenance évolutive de la plateforme, optimisations performances/sécurité, et
                                    support client niveau 2 via HubSpot CRM.
                                </li>
                            </ol>
                        </blockquote>
                    </article>
                    <article id="almirall" className="bento--item">
                        <img src="/imgs/projets/almirall.svg" alt="almirall" />
                        <ul className="bottom">
                            <li data-tooltip="TypeScript">
                                <TypeScriptIcon color="#0055FF" />
                            </li>
                            <li data-tooltip="ReactTS">
                                <ReactIcon color="#0055FF" />
                            </li>
                            <li data-tooltip="Vercel">
                                <VercelIcon color="#0055FF" />
                            </li>
                            <li
                                className="last--item"
                                data-tooltip="En savoir plus"
                                onClick={() => handleArticleClick("almirall")}
                                style={{ backgroundColor: "#0055FF" }}>
                                <PlusIcon color="#fff" />
                            </li>
                        </ul>
                        <blockquote
                            ref={(el) => {
                                blockquoteRefs.current["almirall"] = el;
                            }}
                            style={{ opacity: 0, display: "none" }}>
                            <div className="close-blockquote" onClick={() => handleArticleClick("almirall")}>
                                <PlusIcon color="#002855" />
                            </div>
                            <p>
                                Un projet réalisé à l'ocassion d'un salon pour le <strong>laboratoire Almirall</strong>.
                                <br />
                                J'ai créé un site <strong>"Ipad first"</strong> prenant part dans un escape game
                                chronométré sur l'impact de l'<strong>interleukine 13</strong> dans le déclenchement de
                                l'eczema atopique.
                                <br />
                                <br />
                                Ce <strong>serious game</strong> contient un ensemble de quizs et mini-jeux guidant le
                                joueur dans l'expérience.
                            </p>
                        </blockquote>
                    </article>
                    <article id="astellas" className="bento--item">
                        <img src="/imgs/projets/astellas.svg" alt="astellas" />
                        <ul className="bottom">
                            <li data-tooltip="TypeScript">
                                <TypeScriptIcon color="#0055FF" />
                            </li>
                            <li data-tooltip="ReactTS">
                                <ReactIcon color="#0055FF" />
                            </li>
                            <li data-tooltip="Supabase">
                                <SupabaseIcon color="#0055FF" />
                            </li>
                            <li
                                className="last--item"
                                data-tooltip="En savoir plus"
                                onClick={() => handleArticleClick("astellas")}
                                style={{ backgroundColor: "#0055FF" }}>
                                <PlusIcon color="#fff" />
                            </li>
                        </ul>
                        <blockquote
                            ref={(el) => {
                                blockquoteRefs.current["astellas"] = el;
                            }}
                            style={{ opacity: 0, display: "none" }}>
                            <div className="close-blockquote" onClick={() => handleArticleClick("astellas")}>
                                <PlusIcon color="#e05441" />
                            </div>
                            <p>
                                Une animation de stand pour le <strong>laboratoire Astellas</strong>.
                                <br />
                                <br />
                                Le but était de proposer une <strong>borne tactile</strong> avec un ensemble de quizs
                                associé un score et un classement des joueurs.
                                <br />
                                <br />
                                Le principal défi de cette réalisation, était de{" "}
                                <strong>recouper les données publiques</strong> de l'<strong>annulaire de santé</strong>{" "}
                                afin de pouvoir <strong>vérifier le numéro RPPS</strong> des médecins jouant sur le
                                stand.
                            </p>
                        </blockquote>
                    </article>
                    <article id="reinvent" className="bento--item">
                        <img src="/imgs/projets/reinvent.svg" alt="reinvent" />
                        <ul className="bottom">
                            <li data-tooltip="TypeScript">
                                <TypeScriptIcon color="#0055FF" />
                            </li>
                            <li data-tooltip="ReactTS">
                                <ReactIcon color="#0055FF" />
                            </li>
                            <li data-tooltip="Vercel">
                                <VercelIcon color="#0055FF" />
                            </li>
                            <li
                                className="last--item"
                                data-tooltip="En savoir plus"
                                onClick={() => handleArticleClick("reinvent")}
                                style={{ backgroundColor: "#0055FF" }}>
                                <PlusIcon color="#fff" />
                            </li>
                        </ul>
                        <blockquote
                            ref={(el) => {
                                blockquoteRefs.current["reinvent"] = el;
                            }}
                            style={{ opacity: 0, display: "none" }}>
                            <div className="close-blockquote" onClick={() => handleArticleClick("reinvent")}>
                                <PlusIcon color="#8b1dfb" />
                            </div>
                            <p>
                                Un support intéractif sur <strong>Ipad</strong> pour le{" "}
                                <strong>laboratoire Ipsen</strong> sur la thématique du carcinome rénal non à cellules
                                claires dans le cadre d'un escape game.
                                <br />
                                <br />
                                Le but était d'ammener le joueur à <strong>résoudre un mystère médical</strong> et de
                                l'orienter dans l'ouverture de document physique et la{" "}
                                <strong>résolution d'énigmes</strong>.
                                <br />
                                <br />
                                Le principal défi de ce projet a été de{" "}
                                <strong>gérer le rendu d'un gros livrable</strong> sur une date très courte (100 écrans
                                en une semaine). Pour ce faire, l'
                                <strong>optimisation de l'architecture du projet</strong> a permis de livrer ce projet
                                dans les temps.
                            </p>
                        </blockquote>
                    </article>
                    <article id="ih" className="bento--item">
                        <img src="/imgs/projets/ih.svg" alt="ih" />
                    </article>
                </div>

                <div className="project-perso--wrapper">
                    <h3>Mes projets perso</h3>
                    <div className="cards--wrapper">
                        <CircularGallery
                            bend={isMobile ? 0 : -3}
                            items={circularGalleryItems}
                            textColor="#1a1a1a"
                            borderRadius={0.05}
                            scrollEase={0.05}
                            scrollSpeed={2}
                            onCardClick={(_index, item) => {
                                setModalData(modalDatas.find((data) => data.title === item.text));
                                setShowModal(true);
                            }}
                        />
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="project-perso--modal" ref={modalRef}>
                    <div className="modal--container">
                        <div className="modal--closebtn" onClick={closeModal}>
                            <PlusIcon color={modalData?.exitColor || "#000"} />
                        </div>

                        <div className="modal--header">
                            <div className="modal-title--wrapper">
                                <h5>{modalData?.title}</h5>
                                <p>{modalData?.period}</p>
                            </div>

                            {modalData?.isVideo ? (
                                <video autoPlay loop>
                                    <source src={modalData.image} type="video/mp4" />
                                </video>
                            ) : (
                                <img src={modalData?.image} alt={modalData?.title} />
                            )}
                        </div>

                        <div className="modal--content" ref={modalContentRef}>
                            <div className="modal--description">
                                <Markdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeHighlight]}>
                                    {modalData?.description}
                                </Markdown>
                            </div>

                            {modalData?.links && (
                                <div className="modal--links">
                                    {modalData.links.map((link, index) => (
                                        <a key={index} className="link" href={link} target="_blank">
                                            {getIconLink(link)}
                                        </a>
                                    ))}
                                </div>
                            )}

                            {modalData?.technos && (
                                <div className="modal--techno">
                                    {modalData.technos.map((techno, index) => (
                                        <div key={index} className="techno">
                                            {techno}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projets;
