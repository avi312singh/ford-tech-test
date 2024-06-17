import React, { useState } from 'react';
import { Recipe } from './RecipeList';

interface CustomRecipeFormProps {
  onAddRecipe: (recipe: Recipe) => void;
}

const CustomRecipeForm: React.FC<CustomRecipeFormProps> = ({ onAddRecipe }) => {
  const [name, setName] = useState<string>('');
  const [cookingTime, setCookingTime] = useState<number>(0);
  const [ingredients, setIngredients] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe: Recipe = {
      id: 0,
      name,
      cooking_time: cookingTime,
      ingredients: ingredients
        .split(',')
        .map((ingredient) => ingredient.trim()),
      instructions,
      reviews: [],
    };
    onAddRecipe(newRecipe);
  };

  return (
    <div>
      <h1>Add Custom Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cooking Time (minutes): </label>
          <input
            type='number'
            value={cookingTime}
            onChange={(e) => setCookingTime(parseInt(e.target.value, 10))}
            required
          />
        </div>
        <div>
          <label>Ingredients (comma separated): </label>
          <input
            type='text'
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Instructions: </label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Add Recipe</button>
      </form>
    </div>
  );
};

export default CustomRecipeForm;
