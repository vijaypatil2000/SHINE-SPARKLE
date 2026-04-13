import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Search, Filter, LogOut, Package, Tag, IndianRupee, Image as ImageIcon } from 'lucide-react';
import './AdminDashboard.css';
import { products as mockProducts } from '../../data/mockData';

const AdminDashboard = () => {
  const [products, setProducts] = useState(mockProducts);
  const [syncStatus, setSyncStatus] = useState('OFFLINE (LOCAL)');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '', price: '', category: 'NECKLACE', description: '', image: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const categories = ['ALL', 'NECKLACE', 'EARRINGS', 'RINGS', 'BANGLES & BRACELETS', 'SOLITAIRES', 'GIFTS'];

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          setSyncStatus('LIVE (CLOUD SYNC)');
        }
      }
    } catch (err) {
      console.warn('Sync failed. Using professional catalog.');
      setSyncStatus('OFFLINE (LOCAL)');
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (res.ok) {
        setShowAddForm(false);
        setNewProduct({ title: '', price: '', category: 'NECKLACE', description: '', image: '' });
        fetchProducts();
      } else {
        alert('Database is in read-only mode locally. This change will not persist.');
      }
    } catch (err) {
      alert('Local Mode: Additions are temporary until cloud is fixed.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
        if (res.ok) fetchProducts();
        else {
          alert('Local Mode: Deletions are temporary.');
          setProducts(products.filter(p => p.id !== id));
        }
      } catch (err) {
        setProducts(products.filter(p => p.id !== id));
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'NPA@2026') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect Admin Password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-overlay">
        <div className="admin-login-box">
          <h2>SHINE & SPARKLE Access</h2>
          <p>Please enter the boutique management password.</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button type="submit">ENTER DASHBOARD</button>
          </form>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-left">
          <h1>SHINE & SPARKLE Management</h1>
          <span className={`live-badge ${syncStatus.includes('OFFLINE') ? 'offline' : ''}`}>{syncStatus}</span>
        </div>
        <div className="header-right">
          <button className="add-main-btn" onClick={() => setShowAddForm(true)}>
            <Plus size={18} /> ADD NEW PRODUCT
          </button>
          <button className="logout-btn" onClick={() => setIsAuthenticated(false)}>
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <div className="admin-stats">
        <div className="stat-card">
          <Package className="stat-icon" />
          <div className="stat-info">
            <span className="stat-value">{products.length}</span>
            <span className="stat-label">Total Listings</span>
          </div>
        </div>
        <div className="stat-card">
          <Tag className="stat-icon" />
          <div className="stat-info">
            <span className="stat-value">{new Set(products.map(p => p.category)).size}</span>
            <span className="stat-label">Categories</span>
          </div>
        </div>
      </div>

      <div className="admin-controls">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search jewelry catalog..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-group">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-tab ${categoryFilter === cat ? 'active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-product-grid">
        {loading ? (
          <div className="admin-loader">Synchronizing with Cloud Database...</div>
        ) : filteredProducts.map(product => (
          <div key={product.id} className="admin-product-card">
            <div className="admin-card-img">
              <img src={product.image} alt="" />
              <button className="delete-overlay-btn" onClick={() => handleDelete(product.id)}>
                <Trash2 size={16} />
              </button>
            </div>
            <div className="admin-card-info">
              <span className="admin-card-cat">{product.category}</span>
              <h3>{product.title}</h3>
              <p>₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="admin-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add Professional Listing</h2>
              <button className="close-btn" onClick={() => setShowAddForm(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddProduct} className="admin-form">
              <div className="form-grid">
                <div className="form-group">
                  <label><Tag size={14}/> Title</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. Imperial Gold Necklace" 
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label><IndianRupee size={14}/> Price (₹)</label>
                  <input 
                    required 
                    type="number" 
                    placeholder="999" 
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label><ImageIcon size={14}/> Image URL</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="/img/your-image.jpg" 
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    {categories.filter(c => c !== 'ALL').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group full-width">
                <label>Professional Description</label>
                <textarea 
                  required 
                  rows="3" 
                  placeholder="Unique description for the client boutique..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">PUBLISH TO STORE</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
