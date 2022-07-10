import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import { authReducer } from './reducers/authReducer'
import { cartReducer } from './reducers/cartReducer'
import { dataReducer } from './reducers/dataReducer'
import { dataUserReducer } from './reducers/dataUserReducer'
import { ordersReducer } from './reducers/ordersReducer'
import { uiReducer } from './reducers/uiReducer'

const reducers = combineReducers({
  auth: authReducer,
  data: dataReducer,
  ui: uiReducer,
  cart: cartReducer,
  dataUser: dataUserReducer,
  orders: ordersReducer,
})

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
)
