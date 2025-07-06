import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img
              src="https://cdn.builder.io/api/v1/assets/ea61dcf4d4424dd79aa5d25b8d2c102b/alhuzaifa-logo-c3ac64?format=webp&width=800"
              alt="Al Huzaifa Printers Logo"
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-xl font-display font-semibold text-black dark:text-white">
                Al Huzaifa Printers
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Digital Printing Solutions
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-700 dark:text-gray-300 hover:text-brand-primary transition-colors"
            >
              Home
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 dark:text-gray-300 hover:text-brand-primary transition-colors focus:outline-none">
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-gray-800 dark:border-gray-700">
                <DropdownMenuItem
                  className="dark:text-white dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() =>
                    document
                      .getElementById("mugs")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Sublimation Mugs
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="dark:text-white dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() =>
                    document
                      .getElementById("apparel")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Custom Apparel
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="dark:text-white dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() =>
                    document
                      .getElementById("wristbands")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Wristbands & Event Bands
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="dark:text-white dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() =>
                    document
                      .getElementById("flags")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Flags & Banners
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="#calculator"
              className="text-gray-700 dark:text-gray-300 hover:text-brand-primary transition-colors"
            >
              Price Calculator
            </a>
            <a
              href="#about"
              className="text-gray-700 dark:text-gray-300 hover:text-brand-primary transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 dark:text-gray-300 hover:text-brand-primary transition-colors"
            >
              Contact
            </a>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-3">
              <a
                href="#home"
                className="text-gray-700 dark:text-gray-300 hover:text-brand-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>

              <div className="space-y-2">
                <div className="text-gray-700 dark:text-gray-300 font-medium">
                  Services
                </div>
                <div className="ml-4 space-y-1">
                  <button
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-brand-primary transition-colors"
                    onClick={() => {
                      document
                        .getElementById("mugs")
                        ?.scrollIntoView({ behavior: "smooth" });
                      setIsMenuOpen(false);
                    }}
                  >
                    Sublimation Mugs
                  </button>
                  <button
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-brand-primary transition-colors"
                    onClick={() => {
                      document
                        .getElementById("apparel")
                        ?.scrollIntoView({ behavior: "smooth" });
                      setIsMenuOpen(false);
                    }}
                  >
                    Custom Apparel
                  </button>
                  <button
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-brand-primary transition-colors"
                    onClick={() => {
                      document
                        .getElementById("wristbands")
                        ?.scrollIntoView({ behavior: "smooth" });
                      setIsMenuOpen(false);
                    }}
                  >
                    Wristbands & Event Bands
                  </button>
                  <button
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-brand-primary transition-colors"
                    onClick={() => {
                      document
                        .getElementById("flags")
                        ?.scrollIntoView({ behavior: "smooth" });
                      setIsMenuOpen(false);
                    }}
                  >
                    Flags & Banners
                  </button>
                </div>
              </div>

              <a
                href="#calculator"
                className="text-gray-700 dark:text-gray-300 hover:text-brand-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Price Calculator
              </a>
              <a
                href="#about"
                className="text-gray-700 dark:text-gray-300 hover:text-brand-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 dark:text-gray-300 hover:text-brand-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
