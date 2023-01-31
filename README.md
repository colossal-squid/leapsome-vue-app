# leapsome-code-challenge

Hi guys! Thanks for taking your time and reviewing my code-challenge results!

Just a few remarks before you start:

1. I did change the express backend interface a bit. The repo with my version of backend is: [https://github.com/colossal-squid/leapsome-express-app](https://github.com/colossal-squid/leapsome-express-app)

2. Lint and build - pass, there's like 2 unit-tests with 1 `it` clause each

3. Backend url is set in `.env` file in project root.

## "if only i had more time"

- App is somewhat "responsive" but this was intended for desktop only
- of course I would do higher unit-test coverage
- an e2e "sanity-check" test
- docker images for express app / vue app and a docker-compose.yml to run them all together
- dark mode :D
- more useful error screen

## Project Setup

```
npm install
npm run dev
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
