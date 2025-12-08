import "./Projets.css";
import { useMemo, useState } from "react";
import { projects } from "../../assets/projects";
// import MultiSelect from "./components/MultiSelect";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import { LinkedinIcon, YoutubeIcon } from "../../assets/Icons";

type Project = (typeof projects)[number];

const Projets = () => {
    const [typeFilter, _setTypeFilter] = useState<"all" | Project["type"]>("all");
    const [selectedTechnos, _setSelectedTechnos] = useState<string[]>([]);

    // const allTechnos = useMemo(() => {
    //     const set = new Set<string>();
    //     projects.forEach((p) => p.technos.forEach((t) => set.add(t.text)));
    //     return Array.from(set).sort((a, b) => a.localeCompare(b));
    // }, []);

    // const clearFilters = () => {
    //     setTypeFilter("all");
    //     setSelectedTechnos([]);
    // };

    const filteredProjects = useMemo(() => {
        return projects.filter((p) => {
            if (typeFilter !== "all" && p.type !== typeFilter) return false;
            if (selectedTechnos.length === 0) return true;
            const techTexts = p.technos.map((t) => t.text);
            // AND filter: project must include all selected technologies
            return selectedTechnos.every((t) => techTexts.includes(t));
        });
    }, [typeFilter, selectedTechnos]);

    const getIconByLink = (link: string) => {
        const domain = new URL(link).hostname;
        const BASE_COLOR = "#fff";

        switch (domain) {
            case "www.linkedin.com":
                return <LinkedinIcon className="linkedin" color={BASE_COLOR} />;
            case "www.youtube.com":
                return <YoutubeIcon className="youtube" color={BASE_COLOR} />;
            default:
                break;
        }
    };

    return (
        <section className="projets-section" id="projets">
            <div className="projets--wrapper">
                <div className="projets-header">
                    <h3>Mes Projets</h3>
                </div>

                {/* <div className="projets-filters">
                    <div className="type-filters">
                        <button
                            className={`type-btn ${typeFilter === "all" ? "active" : ""}`}
                            onClick={() => setTypeFilter("all")}>
                            Tous
                        </button>
                        <button
                            className={`type-btn ${typeFilter === "pro" ? "active" : ""}`}
                            onClick={() => setTypeFilter("pro")}>
                            Pro
                        </button>
                        <button
                            className={`type-btn ${typeFilter === "perso" ? "active" : ""}`}
                            onClick={() => setTypeFilter("perso")}>
                            Perso
                        </button>
                        {(typeFilter !== "all" || selectedTechnos.length > 0) && (
                            <button className="clear-btn" onClick={clearFilters}>
                                Réinitialiser
                            </button>
                        )}
                    </div>

                    <MultiSelect
                        options={allTechnos}
                        value={selectedTechnos}
                        onChange={setSelectedTechnos}
                        label="Technologies (sélection multiple)"
                    />
                </div> */}

                <div className="projets-cards--wrapper">
                    {filteredProjects.map((p) => (
                        <article key={p.id} className="project-card">
                            <div className="project-card--header">
                                <img src={p.assetSrc || "https://placehold.co/400"} alt="header card img" />
                                <span className={`badge ${p.type}`}>{p.type}</span>
                                {p.links?.length ? (
                                    <div className="links">
                                        {p.links.map((link, idx) => (
                                            <a key={idx} href={link} target="_blank" rel="noreferrer">
                                                {getIconByLink(link)}
                                            </a>
                                        ))}
                                    </div>
                                ) : null}
                                {p.title && <h4 className="title">{p.title}</h4>}
                            </div>
                            <div className="project-card--content">
                                {p.description && (
                                    <div className="description">
                                        <Markdown
                                            remarkPlugins={[remarkGfm, remarkBreaks]}
                                            rehypePlugins={[rehypeHighlight]}>
                                            {p.description}
                                        </Markdown>
                                    </div>
                                )}
                                {p.technos?.length > 0 && (
                                    <div className="technos">
                                        {p.technos.map((t) => (
                                            <span key={t.text} className="tech">
                                                #{t.text}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projets;
