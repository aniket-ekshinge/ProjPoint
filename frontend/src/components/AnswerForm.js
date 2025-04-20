import React, { useState } from 'react';

const AnswerForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handle = e => {
    e.preventDefault();
    onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handle}>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Your answer"
        required
      />
      <br />
      <button type="submit">Submit Answer</button>
    </form>
  );
};

export default AnswerForm;