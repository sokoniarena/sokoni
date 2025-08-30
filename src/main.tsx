import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './pages/Index.tsx'
import HotDeals from './pages/HotDeals.tsx'
import SearchPage from './pages/Search.tsx'
import CategoryProducts from './pages/CategoryProducts.tsx'
import ProductDetail from './pages/ProductDetail.tsx'
import EventDetail from './pages/EventDetail.tsx'
import EventListing from './pages/EventListing.tsx'
import ProductListing from './pages/ProductListing.tsx'
import AllListings from './pages/AllListings.tsx'
import NotFound from './pages/NotFound.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/hot-deals" element={<HotDeals />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/category/:categoryId" element={<CategoryProducts />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/event/:eventId" element={<EventDetail />} />
      <Route path="/list-event" element={<EventListing />} />
      <Route path="/list-product" element={<ProductListing />} />
      <Route path="/all-listings" element={<AllListings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);
