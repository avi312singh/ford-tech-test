import { Router, Request, Response } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

interface Recipe {
  id: number;
  name: string;
  cooking_time: number;
  ingredients: string[];
  instructions: string;
  reviews: Review[];
}

interface Review {
  id: number;
  rating: number;
}

const router = Router();

let recipes: Recipe[] = require('../../data/recipes.json');

router.get('/', async (req: Request, res: Response) => {
  try {
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const recipe = recipes.find((r) => r.id === parseInt(req.params.id));
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:id/reviews', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const recipe = recipes.find((r) => r.id === parseInt(id));
    if (recipe) {
      const newReview: Review = {
        id: recipe.reviews.length
          ? Math.max(...recipe.reviews.map((r) => r.id)) + 1
          : 1,
        rating,
      };
      recipe.reviews.push(newReview);
      await fs.writeFile(
        path.join(__dirname, '../../data/recipes.json'),
        JSON.stringify(recipes, null, 2)
      );
      res.status(201).json(newReview);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id/reviews', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = recipes.find((r) => r.id === parseInt(id));
    if (recipe) {
      res.status(200).json(recipe.reviews);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
