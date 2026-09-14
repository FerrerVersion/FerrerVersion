# FerrerVersion

Portfolio profesional y web comercial de Jorge Ferrer. Sitio 100% estático, construido con [Eleventy](https://www.11ty.dev/), pensado para alojarse gratis en GitHub Pages.

## Por qué este stack

- **Eleventy + HTML/CSS/JS vanilla, sin framework de UI en cliente.** El sitio es sobre todo contenido (portfolio + páginas comerciales), no una aplicación con estado complejo, así que un framework tipo React no aporta nada y sí añade peso y complejidad.
- Eleventy resuelve el problema real que sí existe: plantillas reutilizables (navbar, footer, tarjeta de proyecto) y contenido en español/inglés sin duplicar HTML a mano, generando en el build páginas 100% estáticas.
- El resultado es HTML/CSS/JS puro: carga rápida, SEO correcto (cada página es real, no una SPA) y despliegue trivial en GitHub Pages.

## Estructura del proyecto

```
src/
├── _data/              → datos globales: site.json, i18n.json, home.json, projects.js...
├── _includes/
│   ├── layouts/         → layout base (head, navbar, footer)
│   └── partials/        → navbar, footer, iconos, tarjeta de proyecto, secciones
├── content/projects/     → un archivo .json por proyecto del portfolio
├── assets/               → css, js, fuentes autoalojadas, imágenes/logo
├── index.njk             → home en español (raíz "/")
├── en/index.njk           → home en inglés ("/en/")
└── proyectos/, en/proyectos/ → páginas de caso de estudio (generadas por paginación)
```

## Desarrollo local

Requiere Node.js 18 o superior.

```bash
npm install
npm start
```

Esto levanta un servidor local (con recarga automática) en `http://localhost:8080`.

Para generar el build de producción en `_site/`:

```bash
npm run build
```

## Cómo añadir un proyecto nuevo al portfolio

1. Copia un archivo de `src/content/projects/` (por ejemplo `app-practicas.json`) y renómbralo.
2. Rellena los campos `es` y `en` (nombre, resumen, problema, miPapel, solucion), `platform`, `year`, `tech` y `links`.
3. Mientras no tengas datos reales, dejo el campo `isPlaceholder: true` — el proyecto aparece en la cuadrícula como "Próximamente" pero **no** genera una página de caso de estudio hasta que tenga contenido real.
4. En cuanto pongas `isPlaceholder: false` (y rellenes los datos), Eleventy genera automáticamente sus páginas `/proyectos/<slug>/` y `/en/proyectos/<slug>/` en el siguiente build.
5. El orden en el portfolio lo controla el campo `order`.

## Placeholders pendientes de sustituir

Email, WhatsApp, LinkedIn, CV y los datos de los dos proyectos del portfolio (MOBII y la app para Lourdes Iniesta — esta última ya refleja que construiste versión Android nativa, iOS nativa y panel web, según encontré en `Practicas/App/Prueba/`) ya están rellenos con información real (la encontré en tus carpetas `TFG/`, `MiWeb/WebJorge/files/` y `Practicas/App/` — verifica que el número de WhatsApp sea correcto, lo deduje de tu teléfono de contacto). Solo queda pendiente:

- **`src/_data/site.json`** → `contact.github` y `contact.githubHref`: tu usuario de GitHub (no lo encontré en ningún sitio). También `url` — la URL final de GitHub Pages del sitio, en cuanto la tengas (se usa para SEO, sitemap y Open Graph).
- Añadir capturas de pantalla al proyecto de Lourdes Iniesta: colócalas en `src/assets/img/proyectos/` y referencia sus rutas en el array `images` de `src/content/projects/app-practicas.json` (mismo formato que usa `mobii.json`: `{ "src": "...", "caption": { "es": "...", "en": "..." } }`).
- Nuevos proyectos futuros (versiones iOS/Android, etc.): duplica `src/content/projects/app-practicas.json` como plantilla — ver sección siguiente.

## Idiomas (ES / EN)

- Español vive en la raíz (`/`), inglés en `/en/`.
- Los textos cortos de interfaz (menú, botones, footer) están en `src/_data/i18n.json`.
- Los textos largos de cada sección de la home están en `src/_data/home.json`, con una copia natural en `es` y otra en `en` (no son traducciones automáticas).
- Cada página lleva `esUrl` y `enUrl` en su front matter para generar el selector de idioma y las etiquetas `hreflang` correctas.

## Despliegue en GitHub Pages

1. Sube este proyecto a un repositorio en tu cuenta de GitHub.
2. En el repositorio: **Settings → Pages → Build and deployment → Source**, selecciona **GitHub Actions**.
3. Haz push a la rama `main`. El workflow en `.github/workflows/deploy.yml` compila el sitio y lo publica automáticamente.
4. Actualiza `site.json` → `url` con la URL definitiva que te da GitHub Pages (por ejemplo `https://tuusuario.github.io` o `https://tuusuario.github.io/ferrerversion`) y vuelve a hacer push — esa URL se usa en el `sitemap.xml`, `robots.txt`, las etiquetas `canonical`/`hreflang` y Open Graph.

## Favicons y logo

Los favicons (`favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`) y las versiones optimizadas del logo (`fv-mark-96.png`, `fv-mark-256.jpg`, `fv-mark-512.jpg`, `og-default.jpg`) ya están generados en `src/assets/img/` a partir de `FotoPerfil/FV.png`. Si cambias el logo, vuelve a generarlas manteniendo esos mismos nombres de archivo (o actualiza las referencias en `src/_includes/partials/seo.njk` y `navbar.njk`/`footer.njk`).
