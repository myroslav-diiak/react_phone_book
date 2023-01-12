import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Companies } from '../../types/Companies';
import { Contacts } from '../../types/Contacts';
import { CompaniesSelect } from '../CompaniesSelect';
import { actions as selectedContactActions } from '../../features/selectedContact';
import './ContactsForm.scss';
import { createNewContact, getDataFromServer, updateContactOnServer } from '../../api/api';
import { QueryType } from '../../types/QueryType';
import { actions as contactActions } from '../../features/contacts';

type Props = {
  selectedContactId: number;
};

export const ContactsForm: React.FC<Props> = ({ selectedContactId }) => {
  const dispatch = useAppDispatch();

  const contacts: Contacts[] = useAppSelector(state => state.contacts);
  const companies: Companies[] = useAppSelector(state => state.companies);

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState(1);

  useEffect(() => {
    if (selectedContactId > 0) {
      const selectedContact = contacts.find(contact => contact.id === selectedContactId);
  
      if (selectedContact) {
        setName(selectedContact.name);
        setLastname(selectedContact.lastname);
        setEmail(selectedContact.email);
        setPhone(selectedContact.number);
        setAdress(selectedContact.adress);
        setCity(selectedContact.city);
        setCountry(selectedContact.country);
        setCompany(selectedContact.companyid);
      }
    }
  }, [selectedContactId])

  const handleBackButton = () => {
    dispatch(selectedContactActions.removeContact());
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const verifyData = name.trim() && lastname.trim()
    && email.trim()
    && phone.trim()
    && adress.trim()
    && city.trim()
    && country.trim();

    if (verifyData) {
      const id = selectedContactId > 0
        ? selectedContactId
        : Math.max(...contacts.map(item => item.id)) + 1;

      const newContact: Contacts = {
        id,
        name,
        lastname,
        email,
        number: phone,
        adress,
        city,
        country,
        companyid: company,
      }

      if (selectedContactId === 0) {
        createContact(newContact);
      } else {
        updateContact(newContact);
      }

      dispatch(selectedContactActions.removeContact());
    }
  };

  const updateContact = async(updatedContact: Contacts) => {
    try {
      await updateContactOnServer(updatedContact, updatedContact.id);

      loadContacts();
    } catch(err) {
      console.log(err);
    }
  }

  const createContact = async(newContact: Contacts) => {
    try {
      await createNewContact(newContact);

      loadContacts();
    } catch(err) {
      console.log(err);
    }
  };

  const loadContacts = async() => {
    try {
      const data = await getDataFromServer(QueryType.CONTACTS);

      dispatch(contactActions.setContacts(data));
    } catch(err) {
      console.log(err)
    }
  };

  return (
    <form className='form' onSubmit={(event) => handleSubmit(event)}>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label className="col-form-label">Name</label>
        </div>
        <div className="col-auto">
          <input 
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text" 
            className="form-control" 
            required 
          />
        </div>
        <div className="col-auto">
          <span className="form-text">
            Enter your name
          </span>
        </div>
      </div>

      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label className="col-form-label">Lastname</label>
        </div>
        <div className="col-auto">
          <input 
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
            type="text" 
            className="form-control" 
            required 
          />
        </div>
        <div className="col-auto">
          <span className="form-text">
            Enter your lastname
          </span>
        </div>
      </div>

      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label className="col-form-label">Email</label>
        </div>
        <div className="col-auto">
          <input 
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email" 
            className="form-control" 
            required 
          />
        </div>
        <div className="col-auto">
          <span className="form-text">
            Enter your email
          </span>
        </div>
      </div>

      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label className="col-form-label">Phone number</label>
        </div>
        <div className="col-auto">
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            type="tel"
            className="form-control"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
        </div>
        <div className="col-auto">
          <span className="form-text">
            In format &apos;123-456-7890&apos;
          </span>
        </div>
      </div>

      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label className="col-form-label">Adress</label>
        </div>
        <div className="col-auto">
          <input 
            value={adress}
            onChange={(event) => setAdress(event.target.value)}
            type="text" 
            className="form-control" 
            required 
          />
        </div>
        <div className="col-auto">
          <span className="form-text">
            Enter your adress
          </span>
        </div>
      </div>

      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label className="col-form-label">City</label>
        </div>
        <div className="col-auto">
          <input 
            value={city}
            onChange={(event) => setCity(event.target.value)}
            type="text" 
            className="form-control" 
            required 
          />
        </div>
        <div className="col-auto">
          <span className="form-text">
            Enter your city
          </span>
        </div>
      </div>

      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label className="col-form-label">Country</label>
        </div>
        <div className="col-auto">
          <input 
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            type="text" 
            className="form-control" 
            required 
          />
        </div>
        <div className="col-auto">
          <span className="form-text">
            Enter your country
          </span>
        </div>
      </div>

      <CompaniesSelect 
        companies={companies}
        company={company}
        setCompany={setCompany}
      />

      <div className="button-container">
        <button type="submit" className="btn btn-success">
          {selectedContactId === 0 
          ? 'Add new contact'
          : 'Edit contact'}
        </button>
        <button 
          type="button" 
          className="btn btn-danger"
          onClick={() => handleBackButton()}
        >
          Back
        </button>
      </div>
    </form>
  )
}