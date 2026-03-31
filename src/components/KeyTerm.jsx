import { useState } from 'react';

export default function KeyTerm({ term, definition }) {
  const [show, setShow] = useState(false);
  return (
    <span className="key-term" onClick={() => setShow(!show)} onMouseLeave={() => setShow(false)}>
      {term}
      {show && <span className="term-pop">{definition}</span>}
    </span>
  );
}
