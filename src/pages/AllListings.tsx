import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter, Clock, Phone, MessageCircle, Mail, Star, Eye, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { allProducts, categories, type Product } from '@/data/mockData';
import { Link, useNavigate } from 'react-router-dom';

const AllListings = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [sortBy, setSortBy] = useState('newest');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Get unique locations from all products
  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(allProducts.map(product => {
      return product.location.split(',')[0].trim();
    }))];
    return uniqueLocations;
  }, []);

  // Filter and sort products (excluding hot deals to show regular listings)
  const filteredProducts = useMemo(() => {
    let products = allProducts.filter(product => !product.isHotDeal); // Exclude hot deals

    // Apply search filter
    if (searchTerm) {
      products = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply other filters
    if (selectedCategory !== 'all') {
      products = products.filter(product => product.category === selectedCategory);
    }
    if (selectedCondition !== 'all') {
      products = products.filter(product => product.condition === selectedCondition);
    }
    if (selectedLocation !== 'all') {
      products = products.filter(product => product.location.toLowerCase().includes(selectedLocation.toLowerCase()));
    }
    if (verifiedOnly) {
      products = products.filter(product => product.seller.verified);
    }
    products = products.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case 'alphabetical':
        products.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'discount':
        products.sort((a, b) => {
          const aDiscount = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0;
          const bDiscount = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0;
          return bDiscount - aDiscount;
        });
        break;
    }

    return products;
  }, [searchTerm, selectedCategory, selectedCondition, selectedLocation, priceRange, verifiedOnly, sortBy]);

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleWhatsApp = (phone: string, productTitle: string) => {
    const message = `Hi! I'm interested in your product: ${productTitle}`;
    window.open(`https://wa.me/254${phone.slice(1)}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = (email: string, productTitle: string) => {
    const subject = `Inquiry about: ${productTitle}`;
    const body = `Hi,\n\nI'm interested in your product: ${productTitle}\n\nPlease provide more details.\n\nThanks!`;
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedCondition('all');
    setSelectedLocation('all');
    setPriceRange([0, 2000000]);
    setSortBy('newest');
    setVerifiedOnly(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-effect border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold gradient-text">All Latest Products</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-primary text-primary-foreground">
                {filteredProducts.length} products found
              </Badge>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-card p-6 rounded-xl shadow-card sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">Filters</h3>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Condition Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Condition</label>
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Conditions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Conditions</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: KSh {priceRange[0].toLocaleString()} - KSh {priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={2000000}
                    min={0}
                    step={1000}
                    className="w-full"
                  />
                </div>

                {/* Verified Sellers Only */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Verified Sellers Only</label>
                  <Switch checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="discount">Highest Discount</SelectItem>
                      <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="lg:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or clearing the filters
                </p>
                <Button onClick={clearFilters} className="btn-hero">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-6'
              }>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`product-card ${viewMode === 'list' ? 'flex space-x-4' : ''}`}
                  >
                    <div className={`product-content ${viewMode === 'list' ? 'flex space-x-4' : ''}`}>
                      {/* Product Image */}
                      <div className={`relative overflow-hidden rounded-lg ${
                        viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'mb-4 h-48'
                      }`}>
                        <Link to={`/product/${product.id}`}>
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
                          />
                        </Link>
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            <Clock className="w-3 h-3 mr-1" />
                            New
                          </Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="capitalize bg-background/80">
                            {product.condition}
                          </Badge>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className={`space-y-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div>
                          <Link to={`/product/${product.id}`}>
                            <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-2 hover:text-primary cursor-pointer transition-colors">
                              {product.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-primary">
                            KSh {product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              KSh {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* Location & Date */}
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <span>{product.location}</span>
                          <span>{new Date(product.dateAdded).toLocaleDateString()}</span>
                        </div>

                        {/* Seller Info */}
                        <div className="flex items-center space-x-2 p-2 bg-secondary/30 rounded-lg">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-xs">
                              {product.seller.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-1">
                              <span className="font-medium text-xs">{product.seller.name}</span>
                              {product.seller.verified && (
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Contact Buttons */}
                        <div className="grid grid-cols-4 gap-1">
                          <Link to={`/product/${product.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                          </Link>
                          <Button
                            onClick={() => handleCall(product.seller.phone)}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Phone className="w-3 h-3" />
                          </Button>
                          <Button
                            onClick={() => handleWhatsApp(product.seller.whatsapp, product.title)}
                            variant="outline"
                            size="sm"
                            className="w-full bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
                          >
                            <MessageCircle className="w-3 h-3" />
                          </Button>
                          <Button
                            onClick={() => handleEmail(product.seller.email, product.title)}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Mail className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllListings;