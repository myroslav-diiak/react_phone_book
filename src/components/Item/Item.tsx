import React from "react";
import { Companies } from "../../types/Companies";
import { Contacts } from "../../types/Contacts";

type Props = {
  contact: Contacts;
  contacts: Contacts[];
  setContacts: React.Dispatch<React.SetStateAction<Contacts[]>>;
  compamies: Companies[];
}

export const Item: React.FC<Props> = ({ contact, compamies, contacts, setContacts }) => {
  const {name, lastname, adress, city, country, email, number, companyId} = contact;

  const company = compamies.find(item => item.id === companyId);

  const handleRemove = (id: number) => {
    const filteredContacts = contacts.filter(contact => contact.id !== id);

    setContacts(filteredContacts);
  };

  return(
    <tr>
      <td>{name}</td>
      <td>{lastname}</td>
      <td>{adress}</td>
      <td>{city}</td>
      <td>{country}</td>
      <td>{email}</td>
      <td>{number}</td>
      <td>
        <a href={company?.link}>
          {company?.name}
        </a>
      </td>
      <td>
        <button type="button" className="btn btn-warning">Edit</button>
      </td>
      <td>
        <button 
          type="button" 
          className="btn btn-danger"
          onClick={() => handleRemove(contact.id)}
        >
          Remove
        </button>
      </td>
    </tr>
  )
}