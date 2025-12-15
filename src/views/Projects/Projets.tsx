import {
    CakePHPIcon,
    DockerIcon,
    JavaScriptIcon,
    JqueryIcon,
    PhpIcon,
    ReactIcon,
    SupabaseIcon,
    SymfonyIcon,
    TypeScriptIcon,
    VercelIcon,
} from "../../assets/Icons";
import "./Projets.css";

const Projets = () => {
    return (
        <section className="projets-section" id="projets">
            <div className="projets--wrapper">
                <div className="projets-header">
                    <h3>Mes Projets</h3>
                </div>
                <div className="bento--wrapper">
                    <article id="SFH" className="bento--item">
                        <img src="/imgs/projets/logo-Simforhealth-S.svg" alt="logo sfh" />
                    </article>
                    <article id="medicactiv" className="bento--item">
                        <img src="/imgs/projets/medicactiv.svg" alt="medicactiv" />
                        <ul className="bottom">
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
                        </ul>
                        <blockquote>
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
                        </ul>
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
                        </ul>
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
                            <li data-tooltip="Docker">
                                <DockerIcon color="#0055FF" />
                            </li>
                        </ul>
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
                        </ul>
                    </article>
                    <article id="ih" className="bento--item">
                        <img src="/imgs/projets/ih.svg" alt="ih" />
                    </article>
                </div>
            </div>
        </section>
    );
};

export default Projets;
