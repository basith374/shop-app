import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache, ApolloLink } from 'apollo-boost';
import { onError } from 'apollo-link-error';
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
import Address from './pages/Address';
import Login from './pages/Login';
import OrderPlaced from './pages/OrderPlaced';

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || null,
    }
  }));
  return forward(operation);
})

const logoutLink = onError(err => {
  if (err.networkError && err.networkError.statusCode === 400) {
    // setAuth(false);
    // localStorage.removeItem('token');
    // localStorage.removeItem('username');
  }
})

const httpLink = createHttpLink({ uri: process.env.REACT_APP_API_URL });

const client = new ApolloClient({
  link: ApolloLink.from([authMiddleware, logoutLink, httpLink]),
  cache: new InMemoryCache(),
})

function AuthPage() {
  return <Router>
    <Header />
    <Switch>
      <Route path="/orderplaced">
        <OrderPlaced />
      </Route>
      <Route path="/address/:id/delete?">
        <Address />
      </Route>
      <Route path="/address">
        <Address />
      </Route>
      <Route path="/search/:str">
        <Search />
      </Route>
      <Route path="/checkout">
        <Checkout />
      </Route>
      <Route path="/product/:id">
        <Product />
      </Route>
      <Route path="/category/:name">
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
}

function App() {
  const [auth, setAuth] = useState(localStorage.getItem('token') ? true : false);
  const onLogin = (auth) => {
    setAuth(auth);
  }
  const render = () => {
    return auth ? <AuthPage /> : <Login onLogin={onLogin} />
  }
  return (
    <div className="App">
      <Provider store={store}>
        <ApolloProvider client={client}>
          <AnimatePresence>
            {render()}
          </AnimatePresence>
        </ApolloProvider>
      </Provider>
    </div>
  );
}

export default App;
