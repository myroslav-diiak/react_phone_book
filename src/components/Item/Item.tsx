import React from "react";
import './Item.scss';
import { deleteItemFromServer, getDataFromServer } from "../../api/api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Companies } from "../../types/Companies";
import { Contacts } from "../../types/Contacts";
import { QueryType } from "../../types/QueryType";
import { actions as contactActions } from '../../features/contacts';
import { actions as companyActions } from '../../features/companies';
import { actions as selectedContactActions } from '../../features/selectedContact';
import { actions as selectedCompanyActions } from '../../features/selectedCompany';
import { actions as selectedStaffActions } from '../../features/selectedStaff';

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

  const loadCompanies = async() => {
    try {
      const data = await getDataFromServer(QueryType.COMPANIES);

      dispatch(companyActions.setCompanies(data));
    } catch(err) {
      console.log(err);
      
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

  const handleCompanyRemove = async(id: number) => {
    try {
      await deleteItemFromServer(QueryType.COMPANIES, id);

      loadCompanies();
    } catch(err) {
      console.log(err);
    }
  };

  const handleCompanyEdit = (id: number) => {
    dispatch(selectedCompanyActions.setCompany(id));
  };

  const handleStaffSelect = (id: number) => {
    dispatch(selectedStaffActions.setStaff(id));
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
          {currentCompany
          ? (<a href={currentCompany?.link}>
              {currentCompany?.name}
            </a>)
          : 'No company'}
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
        <td>
          <img 
            className="company-logo" 
            src={company.logolink 
              ? company.logolink 
              : 'https://icons.veryicon.com/png/o/miscellaneous/alibaba_b2b_h5/error-108.png'}
            alt={company.name}
          />
        </td>
        <td>
        <a href={company.link}>{company.name}</a>
        </td>
        <td>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => {handleStaffSelect(company.id)}}
          >
            Staff
          </button>
        </td>
        <td>
          <button 
            type="button" 
            className="btn btn-warning"
            onClick={() => handleCompanyEdit(company.id)}
          >
            Edit
          </button>
        </td>
        <td>
          <button 
            type="button" 
            className="btn btn-danger"
            onClick={() => handleCompanyRemove(company.id)}
          >
            Remove
          </button>
        </td>
      </tr>
    )
  }

  return <></>;
}