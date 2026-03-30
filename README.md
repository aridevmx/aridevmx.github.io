
# Ariel Fernando Loza Menodza  
**Frontend / Web Developer**  
Guadalajara, MX · [Email](mailto:aridevmx@gmail.com) · [WhatsApp](https://wa.me/523311153802)
 
[Portfolio](https://aridevmx.vercel.app) · [GitHub](https://github.com/aridevmx) · [LinkedIn](https://linkedin.com/in/aridevmx) 

## Perfil Profesional  
Frontend Developer orientado a producto, con experiencia en agencias digitales y desarrollo de soluciones web en producción. Especializado en la construcción de interfaces performantes y mantenibles, con trabajo real en WordPress, WooCommerce y Shopify. He liderado y colaborado en proyectos web end-to-end, integrando APIs, optimizando performance y brindando soporte técnico post-lanzamiento. Enfocado en generar impacto en negocio: conversión, estabilidad y escalabilidad.

## Experiencia Profesional  

### Timbal — Frontend Developer & Project Manager  
**Jun 2023 – Actualidad**  
- Lideré la entrega de proyectos web para clientes de agencia: landings, sitios corporativos y plataformas web.  
- Desarrollo y mantenimiento de sitios en WordPress, integraciones con APIs y mejoras de performance.  
- Coordinación con diseño, copywriting y cuentas para asegurar entregables alineados a objetivos de marketing.  
- Soporte técnico post-lanzamiento y mantenimiento de proyectos en producción.  
- Implementación de stacks modernos (Vue, Nuxt, Next) para soluciones web escalables.

### IT Nora — Frontend Developer  
**Jul 2022 – Jun 2023**  
- Desarrollo de aplicaciones web y mobile con enfoque en experiencia de usuario y rendimiento.  
- Integración de APIs REST y trabajo colaborativo con backend.  
- Participación en despliegues y soporte a entornos productivos.

### Applab — Frontend Developer  
**Jun 2021 – Jul 2022**  
- Desarrollo de sitios web y aplicaciones para clientes empresariales.  
- Integración con CMS (Strapi) y consumo de APIs externas.  
- Colaboración con equipos multidisciplinarios para entrega de soluciones personalizadas.

## Proyectos Relevantes  
- **E-commerce en WordPress/WooCommerce**: desarrollo y personalización de tienda online, optimización de performance y experiencia de usuario.  
- **Implementaciones en Shopify**: configuración de tiendas, personalización de temas e integraciones básicas.  
- **Herramientas internas**: aplicaciones web internas para automatizar flujos de trabajo y mejorar la operación diaria del equipo.

## Habilidades Técnicas  
- **Frontend:** HTML5, CSS3/SCSS, JavaScript, Vue.js, React, Nuxt.js, Next.js, Tailwind CSS  
- **CMS & E-commerce:** WordPress, WooCommerce, Shopify  
- **Backend & APIs:** PHP, Laravel, Node.js, Express, APIs REST  
- **Infra & DevOps:** cPanel, despliegues básicos, manejo de entornos productivos  
- **Herramientas:** Git, GitHub, Figma, Google Analytics  

## Educación  
**UNISITE Universidad** — Desarrollo Web & Diseño Gráfico  
2015 – 2019  
- Enfoque en UX/UI y diseño para productos digitales.

## Idiomas  
- Español: Nativo  
- Inglés: Técnico / lectura de documentación

## Información Adicional  
- Experiencia en colaboración con equipos de marketing digital y agencias.  
- Enfoque en buenas prácticas, performance web y mantenibilidad de código.  
- Interés continuo en automatización de procesos y mejora de flujos de trabajo.

## Esquema de Proyectos (projects.json)

Los proyectos del portfolio se gestionan en [projects.json](file:///c:/Users/Aridev/Documents/Development/aridevmx.github.io/src/data/projects.json) como una lista:

- `projects`: arreglo de proyectos (cada uno con `id` único tipo UUID).

Campos obligatorios por proyecto:
- `id` (string, uuid): identificador único del proyecto.
- `name` (string): nombre del proyecto o cliente.
- `client` (string|null): nombre del cliente si aplica.
- `category` (string): categoría o tipo de proyecto.
- `summary` (object): descripción breve, máximo 150 caracteres por idioma.
  - `summary.es` (string, <=150)
  - `summary.en` (string, <=150)
- `technologies` (string[]): lista de tecnologías/herramientas.
- `languages` (string[]): lenguajes de programación.
- `demoUrl` (string, url): enlace directo a producción o demo.
- `githubUrl` (string, url|null): enlace al repositorio (null si es privado/no aplica).
- `status` ("in_progress"|"delivered"): estado del proyecto.
- `publishedAt` (string ISO 8601): fecha de publicación (YYYY-MM-DD).
- `image` (string, url): imagen/cover del proyecto.
- `access` (object|null): credenciales cifradas cuando sea necesario.
  - Por seguridad, en el frontend debe ser `null`. Si no, el build falla.

Opcional:
- `details` (object): narrativa extendida por idioma (`problem`, `solution`, `result`).

## Alta de Proyectos en menos de 2 minutos

1) Ejecuta alta automática (escribe en `projects.json` + valida):

```bash
npm run project:add -- --id auto --name "Mi Proyecto" --category "Landing" --summaryEs "Texto corto..." --summaryEn "Short text..." --technologies "React,Tailwind" --languages "TypeScript,JavaScript" --demoUrl "https://demo.com" --githubUrl "https://github.com/user/repo" --status delivered --publishedAt 2026-03-28 --image "https://images.unsplash.com/photo-..."
```

2) Corre el watcher (rebuild automático al guardar el JSON):

```bash
npm run build:projects:watch
```

Validación:
- `npm run validate:projects` muestra errores detallados si falta un campo, hay tipos incorrectos o el JSON está mal formado.
