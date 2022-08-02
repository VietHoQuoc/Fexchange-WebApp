import currencyReducer from './currencyReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import wishlistReducer from './wishlistReducer';
import compareReducer from './compareReducer';
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { createMultilanguageReducer } from 'redux-multilanguage';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
    multilanguage: createMultilanguageReducer({ currentLanguageCode: 'en' }),
    currencyData: currencyReducer,
    productData: productReducer,
    cartData: cartReducer,
    wishlistData: wishlistReducer,
    compareData: compareReducer,
    authData: authReducer,
    orderId: orderReducer,
});

export default rootReducer;
