import React, { useState } from 'react';
import Categories from './Categories';
import Menu from './Menu';
import items from './data';
import './App.css';

const allCategoires = ['all', ...new Set(items.map((item) => item.category))]

function App() {

  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategoires);


  const filterItems = (category) => {
    if (category === 'all') {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category)
    setMenuItems(newItems);
  }

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>Our Menu</h2>
          <div className="underline"></div>
        </div>

        <Categories allCategories={categories} filterButtons={filterItems} />
        <Menu items={menuItems} />

      </section>

    </main>
  );
}

export default App;
