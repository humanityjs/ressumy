import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link, Outlet, useNavigate } from 'react-router';

// You can do anything here, like adding a header, footer, or sidebar
export function Layout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card z-10 sticky top-0">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 text-primary"
              >
                <path d="M19.5 14.4v-2.8a7.5 7.5 0 0 0-7.5-7.5h-3.5a7.5 7.5 0 0 0-7.5 7.5v2.8c0 .8.7 1.5 1.5 1.5h15c.8 0 1.5-.7 1.5-1.5Z" />
                <path d="m8.5 12 1.5-1.5 1.5 1.5" />
                <path d="M14 8h.01" />
                <path d="M3 14.4v-2.8a7.5 7.5 0 0 1 .5-2.7" />
                <path d="M6.5 19.9h12c.8 0 1.5-.7 1.5-1.5v-2" />
                <path d="M8.5 19.9a2 2 0 1 1 4 0" />
              </svg>
              <span className="text-xl font-bold">React Template</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <nav>
              <ul className="flex gap-4">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-primary transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-sm"
                >
                  Sign out
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="default" size="sm">
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t py-6 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Built with ❤️ - A production-ready starter for your web projects
          </p>
        </div>
      </footer>
    </div>
  );
}
