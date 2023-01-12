import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Companies } from '../../types/Companies';
import './CompaniesSelect.scss';

type Props = {
  companies: Companies[];
  company: number;
  setCompany: React.Dispatch<React.SetStateAction<number>>;
}

export const CompaniesSelect: React.FC<Props> = ({ companies, company, setCompany }) => {
  const isCompanyEditting = useAppSelector(state => state.isCompanyEditting);

  return (
    <select 
      className="form-select select"
      value={company}
      onChange={(event) => setCompany(+event.target.value)}
    >
      {isCompanyEditting && (
        <option value="0">
          Add new company
        </option>
      )}
      {companies.map(company => (
        <option value={company.id} key={company.id}>
          {company.name}
        </option>
      ))}
    </select>
  );
}