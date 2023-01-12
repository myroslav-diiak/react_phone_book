import { applyMiddleware, combineReducers } from 'redux';
import { legacy_createStore as createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import companiesReducer from '../features/companies';
import contactsReducer from '../features/contacts';
import isEdittingCompanyReducer from '../features/isCompanyEditting';
import selectedContactReducer from '../features/selectedContact';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  companies: companiesReducer,
  selectedContact: selectedContactReducer,
  isCompanyEditting: isEdittingCompanyReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;