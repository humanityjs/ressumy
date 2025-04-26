# React TypeScript Tailwind Template

A simple React Typescript template I use for building web applications.

## Features

- **React 19** - The latest version of React
- **TypeScript** - Type safety and better developer experience
- **Vite** - Lightning fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Beautiful, accessible UI components
- **React Router** - Declarative routing for React applications
- **Dark Mode** - Built-in dark mode support with theme toggle
- **Supabase Auth** - User authentication with Supabase
- **React Query** - Data fetching and state management

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone this repository

```bash
git clone https://github.com/humanityjs/react-vite-ts-tw.git your-project-name
cd your-project-name
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env` file in the root directory with your Supabase credentials:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_API_URL=your-api-endpoint
```

4. Start the development server

```bash
npm run dev
```

## Project Structure

- `src/` - Source files
  - `components/` - Reusable UI components
    - `ui/` - Shadcn UI components
  - `hooks/` - Custom React hooks
    - `useApi.ts` - Custom React Query hooks for data fetching and data mutations
  - `lib/` - Utility functions and configuration
  - `pages/` - Page components
    - `home/` - Home page
    - `about/` - About page
    - `auth/` - Authentication pages
  - `providers/` - Context providers
    - `ThemeProvider.tsx` - Dark/light theme context
    - `AuthProvider.tsx` - Authentication context

## Authentication

This template comes with Supabase authentication pre-configured. It includes:

- Sign in / Sign up
- Password reset
- Protected routes
- Authentication state management

## Data Fetching

This template uses React Query for data fetching and state management. It includes:

- Custom `useQuery` hook for data fetching
- Custom `useMutation` hook for data mutations
- Integration with Supabase for backend data

### Example Usage

```tsx
// Fetch data
const { data, isLoading, error } = useQuery<{firstName: string; lastName: string}[]>({ key: ['users'], url: '/users'});

// Mutate data
1. const { mutate, isLoading } = useMutation<{message: string}, {id: number}>({ url: '/users/2', method: 'post' });

2. const { mutate, isLoading } = useMutation<{message: string}, {id: number}>({
    url: (payload) => `/users/${payload.id}`,
    method: 'post'
  });
```

## Customization

### Styling

This template uses Tailwind CSS for styling. You can easily customize the theme. See https://tailwindcss.com/docs/adding-custom-styles

### Components

Shadcn UI components are available in the `src/components/ui` directory. You can add more components as needed.

## License

MIT
