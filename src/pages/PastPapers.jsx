import { useState } from 'react';
import papers from '../data/pastpapers';
import Timer from '../components/Timer';

export default function PastPapers() {
  const [paperId, setPaperId] = useState(papers[0].id);
  const [running, setRunning] = useState(false);
  const paper = papers.find((p) => p.id === paperId);
  const [seconds, setSeconds] = useState(paper.durationMinutes * 60);
  const [submitted, setSubmitted] = useState(false);

  const changePaper = (id) => {
    const p = papers.find((x) => x.id === id);
    setPaperId(id);
    setSeconds(p.durationMinutes * 60);
    setRunning(false);
    setSubmitted(false);
  };

  return (
    <section>
      <h2>Past Paper Simulator</h2>
      <div className="card actions">
        {papers.map((p) => <button key={p.id} onClick={() => changePaper(p.id)}>{p.title}</button>)}
      </div>
      <article className="card">
        <h3>{paper.title}</h3>
        <Timer seconds={seconds} running={running} setSeconds={setSeconds} />
        <div className="actions">
          <button className="primary" onClick={() => setRunning((v) => !v)}>{running ? 'Pause' : 'Start'}</button>
          <button onClick={() => setSubmitted(true)}>Submit Paper</button>
          <button onClick={() => setSeconds(paper.durationMinutes * 60)}>Reset Timer</button>
        </div>
        {paper.questions.map((q, i) => (
          <div key={i} className="question-block">
            <p><strong>Q{i + 1}.</strong> {q.q}</p>
            {submitted && <p className="scheme"><strong>Mark scheme:</strong> {q.markScheme}</p>}
          </div>
        ))}
      </article>
    </section>
  );
}
