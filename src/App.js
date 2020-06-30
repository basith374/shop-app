import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache, ApolloLink } from 'apollo-boost';
import { onError } from 'apollo-link-error';
import { createHttpLink } from "apollo-link-http";
import { AnimatePresence } from 'framer-motion';
import { Provider, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import './App.css';

import store from './store';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Category from './pages/Category';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import Header from './pages/Header';
import Search from './pages/Search2';
import SearchView from './pages/SearchView';
import Address from './pages/Address';
import Login from './pages/Login';
import OrderPlaced from './pages/OrderPlaced';
import Footer from './pages/Footer';
import Account from './pages/Account';
import Addresses from './pages/Addresses';
import Orders from './pages/Orders';

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

function PrivateRoute({ children, ...rest }) {
  const auth = useSelector(state => state.auth);
  return <Route {...rest}
    render={({ location }) => auth ? children : <Redirect to={{ pathname: '/login', state: { from: location }}} />}
    />
}

PrivateRoute.propTypes = {
  children: PropTypes.any,
}

function Content() {
  return <Router>
    <Header />
    <Switch>
      <Route path="/orderplaced">
        <OrderPlaced />
      </Route>
      <Route path="/orders">
        <Orders />
      </Route>
      <Route path="/address/:id">
        <Address />
      </Route>
      <Route path="/addresses">
        <Addresses />
      </Route>
      <Route path="/address">
        <Address />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/searchview/:str">
        <SearchView />
      </Route>
      <Route path="/account">
        <Account />
      </Route>
      <PrivateRoute path="/checkout">
        <Checkout />
      </PrivateRoute>
      <Route path="/product/:id">
        <Product />
      </Route>
      <Route path="/category/:name">
        <Category />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
    <Footer />
  </Router>
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ApolloProvider client={client}>
          <AnimatePresence>
            <Content />
          </AnimatePresence>
        </ApolloProvider>
      </Provider>
    </div>
  );
}

export default App;
