import React, { useState } from 'react';

const QueryForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handle = e => {
    e.preventDefault();
    onSubmit(title, description);
    setTitle(''); setDescription('');
  };

  return (
    <form onSubmit={handle} style={{ margin: '1rem 0' }}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Query title"
        required
      />
      <br />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Describe your question"
        required
      />
      <br />
      <button type="submit">Post Query</button>
    </form>
  );
};

export default QueryForm;