import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import RecipeDetail from './RecipeDetail';
import CustomRecipeForm from './CustomRecipeForm';

interface Review {
  id: number;
  rating: number;
}

export interface Recipe {
  id: number;
  name: string;
  cooking_time: number;
  ingredients: string[];
  instructions: string;
  reviews: Review[];
}

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>([]);
  const [showCustomForm, setShowCustomForm] = useState<boolean>(false);
  const [viewCustomRecipes, setViewCustomRecipes] = useState<boolean>(false);

  useEffect(() => {
    fetch('http://localhost:3000/recipes')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const selectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleAddCustomRecipe = (recipe: Recipe) => {
    setCustomRecipes([
      ...customRecipes,
      { ...recipe, id: customRecipes.length + 1 },
    ]);
    setShowCustomForm(false);
  };

  return (
    <div>
      {!selectedRecipe && (
        <nav>
          <button onClick={() => setViewCustomRecipes(false)}>Recipes</button>
          <button onClick={() => setViewCustomRecipes(true)}>
            Custom Recipes
          </button>
        </nav>
      )}
      {selectedRecipe ? (
        <RecipeDetail
          recipe={selectedRecipe}
          onBack={() => setSelectedRecipe(null)}
        />
      ) : showCustomForm ? (
        <CustomRecipeForm onAddRecipe={handleAddCustomRecipe} />
      ) : (
        <div>
          <h1>{viewCustomRecipes ? 'Custom Recipes' : 'Recipes'}</h1>
          {viewCustomRecipes && (
            <button onClick={() => setShowCustomForm(true)}>Add Recipe</button>
          )}
          <ul>
            {(viewCustomRecipes ? customRecipes : recipes).map((recipe) => (
              <li key={recipe.id}>
                <h2>
                  <span
                    onClick={() => selectRecipe(recipe)}
                    style={{
                      cursor: 'pointer',
                      color: 'blue',
                      textDecoration: 'underline',
                    }}
                  >
                    {recipe.name}
                  </span>
                  <FontAwesomeIcon
                    icon={
                      favorites.includes(recipe.id) ? solidHeart : regularHeart
                    }
                    onClick={() => toggleFavorite(recipe.id)}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                    aria-label={`favorite-${recipe.id}`}
                  />
                </h2>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
