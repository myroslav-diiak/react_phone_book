import { ListContent } from '../types/ListContent';
type SetListContentAction = {
  type: 'listContent/SET';
  payload: ListContent;
};

const setListContent = (listContent: ListContent): SetListContentAction => ({
  type: 'listContent/SET',
  payload: listContent,
});

export const actions = { setListContent };

const listContentReducer = (listContent: ListContent = "contacts", action: SetListContentAction): ListContent => {
  switch (action.type) {
    case 'listContent/SET':
      return action.payload;

    default:
      return listContent;
  }
};

export default listContentReducer;