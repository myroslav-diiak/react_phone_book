import { Companies } from "../types/Companies";

type SetCompaniesAction = {
  type: 'companies/SET';
  payload: Companies[];
};

const setCompanies = (contacts: Companies[]): SetCompaniesAction => ({
  type: 'companies/SET',
  payload: contacts,
});

export const actions = { setCompanies };

const companiesReducer = (companies: Companies[] = [], action: SetCompaniesAction): Companies[] => {
  switch (action.type) {
    case 'companies/SET':
      return action.payload;

    default:
      return companies;
  }
};

export default companiesReducer;
