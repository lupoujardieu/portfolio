export interface ModalData {
    title: string;
    image: string;
    isVideo: boolean;
    description: string;
    period?: string;
    accentColor?: string;
    exitColor?: string;
    technos?: string[];
    links?: string[];
}

export const circularGalleryItems = [
    { image: "/imgs/perso/navisails.png", text: "NaviSails" },
    { image: "/imgs/perso/photographic.png", text: "Photographic" },
    { image: "/imgs/perso/three.png", text: "Découvrir ThreeJS" },
    { image: "/imgs/perso/portfolio.png", text: "Portfolio" },
    { image: "/imgs/perso/diadesland.png", text: "Diadesland" },
];

export const modalDatas: ModalData[] = [
    {
        title: "NaviSails",
        image: "/imgs/perso/navisails.mp4",
        period: "21 Dec. 2023",
        isVideo: true,
        description:
            '**NaviSail** est un projet "apprentissage" qui m\'a permis de me familiariser les bases de **ReactJS**.\n' +
            "C'est un site qui représente une entreprise fictive de fabricant de bateaux. \n" +
            "Tout le contenu est libre de droits et généré via des intelligences artificielles (ChatGPT, DALL-E 2). \n",
        technos: ["ReactTS", "SASS", "Vite", "GitHub Pages"],
        links: ["https://github.com/lupoujardieu/navisails", "https://lupoujardieu.github.io/navisails/"],
    },
    {
        title: "Photographic",
        image: "/imgs/perso/photographic.mp4",
        period: "Jav. 2024",
        isVideo: true,
        description:
            "**Photographic** a été réalisé dans le but de pouvoir présenter mes photos de voyages avec une petite explication (en cours de développement).\n" +
            "L'effet de chargement des images j'ai utilisé un composant **ReactBits** qui crée une distorsion dans l'image affichée et au survol de celle-ci. \n" +
            'Par la suite, je vais rajouter des pages par **"voyage"** afin de pouvoir raconter des **anecdotes** (comme un **carnet de voyage**).',
        technos: ["ReactTS", "ReactBits", "Vite", "Vercel"],
        links: ["https://photographic-rho.vercel.app/"],
    },
    {
        title: "Découvrir ThreeJS",
        image: "/imgs/perso/three.mp4",
        period: "Mars 2022",
        isVideo: true,
        description:
            "**Découvrir ThreeJS** est un projet que j'avais réalisé dans le cadre de ma formation au sein de l'**IUT Informatique de Bordeaux**." +
            "\n\n" +
            "Le but était de **présenter** une technologie au choix à l'ensemble de la classe et ayant déjà un grand attrait pour **la librairie ThreeJS**, j'ai donc réalisé ce site." +
            "\n\n" +
            "Il présente la librairie et propose un **tutoriel** afin de guider le visiteur vers la création de son **premier modèle 3D**." +
            "\n\n" +
            "_À noter que les dépendances n'ont pas été mise à jour, il est possible que des bugs apparaissent._",
        technos: ["HTML", "Vanilla JavaScript", "ThreeJS", "Webpack"],
        links: ["https://lupoujardieu.github.io/veille_tech_threeJS/"],
    },
    {
        title: "Portfolio",
        image: "/imgs/perso/portfolio.mp4",
        period: "Dec. 2025",
        isVideo: true,
        description:
            "Bienvenue sur mon **portfolio** !" +
            "\n\n" +
            "Ce projet représente ma vitrine **professionnelle** et **personnelle** en tant que développeur, mettant en avant mes compétences techniques, mes réalisations et ma vision du développement web moderne.",
        technos: ["ReactTS", "Vercel", "GSAP", "React Three Fiber", "I18next"],
        links: ["https://github.com/lupoujardieu/portfolio"],
    },
    {
        title: "Diadesland",
        image: "/imgs/perso/diadesland.jpg",
        period: "Jui. 2022",
        isVideo: false,
        description:
            "**DiadESland** est un jeu sérieux développé dans le cadre du projet européen **DiadES**, qui vise à améliorer la gestion internationale des poissons migrateurs face aux pressions environnementales et au changement climatique." +
            "\n\n" +
            "J’ai réalisé un **POC (proof of concept)** d’adaptation du jeu de société en jeu **multijoueur temps réel**, " +
            "permettant à plusieurs joueurs d’incarner des gestionnaires de **bassin versant** et de prendre des décisions stratégiques impactant la **biodiversité** et les **services écosystémiques**. " +
            "Ce prototype explore le potentiel du jeu vidéo comme **outil de sensibilisation**, de **médiation scientifique** et d’**aide à la décision**.",
        technos: ["ReactJS", "Laravel", "Socket.io"],
        links: [
            "https://www.inrae.fr/actualites/projet-diades-outils-innovants-gestion-internationale-poissons-migrateurs",
        ],
    },
];
