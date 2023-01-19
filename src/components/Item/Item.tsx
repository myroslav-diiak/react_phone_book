import React from "react";
import { deleteItemFromServer, getDataFromServer } from "../../api/api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Companies } from "../../types/Companies";
import { Contacts } from "../../types/Contacts";
import { QueryType } from "../../types/QueryType";
import { actions as contactActions } from '../../features/contacts';
import { actions as selectedContactActions } from '../../features/selectedContact';
import { ListContent } from "../../types/ListContent";

type Props = {
  contact?: Contacts | null;
  company?: Companies | null;
}

export const Item: React.FC<Props> = ({ contact, company }) => {
  const dispatch = useAppDispatch();
  const companies: Companies[] = useAppSelector(state => state.companies);
  
  const currentCompany = companies.find(item => item.id === contact?.companyid);

  const loadContacts = async() => {
    try {
      const data = await getDataFromServer(QueryType.CONTACTS);

      dispatch(contactActions.setContacts(data));
    } catch(err) {
      console.log(err)
    }
  };

  const handleContactEdit = (id: number) => {
    dispatch(selectedContactActions.setContact(id));
  }

  const handleContactRemove = async(id: number) => {
    try {
      await deleteItemFromServer(QueryType.CONTACTS, id);
      
      loadContacts();
    } catch(err) {
      console.log(err);
    }
  };

  if (contact) {
    return (
      <tr>
        <td>{contact.name}</td>
        <td>{contact.lastname}</td>
        <td>{contact.adress}</td>
        <td>{contact.city}</td>
        <td>{contact.country}</td>
        <td>{contact.email}</td>
        <td>{contact.number}</td>
        <td>
          <a href={currentCompany?.link}>
            {currentCompany?.name}
          </a>
        </td>
        <td>
          <button 
            type="button" 
            className="btn btn-warning"
            onClick={() => handleContactEdit(contact.id)}
          >
            Edit
          </button>
        </td>
        <td>
          <button 
            type="button" 
            className="btn btn-danger"
            onClick={() => handleContactRemove(contact.id)}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  }

  if (company) {
    return (
      <tr>
        <td><img className="company-logo" src="" /></td>
        <td>
        <a href={company.link}>{company.name}</a>
        </td>
        <td>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => {return}}
          >
            Staff
          </button>
        </td>
        <td>
          <button 
            type="button" 
            className="btn btn-warning"
            onClick={() => {return}}
          >
            Edit
          </button>
        </td>
        <td>
          <button 
            type="button" 
            className="btn btn-danger"
            onClick={() => {return}}
          >
            Remove
          </button>
        </td>
      </tr>
    )
  }

  return <></>;
}