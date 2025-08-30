import { useState } from 'react';
import { Search, Menu, Heart, User, ShoppingCart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import SearchAutocomplete from '@/components/SearchAutocomplete';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/254708083263?text=Hello! I need help with Sokoni Arena', '_blank');
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 glass-effect border-b"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="font-bold text-xl gradient-text">Sokoni Arena</h1>
              <p className="text-xs text-muted-foreground">Kenya's Beautiful Marketplace</p>
            </div>
          </motion.div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <SearchAutocomplete
              onSearch={(query) => {
                window.location.href = `/search?q=${encodeURIComponent(query)}`;
              }}
              placeholder="Search for products, services, events..."
              className="w-full"
            />
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-6">
            <a href="#categories" className="text-foreground hover:text-primary transition-colors font-medium">
              Categories
            </a>
            <a href="#hot-deals" className="text-foreground hover:text-primary transition-colors font-medium">
              Hot Deals
            </a>
            <a href="#advertise" className="text-foreground hover:text-primary transition-colors font-medium">
              Advertise
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleWhatsAppContact}
              className="hidden sm:flex hover:bg-primary/10"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-primary/10">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-primary/10">
              <User className="w-5 h-5" />
            </Button>
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <SearchAutocomplete
            onSearch={(query) => {
              window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }}
            placeholder="Search products, services..."
            className="w-full"
          />
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden mt-4 py-4 border-t"
          >
            <nav className="flex flex-col space-y-4">
              <a href="#categories" className="text-foreground hover:text-primary transition-colors font-medium">
                Categories
              </a>
              <a href="#hot-deals" className="text-foreground hover:text-primary transition-colors font-medium">
                Hot Deals
              </a>
              <a href="#advertise" className="text-foreground hover:text-primary transition-colors font-medium">
                Advertise
              </a>
              <Button
                onClick={handleWhatsAppContact}
                className="btn-hero-outline w-full justify-start"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact us on WhatsApp
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;