import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from "apollo-link-http";
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import './App.css';

import store from './store';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Category from './pages/Category';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import Header from './pages/Header';
import Search from './pages/Search';

const client = new ApolloClient({
  link: createHttpLink({ uri: process.env.REACT_APP_API_URL }),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ApolloProvider client={client}>
          <AnimatePresence>
            <Router>
              <Header />
              <Switch>
                <Route path="/search">
                  <Search />
                </Route>
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
        </ApolloProvider>
      </Provider>
    </div>
  );
}

export default App;
