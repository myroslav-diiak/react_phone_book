import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { actions as selectedCompanyActions } from '../../features/selectedCompany';
import { actions as companiesActions } from '../../features/companies';
import { Companies } from "../../types/Companies";
import { createNewCompany, getDataFromServer, updateCompanyOnServer } from "../../api/api";
import { QueryType } from "../../types/QueryType";

type Props = {
  selectedCompanyId: number;
}

export const CompaniesForm: React.FC<Props> = ({ selectedCompanyId }) => {
  const dispatch = useAppDispatch();

  const companies: Companies[] = useAppSelector(state => state.companies);

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [logoLink, setLogoLink] = useState('');
  const [validate, setValidate] = useState<string[]>([]);
  const [isCompanyExists, setIsCompanyExists] = useState(false);

  useEffect(() => {
    if (selectedCompanyId > 0) {
      const selectedCompany = companies.find(company => company.id === selectedCompanyId);

      if (selectedCompany) {
        setName(selectedCompany.name);
        setLink(selectedCompany.link);
        setLogoLink(selectedCompany.logolink ? selectedCompany.logolink : '');
      }
    } else {
      setName('');
      setLink('');
      setLogoLink('');
    }
  }, [selectedCompanyId]);

  const validateData = () => {
    const errors = [];
    const stringFromat = /^([a-zA-Z ]){2,30}$/;
    // eslint-disable-next-line
    const linkFormat = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

    const validName = stringFromat.test(name);
    const validLink = linkFormat.test(link);
    let validLogoLink;

    if (logoLink.length) {
      validLogoLink = linkFormat.test(logoLink);
    } else {
      validLogoLink = true;
    }

    !validName && errors.push('name');
    !validLink && errors.push('link');
    !validLink && errors.push('logoLink');

    return errors;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setValidate(validateData());

    setIsCompanyExists(companies.some(company => company.name === name));

    if (!validateData().length && !isCompanyExists) {
      const id = selectedCompanyId > 0
        ? selectedCompanyId
        : Math.max(...companies.map(item => item.id)) + 1;

      const newCompany: Companies = {
        id,
        name,
        link,
        logolink: logoLink || null,
      }

      if (selectedCompanyId === 0) {
        createCompany(newCompany);
      } else {
        updateCompany(newCompany);
      }

      dispatch(selectedCompanyActions.removeCompany());
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
    dispatch(selectedCompanyActions.removeCompany());
  };

  return (
    <form className="form" onSubmit={(event) => handleSubmit(event)}>
      <div className="mb-2">
        <label className="form-label">Company name</label>
        <input 
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text" 
          className="form-control"  
        />
        <div className="form-text">
          {validate.includes('name') && 'Enter correct  company name'}
          {isCompanyExists && 'This company is already in list'}
        </div>
      </div>

      <div className="mb-2">
        <label className="form-label">Company link</label>
        <input 
          value={link}
          onChange={(event) => setLink(event.target.value)}
          type="text" 
          className="form-control"  
        />
        <div className="form-text">
          {validate.includes('link') && 'Enter correct link'}
        </div>
      </div>

      <div className="mb-2">
        <label className="form-label">Logo link (Optional)</label>
        <input 
          value={logoLink}
          onChange={(event) => setLogoLink(event.target.value)}
          type="text" 
          className="form-control" 
          required 
        />
        <div className="form-text">
          {validate.includes('logoLink') && 'Enter correct link'}
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
