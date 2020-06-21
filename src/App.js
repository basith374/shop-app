import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Category from './pages/Category';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import Header from './pages/Header';

function App() {
  return (
    <div className="App">
      <AnimatePresence>
        <Router>
          <Header />
          <Switch>
            <Route path="/checkout">
              <Checkout />
            </Route>
            <Route path="/product">
              <Product />
            </Route>
            <Route path="/category">
              <Category />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </AnimatePresence>
    </div>
  );
}

export default App;
