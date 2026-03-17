import { useDeferredValue, useEffect, useState } from 'react';
import BeforeAfterCard from './components/BeforeAfterCard';
import ContactForm from './components/ContactForm';
import GuidedChat from './components/GuidedChat';
import SectionTitle from './components/SectionTitle';
import casesData from './content/cases.json';
import faqData from './content/faq.json';
import productsData from './content/products.json';
import siteData from './content/site.json';
import testimonialsData from './content/testimonials.json';
import treatmentsData from './content/treatments.json';
import type {
  CaseStudy,
  FaqItem,
  Product,
  SiteContent,
  Testimonial,
  Treatment,
} from './types/content';

const site = siteData as SiteContent;
const treatments = treatmentsData as Treatment[];
const products = productsData as Product[];
const caseStudies = casesData as CaseStudy[];
const faqItems = faqData as FaqItem[];
const testimonials = testimonialsData as Testimonial[];

function buildWhatsappLink(number: string, message: string) {
  const cleanNumber = number.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [productSearch, setProductSearch] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const deferredSearch = useDeferredValue(productSearch);

  const categories = ['Todas', ...new Set(products.map((item) => item.category))];
  const selectedProduct = products.find((item) => item.id === selectedProductId) ?? null;
  const whatsappUrl = buildWhatsappLink(
    site.contact.whatsappNumber,
    site.contact.whatsappMessage,
  );

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'Todas' || product.category === selectedCategory;
    const query = deferredSearch.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      product.name.toLowerCase().includes(query) ||
      product.descriptionShort.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    document.title = site.seo.title;
    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute('content', site.seo.description);
    }
  }, []);

  useEffect(() => {
    if (!selectedProduct) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProductId(null);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedProduct]);

  return (
    <>
      <div className="page-shell">
        <header className="topbar">
          <div className="brand-lockup">
            <span className="brand-mark">EV</span>
            <div>
              <p>{site.brand.name}</p>
              <span>
                {site.brand.specialty} | {site.brand.registration}
              </span>
            </div>
          </div>

          <nav className="nav-links" aria-label="Navegacion principal">
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
          <section className="hero" id="inicio">
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
          </section>

          <section className="section-grid section-about">
            <div className="about-panel">
              <SectionTitle
                eyebrow="Enfoque profesional"
                title={site.about.title}
                description={site.about.description}
              />
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
          </section>

          <section className="section-grid" id="tratamientos">
            <SectionTitle
              eyebrow="Tratamientos"
              title="Protocolos disenados para resultados elegantes, realistas y sostenibles."
              description="La landing deja visibles lineamientos generales. La indicacion final siempre se confirma en consulta, segun objetivos, tiempos y antecedentes."
            />

            <div className="treatment-grid">
              {treatments.map((treatment) => (
                <article key={treatment.id} className="treatment-card">
                  <span className="chip">{treatment.badge}</span>
                  <h3>{treatment.title}</h3>
                  <p>{treatment.summary}</p>
                  <dl>
                    <div>
                      <dt>Duracion</dt>
                      <dd>{treatment.duration}</dd>
                    </div>
                    <div>
                      <dt>Frecuencia</dt>
                      <dd>{treatment.frequency}</dd>
                    </div>
                    <div>
                      <dt>Recuperacion</dt>
                      <dd>{treatment.recovery}</dd>
                    </div>
                  </dl>
                  <a className="inline-link" href={whatsappUrl} target="_blank" rel="noreferrer">
                    Consultar este tratamiento
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="section-grid" id="productos">
            <SectionTitle
              eyebrow="Catalogo"
              title="Productos seleccionados para acompanar la experiencia del consultorio."
              description="Esta estructura queda lista para reciclar el catalogo de WhatsApp Business usando imagenes y contenido propio del consultorio."
            />

            <div className="catalog-toolbar">
              <div className="pill-group" aria-label="Filtros de categorias">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={category === selectedCategory ? 'pill is-active' : 'pill'}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <label className="search-input">
                <span>Buscar</span>
                <input
                  type="search"
                  value={productSearch}
                  onChange={(event) => setProductSearch(event.target.value)}
                  placeholder="Rutina diaria, protector, hidratacion..."
                />
              </label>
            </div>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article key={product.id} className="product-card">
                  <button
                    type="button"
                    className="product-image-button"
                    onClick={() => setSelectedProductId(product.id)}
                    aria-label={`Ver detalle de ${product.name}`}
                  >
                    <img src={product.image} alt={product.name} />
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
          </section>

          <section className="section-grid" id="resultados">
            <SectionTitle
              eyebrow="Resultados y testimonios"
              title="Historias visuales y experiencias compartidas con consentimiento."
              description="La estructura queda lista para recibir tus fotos reales de antes y despues y testimonios validados. En esta version se muestran placeholders de demostracion."
            />

            <div className="results-grid">
              {caseStudies
                .filter((item) => item.consentConfirmed)
                .map((item) => (
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
          </section>

          <section className="section-grid section-chat">
            <SectionTitle
              eyebrow="FAQ guiado"
              title="Un asistente simple para orientar, no para diagnosticar."
              description="Sirve para ampliar informacion general sobre tratamientos, tiempos, cuidados y productos, siempre con derivacion final al equipo profesional."
            />

            <GuidedChat items={faqItems} whatsappUrl={whatsappUrl} />
          </section>

          <section className="section-grid contact-section" id="contacto">
            <div className="contact-copy">
              <SectionTitle
                eyebrow="Contacto"
                title="Elegi el canal que te resulte mas comodo para avanzar."
                description="La web deja acceso directo a los medios de contacto y un formulario sencillo para consultas por mail."
              />

              <div className="contact-cards">
                <a className="contact-card" href={whatsappUrl} target="_blank" rel="noreferrer">
                  <span className="chip">WhatsApp</span>
                  <strong>Consulta directa</strong>
                  <p>Abre chat en WhatsApp Web o app con mensaje precargado.</p>
                </a>
                <a
                  className="contact-card"
                  href={site.contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="chip">Instagram</span>
                  <strong>Perfil del consultorio</strong>
                  <p>Ideal para explorar novedades, resultados y tono visual de la marca.</p>
                </a>
                <a className="contact-card" href={`mailto:${site.contact.email}`}>
                  <span className="chip">Email</span>
                  <strong>{site.contact.email}</strong>
                  <p>Tambien podes escribir por correo si preferis una consulta mas detallada.</p>
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
          </section>
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
            <a href={`mailto:${site.contact.email}`}>Email</a>
          </div>
        </footer>
      </div>

      <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
        Contactar por WhatsApp
      </a>

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
            <img src={selectedProduct.image} alt={selectedProduct.name} />
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
