import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import RecipeList from '../components/RecipeList';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          name: 'Spaghetti Bolognese',
          cooking_time: 30,
          ingredients: [],
          instructions: '',
          reviews: [],
        },
        {
          id: 2,
          name: 'Chicken Curry',
          cooking_time: 45,
          ingredients: [],
          instructions: '',
          reviews: [],
        },
      ]),
  })
) as jest.Mock;

test('renders Recipes and Custom Recipes navigation buttons', async () => {
  await act(async () => {
    render(<RecipeList />);
  });
  expect(
    screen.getAllByRole('button', { name: /Recipes/i })[0]
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /Custom Recipes/i })
  ).toBeInTheDocument();
});

test('renders recipe names', async () => {
  await act(async () => {
    render(<RecipeList />);
  });
  expect(await screen.findByText('Spaghetti Bolognese')).toBeInTheDocument();
  expect(await screen.findByText('Chicken Curry')).toBeInTheDocument();
});

test('allows toggling favorite status', async () => {
  await act(async () => {
    render(<RecipeList />);
  });
  const favoriteButtons = await screen.findAllByLabelText(/favorite-/i);
  fireEvent.click(favoriteButtons[0]);
  await waitFor(() =>
    expect(favoriteButtons[0].classList).toContain('fa-heart')
  );
});

test('shows Add Recipe button only in Custom Recipes view', async () => {
  await act(async () => {
    render(<RecipeList />);
  });
  fireEvent.click(screen.getByRole('button', { name: /Custom Recipes/i }));
  expect(
    screen.getByRole('button', { name: /Add Recipe/i })
  ).toBeInTheDocument();
  fireEvent.click(screen.getAllByRole('button', { name: /Recipes/i })[0]);
  expect(screen.queryByRole('button', { name: /Add Recipe/i })).toBeNull();
});

test('shows the custom recipe form when Add Recipe is clicked', async () => {
  await act(async () => {
    render(<RecipeList />);
  });
  fireEvent.click(screen.getByRole('button', { name: /Custom Recipes/i }));
  fireEvent.click(screen.getByRole('button', { name: /Add Recipe/i }));
  expect(screen.getByText('Add Custom Recipe')).toBeInTheDocument();
});
