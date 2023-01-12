type RemoveIsEdittingCompanyAction = { type: 'isEdittingCompany/REMOVE' };

type SetIsEdittingCompanyAction = {
  type: 'isEdittingCompany/SET';
  payload: boolean;
};

const removeIsEdittingCompany = (): RemoveIsEdittingCompanyAction => ({ type: 'isEdittingCompany/REMOVE' });

const setIsEdittingCompany = (value: boolean): SetIsEdittingCompanyAction => ({
  type: 'isEdittingCompany/SET',
  payload: value,
});

export const actions = { setIsEdittingCompany, removeIsEdittingCompany };

type State = boolean;
type Action = SetIsEdittingCompanyAction | RemoveIsEdittingCompanyAction;

const isEdittingCompanyReducer = (
  isEdittingCompany: State = false,
  action: Action,
): State => {
  switch (action.type) {
    case 'isEdittingCompany/REMOVE':
      return false;

    case 'isEdittingCompany/SET':
      return action.payload;

    default:
      return isEdittingCompany;
  }
};

export default isEdittingCompanyReducer;
