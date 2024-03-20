# Vue Test Project

This project is a Vue 3 application, scaffolded with Vite for a fast development experience. It uses Pinia for state management, Vue Router for routing, and Axios for making HTTP requests.

## Prerequisites

- Node.js (Preferably the latest LTS version)
- npm (Comes with Node.js)

## Recommended IDE Setup

The project was developed using [VSCode](https://code.visualstudio.com/) and [Cursor](https://cursor.sh/) but any other modern code editor or IDE should do the trick.

## Configuration

The project was developed with the default configuration, using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for code linting and formatting. An environment variable was included in `.env.development` and `.env.production` files for the API URL, allowing to make the http requests using the endpoint you set up on your back-end. For development purposes, if running your back-end server on XAMPP, for instance, the endpoint would typically reference a url on your `localhost`, such as `http://localhost:8000/api`. For production, you would typically use the domain of your server, like `https://api.example.com`.

## Project Setup

Clone the repository and install dependencies:

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Prettify with [Prettier](https://prettier.io/)

```sh
npm run format
```
