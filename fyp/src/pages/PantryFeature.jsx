import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCartPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { showToast } from '../components/Toast';
import './PantryFeature.css';

const categories = ['Vegetables', 'Fruits', 'Dairy', 'Grains', 'Spices', 'Meat', 'Beverages', 'Other'];
const units = ['kg', 'g', 'liters', 'ml', 'pieces', 'dozen'];

// low stock thresholds based on unit (checked first)
const unitThreshold = {
  kg: 1,
  g: 500,
  liters: 1,
  ml: 500,
  pieces: 3,
  dozen: 0.25
};

// fallback thresholds based on category, used if unit isn't in the list above
const categoryThreshold = {
  Vegetables: 1,
  Fruits: 1,
  Dairy: 0.5,
  Grains: 2,
  Spices: 0.2,
  Meat: 0.5,
  Beverages: 1,
  Other: 0.5
};

const isLowStockItem = (item) => {
  if (unitThreshold[item.unit] !== undefined) {
    return item.quantity < unitThreshold[item.unit];
  }
  if (categoryThreshold[item.category] !== undefined) {
    return item.quantity < categoryThreshold[item.category];
  }
  return item.quantity <= 0.5;
};

// simple local id generator since there's no backend assigning ids anymore
let idCounter = 1;
const generateId = () => `local-${idCounter++}`;

const emptyItem = { name: '', quantity: '', unit: 'kg', category: 'Vegetables' };

const PantryFeature = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([
    { _id: generateId(), name: 'Tomato', quantity: 2, unit: 'kg', category: 'Vegetables' },
    { _id: generateId(), name: 'Milk', quantity: 0.5, unit: 'liters', category: 'Dairy' },
    { _id: generateId(), name: 'Rice', quantity: 3, unit: 'kg', category: 'Grains' },
  ]);
  const [pantryShoppingList, setPantryShoppingList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(emptyItem);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [addingAll, setAddingAll] = useState(false);

  const addToPantryShoppingList = (item) => {
    const alreadyAdded = pantryShoppingList.some((i) => i.name === item.name);
    if (alreadyAdded) return;

    setPantryShoppingList((prev) => [
      ...prev,
      { _id: generateId(), name: item.name, quantity: item.quantity, unit: item.unit, category: item.category }
    ]);
    showToast(`${item.name} added!`, 'success');
  };

  const removeFromPantryShoppingList = (id) => {
    setPantryShoppingList((prev) => prev.filter((i) => i._id !== id));
    showToast('Item removed', 'info');
  };

  const clearPantryShoppingList = () => {
    setPantryShoppingList([]);
    showToast('Shopping list cleared!', 'success');
  };

  // moves everything from the pantry shopping list to the main shopping page,
  // then sends the user there
  const addAllToShoppingAndRedirect = () => {
    if (pantryShoppingList.length === 0) {
      showToast('No items to add!', 'warning');
      return;
    }

    setAddingAll(true);

    // in a real app this is where the items would be posted to the main
    // shopping list; for now we just simulate it and move on
    showToast(`${pantryShoppingList.length} item(s) added to main shopping list!`, 'success');
    clearPantryShoppingList();
    navigate('/smart-shopping');

    setAddingAll(false);
  };

  const handleSaveItem = () => {
    if (!currentItem.name || !currentItem.quantity) {
      showToast('Please fill all fields!', 'warning');
      return;
    }

    const parsedQuantity = parseFloat(currentItem.quantity);

    if (editMode) {
      setItems((prev) =>
        prev.map((item) =>
          item._id === currentItem._id ? { ...item, ...currentItem, quantity: parsedQuantity } : item
        )
      );
      showToast('Updated!', 'success');
    } else {
      setItems((prev) => [...prev, { ...currentItem, _id: generateId(), quantity: parsedQuantity }]);
      showToast('Added!', 'success');
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
    showToast('Item deleted!', 'success');
  };

  const handleEdit = (item) => {
    setCurrentItem({ _id: item._id, name: item.name, quantity: item.quantity, unit: item.unit, category: item.category });
    setEditMode(true);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setCurrentItem(emptyItem);
    setEditMode(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentItem(emptyItem);
  };

  const lowStockItems = items.filter(isLowStockItem);
  const isSearchActive = searchTerm.trim().length > 0;
  const allTabs = ['All', ...categories];

  const tabItems = isSearchActive
    ? items.filter((i) => i.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : activeTab === 'All'
      ? items
      : items.filter((i) => i.category === activeTab);

  const totalItems = items.length;
  const totalCategories = [...new Set(items.map((i) => i.category))].length;

  return (
    <div className="pantry-page">

      {/* Hero banner */}
      <div className="fullscreen-food-image">
        <div className="fullscreen-food-content">
          <h1>Your Smart Kitchen Pantry</h1>
        </div>
      </div>

      <div className="p-hero-section">
        <div className="p-hero-content">
          <h1 className="p-hero-title">Your Pantry Items</h1>
          <p className="p-hero-subtitle">Manage your kitchen inventory efficiently</p>
        </div>
      </div>

      {/* Stats */}
      {items.length > 0 && (
        <div className="stats-section">
          <div className="stat-card">
            <p className="stat-number">{totalItems}</p>
            <p className="stat-label">Total Items</p>
          </div>
          <div className="stat-card low-stock-card">
            <p className="stat-number">{lowStockItems.length}</p>
            <p className="stat-label">Low Stock</p>
          </div>
          <div className="stat-card">
            <p className="stat-number">{totalCategories}</p>
            <p className="stat-label">Categories</p>
          </div>
        </div>
      )}

      {/* Search + add + low stock filter */}
      <div className="top-controls-row">
        <div className="search-add-section">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setActiveTab('All'); }}
            className="search-field-pantry"
          />
          <button className="btn-add-new-item" onClick={handleAddNew}>+ Add New Item</button>
        </div>
        <div className="alert-buttons-group">
          {lowStockItems.length > 0 && (
            <button className="btn-low-stock-filter" onClick={() => setShowLowStockModal(true)}>
              Low Stock ({lowStockItems.length})
            </button>
          )}
        </div>
      </div>

      {/* Shopping list */}
      <div className="shopping-list-section">
        <div className="shopping-list-header">
          <h3 className="shopping-list-title">Shopping List ({pantryShoppingList.length})</h3>
          <div className="shopping-list-actions">
            <button
              className="btn-add-all-to-shopping"
              onClick={addAllToShoppingAndRedirect}
              disabled={addingAll || pantryShoppingList.length === 0}
            >
              {addingAll ? 'Adding...' : 'Add All to Shopping List'}
            </button>
            <button className="btn-clear-shopping-list" onClick={clearPantryShoppingList}>
              Clear All
            </button>
          </div>
        </div>
        <div className="shopping-items-list">
          {pantryShoppingList.length === 0 ? (
            <div className="empty-shopping-message">
              <p>No items. Click Add on items to add.</p>
            </div>
          ) : (
            pantryShoppingList.map((item) => (
              <div key={item._id} className="shopping-list-item">
                <span className="quantity-badge-simple">{item.quantity} {item.unit}</span>
                <h4 className="shopping-item-name">{item.name}</h4>
                <button className="btn-remove-shopping-item" onClick={() => removeFromPantryShoppingList(item._id)}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pantry items */}
      {items.length === 0 ? (
        <div className="p-empty-message">
          <h4>Your pantry is empty</h4>
          <p>Start adding items to your pantry!</p>
          <button className="btn-add-first-item" onClick={handleAddNew}>+ Add First Item</button>
        </div>
      ) : (
        <div className="tabs-wrapper">

          {!isSearchActive && (
            <div className="tabs-nav-bar">
              {allTabs.map((cat) => {
                const count = cat === 'All' ? items.length : items.filter((i) => i.category === cat).length;
                const hasLow = cat !== 'All' && items.some((i) => i.category === cat && isLowStockItem(i));
                const isEmpty = cat !== 'All' && count === 0;
                return (
                  <button
                    key={cat}
                    className={`tab-pill-btn ${activeTab === cat ? 'active' : ''} ${isEmpty ? 'empty-tab' : ''}`}
                    onClick={() => setActiveTab(cat)}
                  >
                    {cat}
                    {hasLow && <span className="tab-low-dot" title="Low stock">●</span>}
                    <span className="tab-count-badge">{count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {isSearchActive && (
            <div className="search-results-label">
              Search Results for "<strong>{searchTerm}</strong>" — {tabItems.length} found
            </div>
          )}

          {tabItems.length === 0 ? (
            <div className="tab-empty-state">
              {isSearchActive ? (
                <p>No items found for "{searchTerm}"</p>
              ) : (
                <>
                  <p className="empty-cat-title">"{activeTab}" category is empty</p>
                  <p className="empty-cat-sub">Add items to this category to see them here.</p>
                  <button
                    className="btn-add-to-cat"
                    onClick={() => {
                      setCurrentItem({ ...emptyItem, category: activeTab === 'All' ? 'Vegetables' : activeTab });
                      setEditMode(false);
                      setShowModal(true);
                    }}
                  >
                    + Add {activeTab === 'All' ? 'Item' : activeTab + ' Item'}
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="tab-items-grid">
              {tabItems.map((item) => {
                const isLowStock = isLowStockItem(item);
                const isInShoppingList = pantryShoppingList.some((i) => i.name === item.name);
                return (
                  <div key={item._id} className={`tab-item-card ${isLowStock ? 'low-stock' : ''}`}>
                    <div className="tab-card-top">
                      <span className={`tab-qty-badge ${isLowStock ? 'low' : ''}`}>
                        {item.quantity} {item.unit}
                      </span>
                      {isLowStock && <span className="low-stock-flag">Low Stock</span>}
                    </div>
                    <h4 className="tab-item-name">{item.name}</h4>
                    <p className="tab-item-cat">{item.category}</p>
                    <div className="tab-card-actions">
                      <button
                        className={`tab-btn-cart ${isInShoppingList ? 'added' : ''}`}
                        onClick={() => addToPantryShoppingList(item)}
                        disabled={isInShoppingList}
                        title="Add to shopping list"
                      >
                        <FaCartPlus />
                      </button>
                      <button className="tab-btn-icon edit" onClick={() => handleEdit(item)} title="Edit item">
                        <FaEdit />
                      </button>
                      <button className="tab-btn-icon del" onClick={() => handleDelete(item._id)} title="Delete item">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Low stock modal */}
      {showLowStockModal && (
        <div className="pantry-modal-overlay" onClick={() => setShowLowStockModal(false)}>
          <div className="pantry-modal low-stock-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pantry-modal-header-custom">
              <h2>Low Stock Items</h2>
              <button className="btn-close-modal" onClick={() => setShowLowStockModal(false)}>×</button>
            </div>
            <div className="pantry-modal-body low-stock-modal-body">
              {lowStockItems.length === 0 ? (
                <p className="low-stock-empty">No low stock items.</p>
              ) : (
                <div className="low-stock-modal-grid">
                  {lowStockItems.map((item) => {
                    const isInShoppingList = pantryShoppingList.some((i) => i.name === item.name);
                    return (
                      <div key={item._id} className="low-stock-modal-card">
                        <div className="modal-card-top">
                          <span className="modal-qty-badge low">{item.quantity} {item.unit}</span>
                          <span className="low-stock-flag-modal">Low Stock</span>
                        </div>
                        <h4 className="modal-item-name">{item.name}</h4>
                        <p className="modal-item-cat">{item.category}</p>
                        <div className="modal-card-actions">
                          <button
                            className={`modal-btn-cart ${isInShoppingList ? 'added' : ''}`}
                            onClick={() => addToPantryShoppingList(item)}
                            disabled={isInShoppingList}
                            title="Add to shopping list"
                          >
                            <FaCartPlus />
                          </button>
                          <button
                            className="modal-btn-icon edit"
                            onClick={() => { handleEdit(item); setShowLowStockModal(false); }}
                            title="Edit item"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="modal-btn-icon del"
                            onClick={() => { handleDelete(item._id); setShowLowStockModal(false); }}
                            title="Delete item"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="pantry-modal-footer">
              <button className="btn-modal-cancel" onClick={() => setShowLowStockModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Add / edit modal */}
      {showModal && (
        <div className="pantry-modal-overlay" onClick={handleCloseModal}>
          <div className="pantry-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pantry-modal-header-custom">
              <h2>{editMode ? 'Edit Item' : 'Add New Item'}</h2>
              <button className="btn-close-modal" onClick={handleCloseModal}>×</button>
            </div>
            <div className="pantry-modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={currentItem.name}
                  onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                  placeholder="e.g., Tomato, Rice, Milk"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={currentItem.category}
                  onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                >
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Unit</label>
                <select
                  value={currentItem.unit}
                  onChange={(e) => setCurrentItem({ ...currentItem, unit: e.target.value })}
                >
                  {units.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  step="any"
                  value={currentItem.quantity}
                  onChange={(e) => setCurrentItem({ ...currentItem, quantity: e.target.value })}
                  placeholder="Enter quantity"
                />
              </div>
            </div>
            <div className="pantry-modal-footer">
              <button className="btn-modal-cancel" onClick={handleCloseModal}>Cancel</button>
              <button className="btn-modal-add" onClick={handleSaveItem}>
                {editMode ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="back-home-container">
        <button className="btn-back-home" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );
};

export default PantryFeature;