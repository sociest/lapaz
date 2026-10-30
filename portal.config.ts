export interface PortalConfig {
  organization: {
    name: string;
    slug: string;
    url: string;
    github: string;
    description: string;
  };
  site: {
    title: string;
    description: string;
    tagline: string;
    url: string;
    base: string;
  };
  pwa: {
    enabled: boolean;
    name: string;
    shortName: string;
    themeColor: string;
    backgroundColor: string;
  };
  desktopApp: {
    enabled: boolean;
    name: string;
    downloadUrl: string;
    enableLocalProcessing: boolean;
  };
  nav: Array<{
    label: string;
    key?: string;
    path: string;
  }>;
}

export const config: PortalConfig = {
  organization: {
    name: "Datos La Paz",
    slug: "datoslapaz",
    url: "https://datosbolivia.github.io/lapaz",
    github: "https://github.com/datosbolivia/catalogo-lapaz",
    description: "Iniciativa colaborativa y abierta de datos públicos y estadísticas de la Ciudad de La Paz."
  },
  site: {
    title: "Datos La Paz",
    description: "Portal catálogo de Datos Abiertos de la Ciudad de La Paz",
    tagline: "Datos abiertos y estadísticas municipales para la comunidad paceña.",
    url: "https://datosbolivia.github.io/lapaz",
    base: "/lapaz"
  },
  pwa: {
    enabled: true,
    name: "Datos La Paz - Portal de Datos",
    shortName: "DatosLaPaz",
    themeColor: "#9e1b2f",
    backgroundColor: "#f8fafc"
  },
  desktopApp: {
    enabled: false,
    name: "Datos La Paz Desktop",
    downloadUrl: "https://github.com/datosbolivia/catalogo-lapaz/releases",
    enableLocalProcessing: false
  },
  nav: [
    { label: "Catálogo", key: "nav.home", path: "/lapaz/" },
    { label: "Acerca de", key: "nav.about", path: "/lapaz/about" },
    { label: "Docs", key: "nav.docs", path: "/lapaz/docs" }
  ]
};
