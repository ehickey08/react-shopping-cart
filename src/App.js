import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import {ProductContext} from './contexts/ProductContext'
import {CartContext} from './contexts/CartContext'
import useLocalStorage from './hooks/useLocalStorage'

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useLocalStorage('cart', []);

	const addItem = item => {
		setCart([...cart, item]);
	};

    const deleteItem = id => {
        const newCart = cart.filter(item => item.id !== id )
        setCart([...newCart])
    }
	return (
        <ProductContext.Provider value={{products, addItem}}>
            <CartContext.Provider value={{cart, deleteItem}}>
		        <div className="App">
			        <Navigation />

			        {/* Routes */}
			        <Route
				        exact
				        path="/"
				        render={() => <Products/>}
			        />

			        <Route
				        path="/cart"
				        render={() => <ShoppingCart />}
			        />
		        </div>
            </CartContext.Provider>
        </ProductContext.Provider>
	);
}

export default App;
