import React, { useEffect, useState } from 'react';
import { getDataFromServer } from './api/api';
import './App.scss';
import { useAppDispatch } from './app/hooks';
import { ContactsForm } from './components/ContactsForm';
import { ItemList } from './components/ItemList';
import { Companies } from './types/Companies';
import { Contacts } from './types/Contacts';
import { QueryType } from './types/QueryType';
import { actions as contactActions } from './features/contacts';
/* eslint-disable */
function App() {
  const dispatch = useAppDispatch();
  const [companies, setCompanies] = useState<Companies[]>([]);
  const [contacts, setContacts] = useState<Contacts[]>([]);
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async(type: QueryType) => {
    setIsLoading(true);

    try {
      const data = await getDataFromServer(type);

      dispatch(contactActions.setContacts(data));
      setIsLoading(false);
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadData(QueryType.CONTACTS);
  }, [])

  if (selectedContact !== null) {
    return (
      <ContactsForm
        contacts={contacts}
        setContacts={setContacts}
        companies={companies}
        selectedContactId={selectedContact}
        setSelectedContact={setSelectedContact}
      />
    );
  }

  return (
    <div className="App">
      <button 
        type="button" 
        className="btn btn-success"
        onClick={() => setSelectedContact(0)}
      >
        Add Contact
      </button>
      <ItemList
        companies={companies} 
        setContacts={setContacts}
      />
    </div>
  );
}

export default App;
