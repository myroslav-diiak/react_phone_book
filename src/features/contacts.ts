import { Contacts } from '../types/Contacts';

type SetContactsAction = {
  type: 'contacts/SET';
  payload: Contacts[];
};

const setContacts = (contacts: Contacts[]): SetContactsAction => ({
  type: 'contacts/SET',
  payload: contacts,
});

export const actions = { setContacts };

const contactsReducer = (contacts: Contacts[] = [], action: SetContactsAction): Contacts[] => {
  switch (action.type) {
    case 'contacts/SET':
      return action.payload;

    default:
      return contacts;
  }
};

export default contactsReducer;
