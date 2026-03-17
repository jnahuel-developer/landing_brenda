import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { SiteContent } from '../types/content';

type ContactFormProps = {
  contact: SiteContent['contact'];
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

function ContactForm({ contact }: ContactFormProps) {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: '',
  });

  const isConfigured = !contact.formAction.includes('your-form-id');

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isConfigured) {
      setStatus({
        type: 'error',
        message: 'Configura la URL de Formspree en site.json para habilitar envios reales.',
      });
      return;
    }

    setStatus({ type: 'loading', message: 'Enviando mensaje...' });

    const payload = new FormData();
    payload.append('nombre', formData.name);
    payload.append('email', formData.email);
    payload.append('telefono', formData.phone);
    payload.append('mensaje', formData.message);
    payload.append('_subject', 'Nueva consulta desde la landing');

    try {
      const response = await fetch(contact.formAction, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error('No fue posible enviar el formulario');
      }

      setStatus({
        type: 'success',
        message: contact.formSuccessMessage,
      });
      setFormData(initialState);
    } catch {
      setStatus({
        type: 'error',
        message: 'Hubo un problema al enviar el formulario. Proba tambien por WhatsApp.',
      });
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-grid">
        <label>
          Nombre
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="nombre@correo.com"
            required
          />
        </label>
        <label>
          Telefono
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+54 9 11 ..."
          />
        </label>
        <label className="contact-grid-message">
          Mensaje
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Contanos brevemente que tratamiento o informacion te interesa."
            rows={5}
            required
          />
        </label>
      </div>

      <div className="form-footer">
        <button type="submit" className="button button-primary" disabled={status.type === 'loading'}>
          {status.type === 'loading' ? 'Enviando...' : 'Enviar consulta por mail'}
        </button>
        <p className="form-note">{contact.notice}</p>
        {status.type !== 'idle' ? (
          <p
            className={status.type === 'success' ? 'form-status is-success' : 'form-status is-error'}
            role="status"
          >
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

export default ContactForm;
