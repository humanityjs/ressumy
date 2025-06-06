import { Layout } from '@/components/Layout';
import { LLMInitializer } from '@/components/ui/llm-initializer';
import About from '@/pages/about/About';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import Login from '@/pages/auth/Login';
import SignUp from '@/pages/auth/SignUp';
import EditorPage from '@/pages/editor/EditorPage';
import Home from '@/pages/home/Home';
import TemplatePage from '@/pages/templates/TemplatePage';
import { AuthProvider } from '@/providers/AuthProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

// Create router with nested routes
const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword />,
  },
  // Public routes with layout
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'templates',
        element: <TemplatePage />,
      },
      {
        path: 'editor',
        element: <EditorPage />,
      },
      // {
      //   path: 'upload',
      //   element: <UploadPage />,
      // },
      // Protected routes could be added here with the ProtectedRoute component
      // Example:
      // {
      //   path: 'dashboard',
      //   element: <ProtectedRoute />,
      //   children: [
      //     {
      //       index: true,
      //       element: <Dashboard />,
      //     },
      //   ],
      // },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {/* The LLMInitializer will start loading the AI model
              as soon as the app mounts, regardless of which page is viewed */}
          <LLMInitializer />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
