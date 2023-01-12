type RemoveContactAction = { type: 'selectedContact/REMOVE' };

type SetContactAction = {
  type: 'selectedContact/SET';
  payload: number;
};

const removeContact = (): RemoveContactAction => ({ type: 'selectedContact/REMOVE' });

const setContact = (id: number): SetContactAction => ({
  type: 'selectedContact/SET',
  payload: id,
});

export const actions = { setContact, removeContact };

type State = number | null;
type Action = SetContactAction | RemoveContactAction;

const selectedContactReducer = (
  selectedContact: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case 'selectedContact/REMOVE':
      return null;

    case 'selectedContact/SET':
      return action.payload;

    default:
      return selectedContact;
  }
};

export default selectedContactReducer;
