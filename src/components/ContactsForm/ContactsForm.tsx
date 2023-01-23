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
  const [validate, setValidate] = useState<string[]>([]);
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
  }, [selectedContactId]);

  const handleBackButton = () => {
    dispatch(selectedContactActions.removeContact());
  };

  const validateData = () => {
    const errors = [];
    const stringFormat = /^([a-zA-Z ]){2,30}$/;
    /* eslint-disable */
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const numberFormat = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    /* eslint-enable */
    const adressFormat = /^[a-zA-Z0-9\s,'-]*$/;

    const validName = stringFormat.test(name);
    const validLastname = lastname.match(stringFormat);
    const validEmail = email.match(emailFormat);
    const validNumber = phone.match(numberFormat);
    const validAdress = adress.match(adressFormat);
    const validCity = city.match(stringFormat);
    const validCountry = country.match(stringFormat);

    !validName && errors.push('name');
    !validLastname && errors.push('lastname');
    !validEmail && errors.push('email');
    !validNumber && errors.push('number');
    !validAdress && errors.push('adress');
    !validCity && errors.push('city');
    !validCountry && errors.push('country');

    return errors;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setValidate(validateData());

    if (!validateData().length) {
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
      <div className="mb-2">
        <label className="form-label">Name</label>
        <input 
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text" 
          className="form-control"  
        />
        <div className="form-text">
          {validate.includes('name') && 'Enter your correct name'}
        </div>
      </div>

      <div className="mb-2">
        <label className="form-label">Lastname</label>
        <input 
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
          type="text" 
          className="form-control"  
        />
        <div className="form-text">
          {validate.includes('lastname') && 'Enter your correct lastname'}
        </div>
      </div>

      <div className="mb-2">
        <label className="form-label">Email</label>
        <input 
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email" 
          className="form-control"  
        />
        <div className="form-text"> 
          {validate.includes('email') && 'Enter your correct email'}
        </div>
      </div>

      <div className="mb-2">
        <label className="form-label">Phone number</label>
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          type="tel"
          className="form-control"
          
        />
        <div className="form-text">
          {validate.includes('number') && `Enter your phone in format '123-456-7890', '1234567890'`}
        </div>
      </div>

      <div className="mb-2">
          <label className="form-label">Adress</label>
          <input 
            value={adress}
            onChange={(event) => setAdress(event.target.value)}
            type="text" 
            className="form-control"  
          />
        <div className="form-text">
            {validate.includes('adress') && 'Enter your correct adress'}
        </div>
      </div>

      <div className="mb-2">
        <label className="form-label">City</label>
        <input 
          value={city}
          onChange={(event) => setCity(event.target.value)}
          type="text" 
          className="form-control"  
        />
        <div className="form-text">
          {validate.includes('city') && 'Enter your correct city'}
        </div>
      </div>

      <div className="mb-2">
          <label className="form-label">Country</label>
          <input 
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            type="text" 
            className="form-control"  
          />
        <div className="form-text">
          {validate.includes('country') && 'Enter your correct country'}
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