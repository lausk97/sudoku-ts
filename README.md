# Sudoku

A responsive random generated sudoku game written in React, TypeScript and Vite.
It consists of four difficulty levels: **Easy**, **Medium**, **Hard**, **Expert**.

## What is Sudoku?

Sudoku grid consists of 9x9 spaces.
There are 9 3x3 block within the grid.
You can only input numbers between 1 to 9.

## Game Rules

All the grids have to satisfy three requirements below:

1. Each vertical row can only contain one of 1 to 9 (no duplicate allowed)
2. Each horizontal column can only contain one of 1 to 9 (no duplicate allowed)
3. Each 3x3 block can only contain one of 1 to 9 (no duplicate allowed)

<img src="src/assets/rules-sudoku.png" alt="Rules - Sudoku">

## Development

Clone this repository on your local machine

```
git clone https://github.com/lausk97/sudoku-ts.git
cd sudoku-ts
```

Run the following commands on your terminal to start the server locally

```
npm ci
npm run dev
```

Optional: Testing (w/ Jest &amp; React Testing Library)

```
npm test
```

## Deployment

The project is currently deployed on Vercel, feel free to play the game through this [link]:(https://sudoku-ts.vercel.app/).
