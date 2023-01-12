import React, { useEffect } from 'react';
import { getDataFromServer } from './api/api';
import './App.scss';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { ContactsForm } from './components/ContactsForm';
import { ItemList } from './components/ItemList';
import { QueryType } from './types/QueryType';
import { actions as contactActions } from './features/contacts';
import { actions as companiesActions } from './features/companies';
import { actions as selectedContactActions } from './features/selectedContact';
import { actions as isCompanyEdittingActions } from './features/isCompanyEditting';
import { CompaniesForm } from './components/CompaniesForm';

function App() {
  const dispatch = useAppDispatch();

  const selectedContact = useAppSelector(state => state.selectedContact);
  const isCompanyEditting = useAppSelector(state => state.isCompanyEditting);

  const addButtonHandler = () => {
    dispatch(selectedContactActions.setContact(0));
  }

  const editCompanyHandler = () => {
    dispatch(isCompanyEdittingActions.setIsEdittingCompany(true));
  }

  const loadData = async(type: QueryType) => {
    try {
      const data = await getDataFromServer(type);

      if (type === QueryType.CONTACTS) {
        dispatch(contactActions.setContacts(data));
      } else {
        dispatch(companiesActions.setCompanies(data));
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
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
      <button 
        type="button" 
        className="btn btn-success"
        onClick={() => addButtonHandler()}
      >
        Add Contact
      </button>
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => editCompanyHandler()}
      >
        Add/Edit companies
      </button>

      <ItemList />
    </div>
  );
}

export default App;
