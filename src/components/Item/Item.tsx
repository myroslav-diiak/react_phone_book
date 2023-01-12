import React from "react";
import { deleteItemFromServer, getDataFromServer } from "../../api/api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Companies } from "../../types/Companies";
import { Contacts } from "../../types/Contacts";
import { QueryType } from "../../types/QueryType";
import { actions as contactActions } from '../../features/contacts';
import { actions as selectedContactActions } from '../../features/selectedContact';

type Props = {
  contact: Contacts;
}

export const Item: React.FC<Props> = ({ contact }) => {
  const dispatch = useAppDispatch();
  const companies: Companies[] = useAppSelector(state => state.companies);

  const {id, name, lastname, adress, city, country, email, number, companyid} = contact;

  const company = companies.find(item => item.id === companyid);

  const loadContacts = async() => {
    try {
      const data = await getDataFromServer(QueryType.CONTACTS);

      dispatch(contactActions.setContacts(data));
    } catch(err) {
      console.log(err)
    }
  };

  const handleEdit = (id: number) => {
    dispatch(selectedContactActions.setContact(id));
  }

  const handleRemove = async(id: number) => {
    try {
      await deleteItemFromServer(QueryType.CONTACTS, id);
      
      loadContacts();
    } catch(err) {
      console.log(err);
    }
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
        <button 
          type="button" 
          className="btn btn-warning"
          onClick={() => handleEdit(id)}
        >
          Edit
        </button>
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