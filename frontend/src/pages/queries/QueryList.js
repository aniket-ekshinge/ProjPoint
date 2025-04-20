import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchQueries, createQuery } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import QueryForm from '../../components/QueryForm';

const QueryList = () => {
  const [queries, setQueries] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    load();
  }, []);

  const load = () => fetchQueries().then(setQueries);

  const handleCreate = (title, description) => {
    createQuery({ title, description })
      .then(() => load())
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>All Queries</h2>
      <QueryForm onSubmit={handleCreate} />
      <ul>
        {queries.map(q => (
          <li key={q.id} style={{ margin: '1rem 0' }}>
            <Link to={`/queries/${q.id}`}>{q.title}</Link>
            <p>by {q.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueryList;