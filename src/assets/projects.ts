export interface TechnoDto {
    text: string;
}

export interface ProjectDto {
    id: number;
    type: "pro" | "perso";
    title?: string;
    assetSrc?: string;
    description?: string;
    technos: TechnoDto[];
    links?: string[];
}

export const mySFH: ProjectDto = {
    id: 1,
    type: "pro",
    title: "mySimforhealth",
    description:
        "Une plateforme de formation **LMS** (Learning Management System) dédié à la **formation des étudiants, futur soignants et professionels de santé**. \n" +
        "\n\n" +
        "Ce projet avait été initié pour remplacer l'ancienne plateforme LMS de l'entreprise (**MedicActiv**).",
    technos: [
        { text: "PHP" },
        { text: "Symfony" },
        { text: "MySQL" },
        { text: "ReactJS" },
        { text: "MUI" },
        { text: "Docker" },
        { text: "I18next" },
        { text: "PHPUnit" },
        { text: "Traefik" },
        { text: "Postman" },
        { text: "Swagger & Redocly" },
        { text: "Uptime Kuma" },
    ],
    assetSrc: "/imgs/projets/mySFH.png",
    links: [
        "https://www.linkedin.com/posts/simforhealth_innovation-formationinfirmiaeyre-simforhealth-activity-7381962381993594880-sl5p?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC1y118B_Iqs1yO2iqgrdpuiJn6iUAlep7c",
    ],
};

export const MedicActiv: ProjectDto = {
    id: 2,
    type: "pro",
    title: "",
    description:
        "MedicActiv c'est **la plateforme de formation historique** de Simforhealth.\n" +
        "\n\n" +
        "Elle permet de lancer des **serious games** et **piloter des formations** pour des groupes d'apprenants.\n" +
        "\n\n" +
        "J'ai du assurer **la maintenance et l'évolution** du projet jusqu'à son remplacement par la plateforme **mySimforhealth**.",
    technos: [
        { text: "PHP" },
        { text: "CakePHP" },
        { text: "MySQL" },
        { text: "VueJS V2" },
        { text: "JQuery" },
        { text: "Docker" },
        { text: "Jenkins" },
        { text: "Kubernetes" },
        { text: "Google Cloud Platform" },
    ],
    assetSrc: "/imgs/projets/MedicActiv.png",
    links: ["https://www.youtube.com/watch?v=XPuEMEibVbM"],
};

const Almirall: ProjectDto = {
    id: 3,
    type: "pro",
    title: "Ravivez les couleurs de la vie d'Émilie",
    description:
        "Un projet réalisé à l'ocassion d'un salon pour le laboratoire Almirall.\n" +
        "J'ai réalisé un site \"Ipad first\" prenant part dans un escape game chronométré sur l'impact de l'interleukine 13 dans le déclenchement de l'eczema atopique \n" +
        "Ce projet contient un ensemble de quizs et mini-jeux guidant le joueur dans l'expérience",
    technos: [{ text: "ReactTS" }, { text: "Vercel" }],
};

// const JJQuiz: ProjectDto = {
//     id: 4,
//     type: "pro",
//     title: "Jouer c'est donner !",
//     description:
//         "Projet caritatif réalisé pour le laboratoire Johnson&Johnson.\n" +
//         "Le but était de proposer une borne tactile intéractive avec un ensemble de quiz sur la thématique de l'hématologie et d'insité le joueur à donner pour l'évènement caritatif \n" +
//         "De plus, la borne est accompagné d'un compteur de participation (liason une base de donnée)",
//     technos: [{ text: "ReactTS" }, { text: "Vercel" }, { text: "Supabase" }],
// };

const Astellas: ProjectDto = {
    id: 5,
    type: "pro",
    title: "Vrai ou Chaud",
    description:
        "Une animation de stand pour le laboratoire Astellas.\n" +
        "Le but était de proposer une borne tactile qui propose un ensemble de quiz avec un score et un classement. \n" +
        "On a un enregistrement des données liées au numéro RPPS des joueurs et vérifié avec une base de données nationnale de professionels de santé.",
    technos: [
        { text: "ReactTS" },
        { text: "Express" },
        { text: "Supabase" },
        { text: "Mailjet" },
        { text: "Docker" },
        { text: "Traefik" },
        { text: "Python" },
    ],
};

const ReInvent: ProjectDto = {
    id: 6,
    type: "pro",
    title: "RE-INvent",
    description:
        "Un support intéractif sur Ipad pour le laboratoire Ipsen sur la thématique du carcinome rénal non à cellules claires dans le cadre d'un escape game. \n" +
        "Le but était d'ammener le joueur à résoudre un mystère médical et de l'orienter dans l'ouverture de document physique et la résolution d'énigme.",
    technos: [{ text: "ReactTS" }, { text: "Vercel" }],
};

// const Survi: ProjectDto = {
//     id: 7,
//     type: "pro",
//     title: "Survi serious game",
//     description:
//         "C'est un projet de serious game réalisé avec l'APHP (Assistance Publique Hopitaux de Paris) et destiné aux praticiens hospitaliers (internes,medecins urgentistes, gastroentérologue) pour former au dépistage rapide de l'infarctus mésentérique aiguë. \n" +
//         "Scénario clinique immersif arborescent nécessitant la prise de décisions thérapeutiques rapides dans la prise en charge d'un patient qui arrive aux urgences au travers de quiz. \n" +
//         "Cette expérience numérique est traduite en français et en anglais",
//     technos: [{ text: "ReactTS" }, { text: "Vercel" }, { text: "I18next" }],
// };
