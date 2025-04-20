import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuery, createAnswer } from '../../services/api';
import AnswerForm from '../../components/AnswerForm';
import { AuthContext } from '../../context/AuthContext';

const QueryDetail = () => {
  const { id } = useParams();
  const [query, setQuery] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchQuery(id).then(setQuery);
  }, [id]);

  const handleAnswer = (content) => {
    createAnswer(id, { content })
      .then(() => fetchQuery(id).then(setQuery))
      .catch(err => console.error(err));
  };

  if (!query) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{query.title}</h2>
      <p>{query.description}</p>
      <p><em>Asked by {query.author} on {new Date(query.created_at).toLocaleString()}</em></p>

      <h3>Answers</h3>
      {query.answers.length > 0 ? (
        <ul>
          {query.answers.map(ans => (
            <li key={ans.id} style={{ margin: '1rem 0' }}>
              <p>{ans.content}</p>
              <p><strong>- {ans.responder}</strong> at {new Date(ans.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No answers yet. Be the first to answer!</p>
      )}

      {user && (
        <div style={{ marginTop: '2rem' }}>
          <h4>Your Answer</h4>
          <AnswerForm onSubmit={handleAnswer} />
        </div>
      )}
    </div>
  );
};

export default QueryDetail;