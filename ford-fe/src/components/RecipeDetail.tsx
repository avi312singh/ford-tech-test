import React, { useState, useEffect } from 'react';

interface Review {
  id: number;
  rating: number;
}

interface Recipe {
  id: number;
  name: string;
  cooking_time: number;
  ingredients: string[];
  instructions: string;
  reviews: Review[];
}

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => {
  const [rating, setRating] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    if (recipe.reviews.length > 0) {
      const total = recipe.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      setAverageRating(total / recipe.reviews.length);
    } else {
      setAverageRating(null);
    }
  }, [recipe.reviews]);

  const handleRatingSubmit = async () => {
    const response = await fetch(
      `http://localhost:3000/recipes/${recipe.id}/reviews`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
      }
    );

    if (response.ok) {
      const updatedReview = await response.json();
      recipe.reviews.push({ id: updatedReview.id, rating });
      setRating(0);

      const total = recipe.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      setAverageRating(total / recipe.reviews.length);
    } else {
      console.error('Error submitting rating');
    }
  };

  return (
    <div>
      <button onClick={onBack}>Back to List</button>
      <h1>{recipe.name}</h1>
      <p>Cooking Time: {recipe.cooking_time} minutes</p>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>
      <h2>Reviews</h2>
      <ul>
        {recipe.reviews.map((review) => (
          <li key={review.id}>
            <p>Rating: {review.rating}</p>
          </li>
        ))}
      </ul>
      <div>
        <h2>Average Rating</h2>
        <p>
          {averageRating !== null ? averageRating.toFixed(1) : 'No ratings yet'}
        </p>
        <div>
          <h3>Add a Rating</h3>
          <select
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value, 10))}
          >
            <option value={0}>Select Rating</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button onClick={handleRatingSubmit}>Submit Rating</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
