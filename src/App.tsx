import { useEffect, useState } from 'react';
import BeforeAfterCard from './components/BeforeAfterCard';
import ContactForm from './components/ContactForm';
import GuidedChat from './components/GuidedChat';
import RevealSection from './components/RevealSection';
import SectionTitle from './components/SectionTitle';
import SocialIcon from './components/SocialIcon';
import casesData from './content/cases.json';
import faqData from './content/faq.json';
import productsData from './content/products.json';
import siteData from './content/site.json';
import spacesData from './content/spaces.json';
import testimonialsData from './content/testimonials.json';
import treatmentsData from './content/treatments.json';
import { resolveAssetPath } from './lib/assetPath';
import type {
  CaseStudy,
  FaqItem,
  Product,
  SiteContent,
  SpaceHighlight,
  Testimonial,
  Treatment,
} from './types/content';

const site = siteData as SiteContent;
const treatments = treatmentsData as Treatment[];
const products = productsData as Product[];
const caseStudies = casesData as CaseStudy[];
const faqItems = faqData as FaqItem[];
const spaces = spacesData as SpaceHighlight[];
const testimonials = testimonialsData as Testimonial[];
const productsPerPage = 8;

function chunkItems<T>(items: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

const productPages = chunkItems(products, productsPerPage);

function buildWhatsappLink(number: string, message: string) {
  const cleanNumber = number.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

function App() {
  const [activeProductPage, setActiveProductPage] = useState(0);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const selectedTreatment = treatments.find((item) => item.id === selectedTreatmentId) ?? null;
  const selectedProduct = products.find((item) => item.id === selectedProductId) ?? null;
  const visibleProducts = productPages[activeProductPage] ?? productPages[0] ?? [];
  const whatsappUrl = buildWhatsappLink(
    site.contact.whatsappNumber,
    site.contact.whatsappMessage,
  );

  useEffect(() => {
    document.title = site.seo.title;
    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute('content', site.seo.description);
    }
  }, []);

  useEffect(() => {
    if (!selectedProduct && !selectedTreatment) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProductId(null);
        setSelectedTreatmentId(null);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedProduct, selectedTreatment]);

  useEffect(() => {
    if (productPages.length <= 1 || selectedProduct) {
      return undefined;
    }

    const rotation = window.setInterval(() => {
      setActiveProductPage((currentPage) => (currentPage + 1) % productPages.length);
    }, 5000);

    return () => window.clearInterval(rotation);
  }, [selectedProduct]);

  return (
    <>
      <div className="page-shell">
        <header className="topbar">
          <div className="brand-lockup">
            <img
              className="brand-logo"
              src={resolveAssetPath(site.brand.logoImage)}
              alt={`Logo de ${site.brand.name}`}
            />
            <div>
              <p>{site.brand.name}</p>
              <span>
                {site.brand.specialty} | {site.brand.registration}
              </span>
            </div>
          </div>

          <nav className="nav-links" aria-label="Navegacion principal">
            <a href="#consultorio">Consultorio</a>
            <a href="#tratamientos">Tratamientos</a>
            <a href="#productos">Productos</a>
            <a href="#resultados">Resultados</a>
            <a href="#contacto">Contacto</a>
          </nav>

          <a className="button button-secondary topbar-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </header>

        <main>
          <RevealSection className="hero" id="inicio">
            <div className="hero-copy">
              <span className="section-eyebrow">{site.hero.eyebrow}</span>
              <h1>{site.hero.title}</h1>
              <p>{site.hero.description}</p>

              <div className="hero-actions">
                <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                  {site.hero.primaryCtaLabel}
                </a>
                <a className="button button-secondary" href="#tratamientos">
                  {site.hero.secondaryCtaLabel}
                </a>
              </div>

              <div className="hero-stats" aria-label="Datos destacados">
                {site.stats.map((item) => (
                  <div key={item.label} className="stat-card">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-orb hero-orb-large" />
              <div className="hero-orb hero-orb-small" />
              <div className="hero-panel">
                <span className="chip">Espacio boutique</span>
                <h2>{site.brand.tagline}</h2>
                <p>
                  {site.brand.city} | Atencion personalizada con enfoque natural, tiempos claros y
                  acompanamiento cercano.
                </p>
                <div className="hero-signature">
                  <span>{site.brand.name}</span>
                  <small>{site.brand.specialty}</small>
                </div>
              </div>
            </div>
          </RevealSection>

          <RevealSection className="section-grid section-about">
            <div className="about-panel">
              <div className="about-intro">
                <figure className="portrait-card">
                  <img
                    src={resolveAssetPath(site.brand.profileImage)}
                    alt={site.brand.profileAlt}
                  />
                  <figcaption>
                    <strong>{site.brand.name}</strong>
                    <span>{site.brand.specialty}</span>
                  </figcaption>
                </figure>

                <div className="about-copy">
                  <SectionTitle
                    eyebrow="Enfoque profesional"
                    title={site.about.title}
                    description={site.about.description}
                  />
                  <div className="about-meta">
                    <span className="chip muted">{site.brand.registration}</span>
                    <span className="chip muted">{site.contact.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pillar-grid">
              {site.about.pillars.map((pillar) => (
                <article key={pillar.title} className="glass-card">
                  <span className="chip muted">Metodo</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </article>
              ))}
            </div>
          </RevealSection>

          <RevealSection className="section-grid" id="consultorio">
            <SectionTitle
              eyebrow={site.spaces.eyebrow}
              title={site.spaces.title}
              description={site.spaces.description}
            />

            <div className="space-grid">
              {spaces.map((space) => (
                <article key={space.id} className="space-card">
                  {space.media ? (
                    space.media.toLowerCase().endsWith('.mp4') ? (
                      <video
                        className="space-video"
                        src={resolveAssetPath(space.media)}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={space.title}
                      />
                    ) : (
                      <img
                        className="space-image"
                        src={resolveAssetPath(space.media)}
                        alt={space.title}
                      />
                    )
                  ) : (
                    <div className="space-visual" aria-hidden="true">
                      <span>{space.eyebrow}</span>
                    </div>
                  )}
                  <div className="space-copy">
                    <span className="chip muted">{space.eyebrow}</span>
                    <h3>{space.title}</h3>
                    <p>{space.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </RevealSection>

          <RevealSection className="section-grid" id="tratamientos">
            <SectionTitle
              eyebrow="Tratamientos"
              title="Protocolos disenados para resultados elegantes, realistas y sostenibles."
              description="La landing deja visibles lineamientos generales. La indicacion final siempre se confirma en consulta, segun objetivos, tiempos y antecedentes."
            />

            <div className="treatment-grid">
              {treatments.map((treatment) => (
                <article key={treatment.id} className="treatment-card">
                  <span className="chip muted">Tratamiento disponible</span>
                  <h3>{treatment.title}</h3>
                  <p>{treatment.summary}</p>
                  <div className="treatment-actions">
                    <button
                      type="button"
                      className="button button-secondary"
                      onClick={() => setSelectedTreatmentId(treatment.id)}
                    >
                      Ver detalle
                    </button>
                    <a
                      className="button button-primary"
                      href={buildWhatsappLink(site.contact.whatsappNumber, treatment.ctaWhatsapp)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Consultar
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </RevealSection>

          <RevealSection className="section-grid" id="productos">
            <SectionTitle
              eyebrow="Catalogo"
              title="Productos seleccionados para acompanar la experiencia del consultorio."
              description="Esta estructura queda lista para reciclar el catalogo de WhatsApp Business usando imagenes y contenido propio del consultorio."
            />

            <div className="product-carousel">
              <div className="product-grid">
                {visibleProducts.map((product) => (
                  <article key={product.id} className="product-card">
                    <button
                      type="button"
                      className="product-image-button"
                      onClick={() => setSelectedProductId(product.id)}
                      aria-label={`Ver detalle de ${product.name}`}
                    >
                      <img src={resolveAssetPath(product.image)} alt={product.name} />
                    </button>
                    <div className="product-copy">
                      <span className="chip muted">{product.category}</span>
                      <h3>{product.name}</h3>
                      <p>{product.descriptionShort}</p>
                    </div>
                    <div className="product-actions">
                      <button
                        type="button"
                        className="button button-secondary"
                        onClick={() => setSelectedProductId(product.id)}
                      >
                        Ver detalle
                      </button>
                      <a
                        className="button button-primary"
                        href={buildWhatsappLink(site.contact.whatsappNumber, product.ctaWhatsapp)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              {productPages.length > 1 ? (
                <div className="product-pagination" aria-label="Paginas del catalogo">
                  {productPages.map((_, index) => (
                    <button
                      key={`catalog-page-${index + 1}`}
                      type="button"
                      className={index === activeProductPage ? 'product-dot is-active' : 'product-dot'}
                      onClick={() => setActiveProductPage(index)}
                      aria-label={`Ver pagina ${index + 1} del catalogo`}
                      aria-pressed={index === activeProductPage}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </RevealSection>

          <RevealSection className="section-grid" id="resultados">
            <SectionTitle
              eyebrow="Resultados y testimonios"
              title="Historias visuales y experiencias compartidas con naturalidad."
              description="Una primera seleccion de casos reales para recorrer con comparador interactivo antes y despues, siempre con foco en cambios sutiles y acompanamiento profesional."
            />

            <div className="results-grid">
              {caseStudies.map((item) => (
                <BeforeAfterCard key={item.id} item={item} />
              ))}
            </div>

            <div className="testimonial-strip">
              {testimonials.map((testimonial) => (
                <article key={testimonial.id} className="testimonial-card">
                  <span className="chip muted">{testimonial.treatment}</span>
                  <p>{testimonial.quote}</p>
                  <strong>{testimonial.name}</strong>
                </article>
              ))}
            </div>
          </RevealSection>

          <RevealSection className="section-grid section-chat">
            <SectionTitle
              eyebrow="FAQ guiado"
              title="Un asistente simple para orientar, no para diagnosticar."
              description="Sirve para ampliar informacion general sobre tratamientos, tiempos, cuidados y productos, siempre con derivacion final al equipo profesional."
            />

            <GuidedChat items={faqItems} whatsappUrl={whatsappUrl} />
          </RevealSection>

          <RevealSection className="section-grid contact-section" id="contacto">
            <div className="contact-copy">
              <SectionTitle
                eyebrow="Contacto"
                title="Elegi el canal que te resulte mas comodo para avanzar."
                description="La web deja acceso directo a los medios de contacto y un formulario sencillo para consultas por mail."
              />

              <div className="contact-cards">
                <a className="contact-card contact-card-social" href={whatsappUrl} target="_blank" rel="noreferrer">
                  <span className="contact-card-icon">
                    <SocialIcon kind="whatsapp" />
                  </span>
                  <div>
                    <span className="chip">WhatsApp</span>
                    <strong>Consulta directa</strong>
                    <p>Abre chat en WhatsApp Web o app con mensaje precargado.</p>
                  </div>
                </a>
                <a
                  className="contact-card contact-card-social"
                  href={site.contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="contact-card-icon">
                    <SocialIcon kind="instagram" />
                  </span>
                  <div>
                    <span className="chip">Instagram</span>
                    <strong>Perfil del consultorio</strong>
                    <p>Ideal para explorar novedades, resultados y tono visual de la marca.</p>
                  </div>
                </a>
              </div>

              <div className="contact-meta">
                <div>
                  <span>Ubicacion</span>
                  <strong>{site.contact.address}</strong>
                </div>
                <div>
                  <span>Horarios</span>
                  <strong>{site.contact.hours}</strong>
                </div>
              </div>
            </div>

            <div className="contact-panel">
              <span className="chip">Formulario basico</span>
              <h3>Dejanos tu mensaje</h3>
              <p>
                El envio se resuelve con un servicio externo para mantener la web estatica y
                compatible con GitHub Pages.
              </p>
              <ContactForm contact={site.contact} />
            </div>
          </RevealSection>
        </main>

        <footer className="site-footer">
          <p>
            {site.brand.name} | {site.brand.specialty} | {site.brand.registration}
          </p>
          <div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href={site.contact.instagramUrl} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </footer>
      </div>

      <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
        Contactar por WhatsApp
      </a>

      {selectedTreatment ? (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelectedTreatmentId(null)}
        >
          <aside
            className="product-modal treatment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="treatment-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedTreatmentId(null)}
              aria-label="Cerrar detalle del tratamiento"
            >
              Cerrar
            </button>
            <span className="chip muted">Tratamiento disponible</span>
            <h3 id="treatment-modal-title">{selectedTreatment.title}</h3>
            <p className="treatment-modal-summary">{selectedTreatment.summary}</p>
            <p className="treatment-modal-copy">{selectedTreatment.details}</p>
            <div className="modal-actions">
              <a
                className="button button-primary"
                href={buildWhatsappLink(site.contact.whatsappNumber, selectedTreatment.ctaWhatsapp)}
                target="_blank"
                rel="noreferrer"
              >
                Consultar este tratamiento
              </a>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setSelectedTreatmentId(null)}
              >
                Seguir recorriendo
              </button>
            </div>
          </aside>
        </div>
      ) : null}

      {selectedProduct ? (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelectedProductId(null)}
        >
          <aside
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedProductId(null)}
              aria-label="Cerrar detalle del producto"
            >
              Cerrar
            </button>
            <img
              src={resolveAssetPath(selectedProduct.image)}
              alt={selectedProduct.name}
            />
            <span className="chip muted">{selectedProduct.category}</span>
            <h3 id="product-modal-title">{selectedProduct.name}</h3>
            <p>{selectedProduct.descriptionLong}</p>
            <div className="modal-actions">
              <a
                className="button button-primary"
                href={buildWhatsappLink(site.contact.whatsappNumber, selectedProduct.ctaWhatsapp)}
                target="_blank"
                rel="noreferrer"
              >
                Consultar este producto
              </a>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setSelectedProductId(null)}
              >
                Seguir navegando
              </button>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}

export default App;
