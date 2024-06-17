import React from 'react';
import RecipeList from './components/RecipeList';
import './styles.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <RecipeList />
    </div>
  );
};

export default App;
