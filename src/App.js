import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepository([...repositories, response.data])
    })
  }, []);

  console.log(repositories);

  async function handleAddRepository() {
    const repository = await api.post('/repositories', {
      'title': `New repository ${Date.now()}`,
      'url': 'localhost',
      'techs': ['tech-1', 'tech-2'],
    });

    setRepository([...repositories, repositories[0].push(repository.data)]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    
    const repositoryIndex = repositories[0].findIndex(repository => repository.id === id);

    repositories[0].splice(repositoryIndex, 1);

    setRepository([...repositories, repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 && repositories[0].map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}

              <button key={repository.id} onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )  
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
