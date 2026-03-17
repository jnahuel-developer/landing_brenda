import { startTransition, useState } from 'react';
import type { FaqItem } from '../types/content';

type GuidedChatProps = {
  items: FaqItem[];
  whatsappUrl: string;
};

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  tone?: 'warning';
};

const INTRO_MESSAGE =
  'Puedo orientarte sobre tratamientos, tiempos generales, cuidados y productos. No realizo diagnosticos ni reemplazo la consulta profesional.';

function GuidedChat({ items, whatsappUrl }: GuidedChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'intro', role: 'assistant', text: INTRO_MESSAGE, tone: 'warning' },
  ]);
  const [activeCategory, setActiveCategory] = useState('Todas');

  const categories = ['Todas', ...new Set(items.map((item) => item.category))];
  const visibleQuestions =
    activeCategory === 'Todas'
      ? items
      : items.filter((item) => item.category === activeCategory);

  const handleQuestionClick = (item: FaqItem) => {
    startTransition(() => {
      setMessages((current) => [
        ...current,
        {
          id: `${item.id}-question-${current.length}`,
          role: 'user',
          text: item.question,
        },
        {
          id: `${item.id}-answer-${current.length}`,
          role: 'assistant',
          text: item.answer,
          tone: item.redirectToWhatsapp ? 'warning' : undefined,
        },
      ]);
    });
  };

  return (
    <div className="chat-layout">
      <div className="chat-panel">
        <div className="chat-header">
          <span className="section-eyebrow">Asistente guiado</span>
          <h3>Informacion general con limites claros</h3>
          <p>
            Este modulo solo amplifica informacion orientativa. Si tu consulta requiere una
            evaluacion real, se deriva al canal profesional.
          </p>
        </div>

        <div className="chat-categories" role="tablist" aria-label="Categorias de preguntas">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={category === activeCategory ? 'pill is-active' : 'pill'}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="chat-questions">
          {visibleQuestions.map((item) => (
            <button
              key={item.id}
              type="button"
              className="question-card"
              onClick={() => handleQuestionClick(item)}
            >
              <span>{item.category}</span>
              <strong>{item.question}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="chat-shell" aria-live="polite">
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === 'assistant'
                  ? `chat-message assistant${message.tone === 'warning' ? ' is-warning' : ''}`
                  : 'chat-message user'
              }
            >
              <span className="chat-role">
                {message.role === 'assistant' ? 'Asistente' : 'Visitante'}
              </span>
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        <div className="chat-actions">
          <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            Seguir por WhatsApp
          </a>
          <button
            type="button"
            className="button button-secondary"
            onClick={() =>
              setMessages([
                { id: 'intro-reset', role: 'assistant', text: INTRO_MESSAGE, tone: 'warning' },
              ])
            }
          >
            Reiniciar guia
          </button>
        </div>
      </div>
    </div>
  );
}

export default GuidedChat;
