type RemoveCompanyAction = { type: 'selectedCompany/REMOVE' };

type SetCompanyAction = {
  type: 'selectedCompany/SET';
  payload: number;
};

const removeCompany = (): RemoveCompanyAction => ({ type: 'selectedCompany/REMOVE' });

const setCompany = (id: number): SetCompanyAction => ({
  type: 'selectedCompany/SET',
  payload: id,
});

export const actions = { setCompany, removeCompany };

type State = number | null;
type Action = SetCompanyAction | RemoveCompanyAction;

const selectedCompanyReducer = (
  selectedCompany: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case 'selectedCompany/REMOVE':
      return null;

    case 'selectedCompany/SET':
      return action.payload;

    default:
      return selectedCompany;
  }
};

export default selectedCompanyReducer;
