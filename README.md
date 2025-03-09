# Tasktivate

A modern, responsive task management application built with React. Tasktivate helps you organize and track your tasks efficiently with a clean, intuitive interface.

## Features

- **User Authentication**: Secure login and registration system
- **Task Management**: Create, update, and organize your tasks
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Real-time Updates**: Instant feedback on task status changes
- **Modern UI**: Clean and intuitive interface with smooth animations

## Tech Stack

- **Frontend Framework**: React 19
- **State Management**: React Query (TanStack Query)
- **Forms & Validation**: Formik with Yup
- **HTTP Client**: Axios
- **UI Components**:
  - React Select
  - React Slick (carousel)
  - Various icon libraries
- **Styling**: SASS with Autoprefixer
- **Testing**: Jest & React Testing Library

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tasktivate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with required environment variables:
   ```
   REACT_APP_API_URL=your_api_url
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm start`: Run development server
- `npm test`: Run test suite
- `npm run build`: Create production build
- `npm run eject`: Eject from Create React App

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Main application views
├── hooks/         # Custom React hooks
├── services/      # API integration
├── styles/        # SASS styles
└── context/       # React context providers
```

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## Contributing

We love your input! We want to make contributing to Tasktivate as easy and transparent as possible. Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed information about:

- Code of Conduct
- Development Process
- Project Structure
- Coding Standards
- Pull Request Process

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
