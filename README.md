# Glimpsed

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Description

**Glimpsed** is a client testimonials viewer built entirely with vanilla TypeScript — no UI frameworks, no runtime dependencies. It presents a curated list of reviews in a clean card layout, where each entry features a reviewer photo, full name, professional role, and a personal testimonial.

Users can navigate through the reviews in three ways: stepping forward with the **Next** button, stepping backward with the **Previous** button, or jumping to a random entry with the **Surprise Me** button. Navigation wraps around seamlessly — going past the last review cycles back to the first, and going before the first jumps to the last.

Under the hood, state is managed through a custom generic `Store` class that implements a subscription-based observer pattern. Components subscribe to specific state keys and receive updates only when those keys change, keeping the UI in sync without any reactivity framework. The `ReviewStore` extends this base class and holds the full reviews array along with the currently displayed review.

The UI is built with reusable component functions that return DOM elements directly, follow a strict props interface, and expose a `cleanup()` method to remove event listeners and prevent memory leaks. Styling is handled with Tailwind CSS and is fully responsive, adapting the layout from a stacked mobile view to a side-by-side desktop card.

The project is covered by a comprehensive test suite using Jest, ts-jest, and Testing Library, with coverage thresholds enforced at 70% across branches, functions, lines, and statements. Code quality is enforced through ESLint and Prettier, with pre-commit hooks via Husky and lint-staged running automatically on every commit.

## Technologies used

1. Typescript
2. TailwindCSS
3. CSS3
4. HTML5
5. Vite

## Libraries used

#### Dependencies

```
No production dependencies - Pure Vanilla TypeScript
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"autoprefixer": "^10.4.16"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"postcss": "^8.4.33"
"prettier": "^3.8.1"
"tailwindcss": "^3.4.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.54.0"
"vite": "^7.1.5"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/glimpsed`](https://www.diegolibonati.com.ar/#/project/glimpsed)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.
