import { useMemo, useState } from 'react';
import questions from '../data/questions';

export default function Practice() {
  const [topicFilter, setTopicFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [showScheme, setShowScheme] = useState(false);
  const [weak, setWeak] = useState(JSON.parse(localStorage.getItem('weakTopics') || '[]'));

  const filtered = useMemo(() => questions.filter((q) => (topicFilter === 'all' || q.topic === Number(topicFilter)) && (typeFilter === 'all' || q.type === typeFilter)), [topicFilter, typeFilter]);
  const q = filtered[index % (filtered.length || 1)];

  const checkAnswer = () => {
    const isCorrect = q.type === 'mcq' ? input === q.answer : input.trim().length > 5;
    const scores = JSON.parse(localStorage.getItem('practiceScores') || '{"attempted":0,"correct":0}');
    scores.attempted += 1;
    if (isCorrect) scores.correct += 1;
    localStorage.setItem('practiceScores', JSON.stringify(scores));
    if (!isCorrect && !weak.includes(q.topic)) {
      const next = [...weak, q.topic];
      setWeak(next);
      localStorage.setItem('weakTopics', JSON.stringify(next));
    }
    setShowScheme(true);
  };

  const nextQ = () => {
    setInput('');
    setShowScheme(false);
    setIndex((i) => i + 1 + Math.floor(Math.random() * 3));
  };

  if (!filtered.length) return <section><h2>Practice Questions</h2><p>No questions match this filter.</p></section>;

  return (
    <section>
      <h2>Practice Questions</h2>
      <div className="filters card">
        <label>Topic
          <select value={topicFilter} onChange={(e) => { setTopicFilter(e.target.value); setIndex(0); }}>
            <option value="all">All Topics</option>
            {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>Topic {n}</option>)}
          </select>
        </label>
        <label>Question type
          <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setIndex(0); }}>
            <option value="all">All Types</option>
            <option value="mcq">Multiple Choice</option>
            <option value="short">Short Answer</option>
            <option value="extended">Extended Writing</option>
          </select>
        </label>
      </div>
      <article className="card">
        <p className="badge">Topic {q.topic} • {q.type.toUpperCase()} • {q.marks} marks</p>
        <h3>{q.question}</h3>
        {q.type === 'mcq' ? (
          <div className="options">
            {q.options.map((o) => (
              <button key={o} className={input === o ? 'active' : ''} onClick={() => setInput(o)}>{o}</button>
            ))}
          </div>
        ) : (
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows="5" placeholder="Type your answer..." />
        )}
        <div className="actions">
          <button className="primary" onClick={checkAnswer}>Check / Reveal Mark Scheme</button>
          <button onClick={nextQ}>Next Random Question</button>
        </div>
        {showScheme && (
          <div className="scheme">
            <p><strong>Indicative answer:</strong> {q.answer}</p>
            <p><strong>Mark scheme:</strong> {q.markScheme}</p>
          </div>
        )}
      </article>
      <p>Weak topics flagged: {weak.length ? weak.join(', ') : 'None yet'}</p>
    </section>
  );
}
