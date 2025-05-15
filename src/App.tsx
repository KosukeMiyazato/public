import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import RestaurantDetailsPage from './pages/RestaurantDetailsPage';
import AddRestaurantPage from './pages/AddRestaurantPage';
import EditRestaurantPage from './pages/EditRestaurantPage';
import { RestaurantProvider } from './contexts/RestaurantContext';

function App() {
  return (
    <RestaurantProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
            <Route path="/add" element={<AddRestaurantPage />} />
            <Route path="/edit/:id" element={<EditRestaurantPage />} />
          </Routes>
        </Layout>
      </Router>
    </RestaurantProvider>
  );
}

export default App;