import { useMemo, useState } from 'react';
import glossary from '../data/glossary';

export default function GlossaryPage() {
  const [q, setQ] = useState('');
  const [topic, setTopic] = useState('all');

  const list = useMemo(() => glossary
    .filter((g) => (topic === 'all' || g.topic === Number(topic)) && (`${g.term} ${g.definition}`.toLowerCase().includes(q.toLowerCase())))
    .sort((a, b) => a.term.localeCompare(b.term)), [q, topic]);

  return (
    <section>
      <h2>A–Z Glossary</h2>
      <div className="card filters">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search term or definition..." />
        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="all">All Topics</option>
          {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>Topic {n}</option>)}
        </select>
      </div>
      <div className="grid">
        {list.map((g) => (
          <article className="card" key={`${g.topic}-${g.term}`}>
            <h4>{g.term}</h4>
            <p>{g.definition}</p>
            <p className="muted">Example: {g.example}</p>
            <span className="badge">Topic {g.topic}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
