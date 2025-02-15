import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainHeader from './common/MainHeader';
import MainNavbar from './common/MainNavbar';
import MainFooter from './common/MainFooter';

import Home from './pages/Home';
import Investments from './pages/Investments';
import Suppliers from './pages/Suppliers';
import Store from './pages/Store';
import Employees from './pages/Employees';
import Customers from './pages/Customers';
import Cart from './pages/Cart';
import DetailsProduct from './pages/DetailsProduct';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Directors from './pages/Directors';
import SelectedSuppliers from './pages/SelectedSuppliers';


function App() {

  return (
    <>
      <BrowserRouter>

        <MainHeader />
        <MainNavbar />

          <main id="main-content">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/store" element={<Store />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/detailsProduct/:productId" element={<DetailsProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/directors" element={<Directors />} />
              <Route path="/selectedSuppliers" element={<SelectedSuppliers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

        <MainFooter />

      </BrowserRouter>
    </>
  )

}

export default App;