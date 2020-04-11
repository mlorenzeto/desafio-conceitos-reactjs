import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repository ${Date.now()}`,
      url: 'https://github.com/mlorenzeto/NetSdoGeometry',
      techs: ['C#', 'Javascript']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    const repositoriesCopy = [...repositories];

    const repositoryIndex = repositoriesCopy.findIndex(repository => repository.id === id);

    repositoriesCopy.splice(repositoryIndex, 1);

    setRepositories(repositoriesCopy);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>            
          )        
        )}        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
