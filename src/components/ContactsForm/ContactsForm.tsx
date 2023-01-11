/* eslint-disable */
import React, { useState } from 'react';
import { Companies } from '../../types/Companies';
import { Contacts } from '../../types/Contacts';
import { CompaniesSelect } from '../CompaniesSelect';
import './ContactsForm.scss';

type Props = {
  contacts: Contacts[];
  setContacts: React.Dispatch<React.SetStateAction<Contacts[]>>;
  companies: Companies[];
  selectedContactId: number;
  setSelectedContact: React.Dispatch<React.SetStateAction<number | null>>;
};

export const ContactsForm: React.FC<Props> = ({ contacts, setContacts, companies, selectedContactId, setSelectedContact }) => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState(1);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const verifyData = name.trim() && lastname.trim()
    && email.trim()
    && phone.trim()
    && adress.trim()
    && city.trim()
    && country.trim();

    if (verifyData) {
      const newContact: Contacts = {
        id: Number(new Date()),
        name,
        lastname,
        email,
        number: phone,
        adress,
        city,
        country,
        companyId: company,
      }

      setContacts([...contacts, newContact]);
      setSelectedContact(null);
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
        <button type="submit" className="btn btn-success">Add new contact</button>
        <button 
          type="button" 
          className="btn btn-danger"
          onClick={() => setSelectedContact(null)}
        >
          Back
        </button>
      </div>
    </form>
  )
}