import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CompaniesSelect } from "../CompaniesSelect";
import { actions as isCompanyEdittingActions } from '../../features/isCompanyEditting';
import { actions as companiesActions } from '../../features/companies';
import { Companies } from "../../types/Companies";
import { createNewCompany, getDataFromServer, updateCompanyOnServer } from "../../api/api";
import { QueryType } from "../../types/QueryType";

export const CompaniesForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const companies: Companies[] = useAppSelector(state => state.companies);

  const [selectedCompanyId, setSelectedCompanyId] = useState(0);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (selectedCompanyId > 0) {
      const selectedCompany = companies.find(company => company.id === selectedCompanyId);

      if (selectedCompany) {
        setName(selectedCompany.name);
        setLink(selectedCompany.link);
      }
    } else {
      setName('');
      setLink('');
    }
  }, [selectedCompanyId]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const verifyData = name.trim() && link.trim();

    if (verifyData) {
      const id = selectedCompanyId > 0
        ? selectedCompanyId
        : Math.max(...companies.map(item => item.id)) + 1;

      const newCompany: Companies = {
        id,
        name,
        link,
      }

      if (selectedCompanyId === 0) {
        createCompany(newCompany);
      } else {
        updateCompany(newCompany);
      }

      dispatch(isCompanyEdittingActions.removeIsEdittingCompany());
    }
  };

  const updateCompany = async(updatedCompany: Companies) => {
    try {
      await updateCompanyOnServer(updatedCompany, updatedCompany.id);

      loadContacts();
    } catch(err) {
      console.log(err);
    }
  };

  const createCompany = async(updatedCompany: Companies) => {
    try {
      await createNewCompany(updatedCompany);

      loadContacts();
    } catch(err) {
      console.log(err);
    }
  };

  const loadContacts = async() => {
    try {
      const data = await getDataFromServer(QueryType.COMPANIES);

      dispatch(companiesActions.setCompanies(data));
    } catch(err) {
      console.log(err)
    }
  };

  const handleBackButton = () => {
    dispatch(isCompanyEdittingActions.removeIsEdittingCompany());
  };

  return (
    <form className="form" onSubmit={(event) => handleSubmit(event)}>
      <CompaniesSelect
        companies={companies}
        company={selectedCompanyId}
        setCompany={setSelectedCompanyId}
      />

      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label className="col-form-label">Company name</label>
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
            Enter company name
          </span>
        </div>
      </div>

      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label className="col-form-label">Company link</label>
        </div>
        <div className="col-auto">
          <input 
            value={link}
            onChange={(event) => setLink(event.target.value)}
            type="text" 
            className="form-control" 
            required 
          />
        </div>
        <div className="col-auto">
          <span className="form-text">
            Enter company link
          </span>
        </div>
      </div>

      <div className="button-container">
        <button type="submit" className="btn btn-success">
          {selectedCompanyId === 0
          ? 'Add new company'
          : 'Edit company'}
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
};
