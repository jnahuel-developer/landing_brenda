# Landing de Consultorio de Estetica

Landing `single-page` construida con `Vite + React + TypeScript`, pensada para publicarse en `GitHub Pages`.

## Scripts

- `npm run dev`: entorno local
- `npm run build`: compilacion de produccion
- `npm run preview`: vista previa del build

## Despliegue en GitHub Pages

El repositorio ya incluye el workflow [`deploy.yml`](/f:/Freelance/03.%20Landing%20consultorio/.github/workflows/deploy.yml). Cuando subas el proyecto a GitHub:

1. Empuja la rama `main`.
2. En GitHub, habilita `Settings > Pages > Build and deployment > GitHub Actions`.
3. Cada push a `main` generara una nueva publicacion.

La configuracion usa `base: './'`, asi que tambien queda preparada para un dominio custom sin rehacer el proyecto.

## Contenido editable

Todo el contenido principal vive en [`src/content`](/f:/Freelance/03.%20Landing%20consultorio/src/content):

- [`site.json`](/f:/Freelance/03.%20Landing%20consultorio/src/content/site.json): marca, hero, contacto, SEO y textos institucionales
- [`treatments.json`](/f:/Freelance/03.%20Landing%20consultorio/src/content/treatments.json): tratamientos destacados
- [`products.json`](/f:/Freelance/03.%20Landing%20consultorio/src/content/products.json): catalogo de productos
- [`cases.json`](/f:/Freelance/03.%20Landing%20consultorio/src/content/cases.json): antes/despues y testimonios por caso
- [`testimonials.json`](/f:/Freelance/03.%20Landing%20consultorio/src/content/testimonials.json): testimonios adicionales
- [`faq.json`](/f:/Freelance/03.%20Landing%20consultorio/src/content/faq.json): preguntas del asistente guiado

## Material visual

Los placeholders actuales estan en [`public/assets/placeholders`](/f:/Freelance/03.%20Landing%20consultorio/public/assets/placeholders). Cuando tengas el material real, reemplazalo por assets propios y actualiza las rutas dentro de los JSON.

Formato recomendado para el catalogo:

- Carpeta de imagenes, por ejemplo `public/assets/products/`
- Archivo unico `catalogo.csv` o `products.json`
- Campos sugeridos: `id`, `name`, `category`, `descriptionShort`, `descriptionLong`, `image`, `ctaWhatsapp`

Formato recomendado para resultados:

- Carpeta de casos, por ejemplo `public/assets/cases/`
- Un `before` y un `after` por caso
- En `cases.json`, completar `treatment`, `resultText`, `testimonialName`, `testimonialRole`, `testimonialText` y `consentConfirmed`

## Configuracion obligatoria antes de publicar

En [`site.json`](/f:/Freelance/03.%20Landing%20consultorio/src/content/site.json) reemplaza estos placeholders:

- `contact.whatsappNumber`
- `contact.instagramUrl`
- `contact.email`
- `contact.formAction`
- `brand.name`, `brand.registration`, `brand.city`

El formulario esta listo para usar con un servicio externo tipo Formspree. Hasta que no reemplaces `formAction`, mostrara un aviso y no enviara mensajes reales.

## Alcance del asistente guiado

El bloque de FAQ funciona como un chat acotado. No usa IA ni API keys: solo muestra respuestas curadas de [`faq.json`](/f:/Freelance/03.%20Landing%20consultorio/src/content/faq.json), con derivacion a WhatsApp cuando la consulta supera el alcance informativo.
