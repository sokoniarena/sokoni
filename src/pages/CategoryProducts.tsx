import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Phone, MessageCircle, Mail, Star, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { allProducts, categories, type Product } from '@/data/mockData';

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [subcategory, setSubcategory] = useState('all');
  const [condition, setCondition] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const category = categories.find(cat => cat.id === categoryId);
  
  const filteredProducts = useMemo(() => {
    // Get all products for this category (including additional products)
    let products = allProducts.filter(product => product.category === categoryId);

    // Apply filters
    if (subcategory !== 'all') {
      products = products.filter(product => product.subcategory === subcategory);
    }
    if (condition !== 'all') {
      products = products.filter(product => product.condition === condition);
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
  }, [categoryId, subcategory, condition, priceRange, verifiedOnly, sortBy]);

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

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

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
              <div>
                <h1 className="text-2xl font-bold gradient-text">{category.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} products found
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
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
                {/* Subcategory Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Subcategory</label>
                  <Select value={subcategory} onValueChange={setSubcategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Subcategories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subcategories</SelectItem>
                      {category.subcategories.map(sub => (
                        <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Condition Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Condition</label>
                  <Select value={condition} onValueChange={setCondition}>
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
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="lg:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters</p>
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
                    className={`${product.isHotDeal ? 'hot-deal-glow' : 'product-card'} ${
                      viewMode === 'list' ? 'flex space-x-4' : ''
                    }`}
                  >
                    <div className={product.isHotDeal ? 'hot-deal-content' : 'product-content'}>
                      <div className={`${viewMode === 'list' ? 'flex space-x-4' : ''}`}>
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
                          {product.isHotDeal && (
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-primary text-primary-foreground">
                                Hot Deal
                              </Badge>
                            </div>
                          )}
                          {product.originalPrice && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                              Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className={`space-y-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                          <div>
                            <Link to={`/product/${product.id}`}>
                              <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-2 hover:text-primary cursor-pointer">
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

                          {/* Location & Condition */}
                          <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span>{product.location}</span>
                            <Badge variant="outline" className="capitalize">
                              {product.condition}
                            </Badge>
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
                          <div className="grid grid-cols-3 gap-1">
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

export default CategoryProducts;