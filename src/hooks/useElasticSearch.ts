import { useState, useMemo, useCallback } from 'react';
import { Product } from '@/data/mockData';

interface SearchFilters {
  searchTerm: string;
  category: string;
  subcategory: string;
  condition: string;
  location: string;
  priceRange: [number, number];
  sortBy: string;
  isHotDeal: boolean;
  isFeatured: boolean;
  verifiedSellersOnly: boolean;
  dateRange: string;
}

interface SearchResult {
  products: Product[];
  totalCount: number;
  searchTime: number;
  suggestions: string[];
  categories: { [key: string]: number };
  facets: SearchFacets;
}

interface SearchFacets {
  categories: { [key: string]: number };
  conditions: { [key: string]: number };
  locations: { [key: string]: number };
  priceRanges: { [key: string]: number };
}

// Advanced text processing utilities
class TextProcessor {
  private static stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were'
  ]);

  static tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 1 && !this.stopWords.has(token));
  }

  static stemWord(word: string): string {
    // Simple stemming algorithm
    if (word.endsWith('ing')) return word.slice(0, -3);
    if (word.endsWith('ed')) return word.slice(0, -2);
    if (word.endsWith('er')) return word.slice(0, -2);
    if (word.endsWith('est')) return word.slice(0, -3);
    if (word.endsWith('ly')) return word.slice(0, -2);
    if (word.endsWith('s') && word.length > 3) return word.slice(0, -1);
    return word;
  }

  static calculateLevenshteinDistance(a: string, b: string): number {
    const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
    
    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    return matrix[b.length][a.length];
  }

  static calculateJaccardSimilarity(set1: Set<string>, set2: Set<string>): number {
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return union.size === 0 ? 0 : intersection.size / union.size;
  }
}

// TF-IDF Implementation for relevance scoring
class TFIDFCalculator {
  private documentFrequency: Map<string, number> = new Map();
  private totalDocuments: number = 0;

  constructor(products: Product[]) {
    this.buildIndex(products);
  }

  private buildIndex(products: Product[]) {
    this.totalDocuments = products.length;
    const termDocumentCount = new Map<string, Set<string>>();

    products.forEach(product => {
      const text = `${product.title} ${product.description} ${product.category} ${product.subcategory}`;
      const tokens = new Set(TextProcessor.tokenize(text));
      
      tokens.forEach(token => {
        const stemmed = TextProcessor.stemWord(token);
        if (!termDocumentCount.has(stemmed)) {
          termDocumentCount.set(stemmed, new Set());
        }
        termDocumentCount.get(stemmed)!.add(product.id);
      });
    });

    termDocumentCount.forEach((docs, term) => {
      this.documentFrequency.set(term, docs.size);
    });
  }

  calculateTFIDF(product: Product, queryTerms: string[]): number {
    const text = `${product.title} ${product.description} ${product.category} ${product.subcategory}`;
    const tokens = TextProcessor.tokenize(text);
    const termFrequency = new Map<string, number>();

    // Calculate term frequency
    tokens.forEach(token => {
      const stemmed = TextProcessor.stemWord(token);
      termFrequency.set(stemmed, (termFrequency.get(stemmed) || 0) + 1);
    });

    let score = 0;
    queryTerms.forEach(queryTerm => {
      const stemmed = TextProcessor.stemWord(queryTerm);
      const tf = termFrequency.get(stemmed) || 0;
      const df = this.documentFrequency.get(stemmed) || 1;
      const idf = Math.log(this.totalDocuments / df);
      score += tf * idf;
    });

    return score;
  }
}

export const useElasticSearch = (allProducts: Product[]) => {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    category: 'all',
    subcategory: 'all',
    condition: 'all',
    location: 'all',
    priceRange: [0, 5000000],
    sortBy: 'relevance',
    isHotDeal: false,
    isFeatured: false,
    verifiedSellersOnly: false,
    dateRange: 'all'
  });

  // Initialize TF-IDF calculator
  const tfidfCalculator = useMemo(() => new TFIDFCalculator(allProducts), [allProducts]);

  // Advanced search with multiple algorithms
  const searchResults = useMemo((): SearchResult => {
    const startTime = performance.now();
    
    // If no search criteria, return recent products
    if (!filters.searchTerm && filters.category === 'all' && !filters.isHotDeal && !filters.isFeatured) {
      const recentProducts = allProducts
        .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        .slice(0, 20);
      
      return {
        products: recentProducts,
        totalCount: allProducts.length,
        searchTime: 0,
        suggestions: [],
        categories: {},
        facets: generateFacets(recentProducts)
      };
    }

    const queryTerms = TextProcessor.tokenize(filters.searchTerm);
    const querySet = new Set(queryTerms.map(term => TextProcessor.stemWord(term)));

    // Calculate comprehensive relevance scores
    const scoredProducts = allProducts.map(product => {
      let score = 0;
      
      // 1. TF-IDF Score (30% weight)
      const tfidfScore = tfidfCalculator.calculateTFIDF(product, queryTerms);
      score += tfidfScore * 0.3;

      // 2. Exact Match Scoring (25% weight)
      const productText = `${product.title} ${product.description}`.toLowerCase();
      if (filters.searchTerm && productText.includes(filters.searchTerm.toLowerCase())) {
        score += 100 * 0.25;
      }

      // 3. Field-specific scoring (20% weight)
      const titleTokens = new Set(TextProcessor.tokenize(product.title).map(t => TextProcessor.stemWord(t)));
      const descTokens = new Set(TextProcessor.tokenize(product.description).map(t => TextProcessor.stemWord(t)));
      const categoryTokens = new Set(TextProcessor.tokenize(`${product.category} ${product.subcategory}`).map(t => TextProcessor.stemWord(t)));

      const titleSimilarity = TextProcessor.calculateJaccardSimilarity(querySet, titleTokens);
      const descSimilarity = TextProcessor.calculateJaccardSimilarity(querySet, descTokens);
      const categorySimilarity = TextProcessor.calculateJaccardSimilarity(querySet, categoryTokens);

      score += (titleSimilarity * 80 + descSimilarity * 40 + categorySimilarity * 60) * 0.2;

      // 4. Fuzzy matching for typos (10% weight)
      queryTerms.forEach(queryTerm => {
        const titleWords = TextProcessor.tokenize(product.title);
        const bestMatch = titleWords.reduce((best, word) => {
          const distance = TextProcessor.calculateLevenshteinDistance(queryTerm, word);
          const similarity = 1 - (distance / Math.max(queryTerm.length, word.length));
          return Math.max(best, similarity);
        }, 0);
        
        if (bestMatch > 0.7) {
          score += bestMatch * 30 * 0.1;
        }
      });

      // 5. Quality signals (15% weight)
      if (product.seller.verified) score += 15 * 0.15;
      if (product.isHotDeal) score += 20 * 0.15;
      if (product.featured) score += 10 * 0.15;
      if (product.images.length > 1) score += 5 * 0.15;

      // 6. Recency boost
      const daysSinceAdded = Math.floor((Date.now() - new Date(product.dateAdded).getTime()) / (1000 * 60 * 60 * 24));
      if (daysSinceAdded <= 1) score += 10;
      else if (daysSinceAdded <= 7) score += 5;
      else if (daysSinceAdded <= 30) score += 2;

      return { ...product, relevanceScore: score };
    });

    // Apply filters
    let filteredProducts = scoredProducts.filter(product => {
      // Search relevance threshold
      if (filters.searchTerm && product.relevanceScore < 1) {
        return false;
      }

      // Category filters
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }
      if (filters.subcategory !== 'all' && product.subcategory !== filters.subcategory) {
        return false;
      }

      // Other filters
      if (filters.condition !== 'all' && product.condition !== filters.condition) {
        return false;
      }
      if (filters.location !== 'all' && !product.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      if (filters.isHotDeal && !product.isHotDeal) {
        return false;
      }
      if (filters.isFeatured && !product.featured) {
        return false;
      }
      if (filters.verifiedSellersOnly && !product.seller.verified) {
        return false;
      }

      // Date range filter
      if (filters.dateRange !== 'all') {
        const productDate = new Date(product.dateAdded);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - productDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (filters.dateRange) {
          case 'today':
            if (daysDiff > 1) return false;
            break;
          case 'week':
            if (daysDiff > 7) return false;
            break;
          case 'month':
            if (daysDiff > 30) return false;
            break;
        }
      }

      return true;
    });

    // Advanced sorting algorithms
    switch (filters.sortBy) {
      case 'relevance':
        filteredProducts.sort((a, b) => b.relevanceScore - a.relevanceScore);
        break;
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case 'oldest':
        filteredProducts.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
        break;
      case 'alphabetical':
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'discount':
        filteredProducts.sort((a, b) => {
          const aDiscount = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0;
          const bDiscount = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0;
          return bDiscount - aDiscount;
        });
        break;
      case 'popularity':
        // Simulate popularity based on multiple factors
        filteredProducts.sort((a, b) => {
          const aPopularity = (a.seller.verified ? 10 : 0) + (a.isHotDeal ? 15 : 0) + (a.featured ? 8 : 0);
          const bPopularity = (b.seller.verified ? 10 : 0) + (b.isHotDeal ? 15 : 0) + (b.featured ? 8 : 0);
          return bPopularity - aPopularity;
        });
        break;
    }

    // Generate intelligent suggestions
    const suggestions = generateIntelligentSuggestions(filters.searchTerm, allProducts, filteredProducts);

    // Generate category breakdown
    const categories = filteredProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const endTime = performance.now();
    
    return {
      products: filteredProducts,
      totalCount: filteredProducts.length,
      searchTime: Math.round(endTime - startTime),
      suggestions,
      categories,
      facets: generateFacets(filteredProducts)
    };
  }, [allProducts, filters, tfidfCalculator]);

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      searchTerm: '',
      category: 'all',
      subcategory: 'all',
      condition: 'all',
      location: 'all',
      priceRange: [0, 5000000],
      sortBy: 'relevance',
      isHotDeal: false,
      isFeatured: false,
      verifiedSellersOnly: false,
      dateRange: 'all'
    });
  }, []);

  const getAutocompleteSuggestions = useCallback((query: string): string[] => {
    if (!query || query.length < 2) return [];

    const suggestions = new Set<string>();
    const queryLower = query.toLowerCase();

    allProducts.forEach(product => {
      // Title suggestions
      if (product.title.toLowerCase().includes(queryLower)) {
        suggestions.add(product.title);
      }

      // Category suggestions
      if (product.category.toLowerCase().includes(queryLower)) {
        suggestions.add(product.category);
      }

      // Subcategory suggestions
      if (product.subcategory.toLowerCase().includes(queryLower)) {
        suggestions.add(product.subcategory);
      }

      // Brand/seller suggestions
      if (product.seller.name.toLowerCase().includes(queryLower)) {
        suggestions.add(product.seller.name);
      }
    });

    return Array.from(suggestions).slice(0, 8);
  }, [allProducts]);

  return {
    filters,
    searchResults,
    updateFilters,
    clearFilters,
    getAutocompleteSuggestions
  };
};

// Helper functions
function generateIntelligentSuggestions(searchTerm: string, allProducts: Product[], filteredProducts: Product[]): string[] {
  if (!searchTerm || searchTerm.length < 2) return [];

  const suggestions = new Set<string>();
  const queryTokens = TextProcessor.tokenize(searchTerm);

  // If no results, suggest similar terms
  if (filteredProducts.length === 0) {
    allProducts.forEach(product => {
      const productTokens = TextProcessor.tokenize(product.title);
      productTokens.forEach(token => {
        queryTokens.forEach(queryToken => {
          const distance = TextProcessor.calculateLevenshteinDistance(queryToken, token);
          if (distance <= 2 && token.length > 3) {
            suggestions.add(token);
          }
        });
      });
    });
  } else {
    // Suggest related terms from successful results
    filteredProducts.slice(0, 10).forEach(product => {
      const tokens = TextProcessor.tokenize(`${product.title} ${product.category} ${product.subcategory}`);
      tokens.forEach(token => {
        if (!queryTokens.includes(token) && token.length > 3) {
          suggestions.add(token);
        }
      });
    });
  }

  return Array.from(suggestions).slice(0, 6);
}

function generateFacets(products: Product[]): SearchFacets {
  const facets: SearchFacets = {
    categories: {},
    conditions: {},
    locations: {},
    priceRanges: {
      'Under KSh 10,000': 0,
      'KSh 10,000 - 50,000': 0,
      'KSh 50,000 - 100,000': 0,
      'KSh 100,000 - 500,000': 0,
      'Over KSh 500,000': 0
    }
  };

  products.forEach(product => {
    // Categories
    facets.categories[product.category] = (facets.categories[product.category] || 0) + 1;
    
    // Conditions
    facets.conditions[product.condition] = (facets.conditions[product.condition] || 0) + 1;
    
    // Locations
    const city = product.location.split(',')[0].trim();
    facets.locations[city] = (facets.locations[city] || 0) + 1;
    
    // Price ranges
    if (product.price < 10000) {
      facets.priceRanges['Under KSh 10,000']++;
    } else if (product.price < 50000) {
      facets.priceRanges['KSh 10,000 - 50,000']++;
    } else if (product.price < 100000) {
      facets.priceRanges['KSh 50,000 - 100,000']++;
    } else if (product.price < 500000) {
      facets.priceRanges['KSh 100,000 - 500,000']++;
    } else {
      facets.priceRanges['Over KSh 500,000']++;
    }
  });

  return facets;
}

export default useElasticSearch;