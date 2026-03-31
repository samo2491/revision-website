import { useMemo, useState } from 'react';
import topics from '../data/topics';
import KeyTerm from '../components/KeyTerm';

const keyTermMap = {
  'opportunity cost': 'The value of the next best option that is given up.',
  'adding value': 'Increasing perceived worth so customers pay more than input costs.',
  'stakeholders': 'Groups affected by business decisions.',
  'segmentation': 'Dividing a market into meaningful customer groups.',
  'usp': 'Unique selling point that differentiates a product.',
  'delegation': 'Passing authority to employees lower in the hierarchy.',
  'kaizen': 'Continuous improvement through many small changes.',
  'break-even': 'Output where total revenue equals total cost.',
  'csr': 'Corporate social responsibility for social and environmental impact.'
};

export default function Revise() {
  const [selected, setSelected] = useState(1);
  const topic = useMemo(() => topics.find((t) => t.id === selected), [selected]);

  const markComplete = () => {
    const topicProgress = JSON.parse(localStorage.getItem('topicProgress') || '{}');
    topicProgress[selected] = 100;
    localStorage.setItem('topicProgress', JSON.stringify(topicProgress));
    alert('Topic marked as complete ✅');
  };

  const renderWithTerms = (text) => {
    const key = Object.keys(keyTermMap).find((k) => text.toLowerCase().includes(k));
    if (!key) return text;
    const parts = text.split(new RegExp(`(${key})`, 'i'));
    return parts.map((p, i) => (p.toLowerCase() === key ? <KeyTerm key={i} term={p} definition={keyTermMap[key]} /> : p));
  };

  return (
    <section>
      <h2>Revision Notes</h2>
      <div className="topic-tabs">
        {topics.map((t) => (
          <button key={t.id} className={selected === t.id ? 'active' : ''} onClick={() => setSelected(t.id)}>
            Topic {t.id}
          </button>
        ))}
      </div>
      <article className="card">
        <h3>{topic.title}</h3>
        {topic.subtopics.map((s) => (
          <div key={s.title} className="subtopic">
            <h4>{s.title}</h4>
            <ul>
              {s.notes.map((n, idx) => (
                <li key={idx}>{renderWithTerms(n)}</li>
              ))}
            </ul>
          </div>
        ))}
      </article>
      <article className="card">
        <h3>How to Answer (Exam Technique)</h3>
        <p>{topic.examTechnique.structure}</p>
        <h4>Command words</h4>
        <ul>
          {Object.entries(topic.examTechnique.commandWords).map(([k, v]) => (
            <li key={k}><strong>{k}:</strong> {v}</li>
          ))}
        </ul>
        <h4>Mark allocation guidance</h4>
        <ul>{topic.examTechnique.marks.map((m) => <li key={m}>{m}</li>)}</ul>
        <p><strong>Model response style:</strong> {topic.examTechnique.example}</p>
        {topic.examTechnique.commonPitfalls && (
          <>
            <h4>Common pitfalls to avoid</h4>
            <ul>{topic.examTechnique.commonPitfalls.map((pit) => <li key={pit}>{pit}</li>)}</ul>
          </>
        )}
      </article>
      <button className="primary" onClick={markComplete}>Mark topic complete</button>
    </section>
  );
}
