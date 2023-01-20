type RemoveStaffAction = { type: 'selectedStaff/REMOVE' };

type SetStaffAction = {
  type: 'selectedStaff/SET';
  payload: number;
};

const removeStaff = (): RemoveStaffAction => ({ type: 'selectedStaff/REMOVE' });

const setStaff = (id: number): SetStaffAction => ({
  type: 'selectedStaff/SET',
  payload: id,
});

export const actions = { setStaff, removeStaff };

type State = number | null;
type Action = SetStaffAction | RemoveStaffAction;

const selectedStaffReducer = (
  selectedStaff: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case 'selectedStaff/REMOVE':
      return null;

    case 'selectedStaff/SET':
      return action.payload;

    default:
      return selectedStaff;
  }
};

export default selectedStaffReducer;
