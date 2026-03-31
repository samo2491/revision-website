import { Link } from 'react-router-dom';
import topics from '../data/topics';
import questions from '../data/questions';
import ProgressBar from '../components/ProgressBar';

export default function Home() {
  const progress = JSON.parse(localStorage.getItem('topicProgress') || '{}');
  const scores = JSON.parse(localStorage.getItem('practiceScores') || '{}');
  const topicCompletion = topics.map((t) => progress[t.id] || 0);
  const avg = topicCompletion.length ? topicCompletion.reduce((a, b) => a + b, 0) / topicCompletion.length : 0;

  return (
    <section>
      <h2>Dashboard</h2>
      <p>Your all-in-one OCR GCSE Business Studies revision platform.</p>
      <div className="card">
        <h3>Overall topic completion: {avg.toFixed(0)}%</h3>
        <ProgressBar value={avg} />
      </div>
      <div className="grid">
        {topics.map((t) => (
          <article className="card" key={t.id}>
            <h4>{t.title}</h4>
            <p>Completion: {progress[t.id] || 0}%</p>
            <ProgressBar value={progress[t.id] || 0} />
          </article>
        ))}
      </div>
      <div className="card">
        <h3>Practice snapshot</h3>
        <p>Attempted: {scores.attempted || 0} / {questions.length}</p>
        <p>Correct: {scores.correct || 0}</p>
        <div className="actions">
          <Link to="/revise">Start Revising</Link>
          <Link to="/practice">Practice Questions</Link>
          <Link to="/pastpapers">Timed Papers</Link>
        </div>
      </div>
    </section>
  );
}
