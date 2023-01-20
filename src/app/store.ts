import { applyMiddleware, combineReducers } from 'redux';
import { legacy_createStore as createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import companiesReducer from '../features/companies';
import contactsReducer from '../features/contacts';
import isLoadingReducer from '../features/isLoading';
import listContentReducer from '../features/listContent';
import selectedCompanyReducer from '../features/selectedCompany';
import selectedContactReducer from '../features/selectedContact';
import selectedStaffReducer from '../features/selectedStaff';
import sortDirectionReducer from '../features/sortDirection';
import sortTypeReducer from '../features/sortType';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  companies: companiesReducer,
  selectedContact: selectedContactReducer,
  sortType: sortTypeReducer,
  sortDirection: sortDirectionReducer,
  listContent: listContentReducer,
  isLoading: isLoadingReducer,
  selectedCompany: selectedCompanyReducer,
  selectedStaff: selectedStaffReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;