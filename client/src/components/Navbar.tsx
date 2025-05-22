import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Cloud, Menu, Search, Moon, Sun, X } from 'lucide-react';

interface NavbarProps {
  onSearch?: (searchTerm: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { darkMode, toggleDarkMode } = useDarkMode();

  const navigation = [
    { name: 'Dashboard', href: '/', current: location === '/' },
    { name: 'My Files', href: '/files', current: location === '/files' },
    { name: 'Recent', href: '/recent', current: location === '/recent' },
    { name: 'Favorites', href: '/favorites', current: location === '/favorites' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchTerm);
    setSearchOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-google-blue rounded-lg flex items-center justify-center">
              <Cloud className="text-white" size={16} />
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">DriveHub</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className={`font-medium transition-colors ${
                  item.current
                    ? 'text-google-blue'
                    : 'text-gray-700 dark:text-gray-300 hover:text-google-blue dark:hover:text-google-blue'
                }`}>
                  {item.name}
                </a>
              </Link>
            ))}
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search files and folders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-google-blue focus:border-google-blue"
              />
            </form>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            {/* Search button (mobile) */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={18} />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search files and folders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-google-blue focus:border-google-blue"
              autoFocus
            />
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 space-y-3">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a 
                  className={`block py-2 font-medium ${
                    item.current
                      ? 'text-google-blue'
                      : 'text-gray-700 dark:text-gray-300 hover:text-google-blue dark:hover:text-google-blue'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
