# Contributing to Tasktivate

First off, thank you for considering contributing to Tasktivate! It's people like you that make Tasktivate such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain which behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible
* Follow the JavaScript/React styleguide
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## Development Process

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints

### JavaScript Styleguide

* Use semicolons
* 2 spaces for indentation
* Prefer `const` over `let`
* Use template literals instead of string concatenation
* Use arrow functions over anonymous functions
* Use destructuring when possible
* Use async/await over Promises
* Add trailing commas
* Keep lines under 100 characters

### React Styleguide

* Use functional components with hooks over class components
* Use TypeScript for type safety
* Keep components small and focused
* Use CSS-in-JS (styled-components) for styling
* Implement proper prop-types
* Use meaningful component names
* Keep state as local as possible
* Use proper folder structure

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐎 `:racehorse:` when improving performance
    * 🚱 `:non-potable_water:` when plugging memory leaks
    * 📝 `:memo:` when writing docs
    * 🐛 `:bug:` when fixing a bug
    * 🔥 `:fire:` when removing code or files
    * 💚 `:green_heart:` when fixing the CI build
    * ✅ `:white_check_mark:` when adding tests
    * 🔒 `:lock:` when dealing with security
    * ⬆️ `:arrow_up:` when upgrading dependencies
    * ⬇️ `:arrow_down:` when downgrading dependencies

## Setting Up Your Development Environment

1. Install Node.js (v16 or higher)
2. Install npm or yarn
3. Fork the repository
4. Clone your fork:
   ```bash
   git clone https://github.com/your-username/tasktivate.git
   ```
5. Install dependencies:
   ```bash
   cd tasktivate
   npm install
   ```
6. Create a `.env` file with required environment variables
7. Start the development server:
   ```bash
   npm start
   ```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Code Quality Tools

* ESLint for JavaScript linting
* Prettier for code formatting
* Jest for testing
* React Testing Library for component testing

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Main application views
├── hooks/         # Custom React hooks
├── services/      # API integration
├── styles/        # SASS styles
├── context/       # React context providers
├── utils/         # Helper functions
└── tests/         # Test files
```

## Questions?

Feel free to open an issue with the tag `question` if you have any questions about contributing to Tasktivate.
