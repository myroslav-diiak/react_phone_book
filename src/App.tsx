import React, { useEffect } from 'react';
import { getDataFromServer } from './api/api';
import './App.scss';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { ContactsForm } from './components/ContactsForm';
import { ItemList } from './components/ItemList';
import { QueryType } from './types/QueryType';
import { actions as contactActions } from './features/contacts';
import { actions as companiesActions } from './features/companies';
import { actions as isLoadinActions } from './features/isLoading';
import { CompaniesForm } from './components/CompaniesForm';
import { Header } from './components/Header';

function App() {
  const dispatch = useAppDispatch();

  const selectedContact = useAppSelector(state => state.selectedContact);
  const isCompanyEditting = useAppSelector(state => state.isCompanyEditting);

  const loadData = async(type: QueryType) => {
    try {
      const data = await getDataFromServer(type);

      if (type === QueryType.CONTACTS) {
        dispatch(contactActions.setContacts(data));
      } else {
        dispatch(companiesActions.setCompanies(data));
      }

      dispatch(isLoadinActions.setIsLoading(false));
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    dispatch(isLoadinActions.setIsLoading(true));
    loadData(QueryType.CONTACTS);
    loadData(QueryType.COMPANIES);
  }, [])

  if (selectedContact !== null) {
    return (
      <ContactsForm
        selectedContactId={selectedContact}
      />
    );
  }

  if (isCompanyEditting) {
    return <CompaniesForm />;
  }

  return (
    <div className="App">
      <Header />
      <ItemList />
    </div>
  );
}

export default App;
