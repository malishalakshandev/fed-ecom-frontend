import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux';
import { store } from './lib/store';

import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from './pages/home.page';
import SignUpPage from './pages/sign-up.page';
import SignInPage from './pages/sign-in.page';
import ShopPage from './pages/shop.page';
import CartPage from './pages/cart.page';
import CheckoutPage from './pages/checkout.page';
import RootLayout from './layouts/root.layout';

import UseEffect from './playground/UseEffect';

import { ClerkProvider } from '@clerk/clerk-react'
import ProtectedLayout from './layouts/protected.layout';
import CreateProductPage from './pages/create-product.page';
import AdminProtectedLayout from './layouts/admin-protected.layout';
import PaymentPage from './pages/payment.page';
import { Toaster } from 'react-hot-toast';


// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>

            <Route element={<RootLayout />}>
              
              <Route path="/" element={<HomePage />} />
              
              <Route path="/shop">

                <Route index element={<ShopPage />} />
                
                <Route path=":categorySlug" element={<ShopPage />} />
                
                <Route path="cart" element={<CartPage />} />
                
                <Route element={<ProtectedLayout />}>
                  <Route path="checkout" element={<CheckoutPage />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                  <Route path="payment" element={<PaymentPage />} />
                </Route>

              </Route>
              
              <Route element={<ProtectedLayout />}>
                <Route element={<AdminProtectedLayout />}>
                  <Route path="admin/products/create" element={<CreateProductPage />} />
                </Route>
              </Route>

            </Route>
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />

            <Route path='/playground/use-effect-a' element={<UseEffect />}/>

          </Routes>
        </BrowserRouter>
         <Toaster position='bottom-center' />
      </Provider>
    </ClerkProvider>

  </StrictMode>
)
