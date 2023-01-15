import { SortType } from "../types/SortType";

type SetSortTypeAction = {
  type: 'sortType/SET';
  payload: SortType;
};

const setSortType = (sortType: SortType): SetSortTypeAction => ({
  type: 'sortType/SET',
  payload: sortType,
});

export const actions = { setSortType };

const sortTypeReducer = (sortType: SortType = SortType.NONE, action: SetSortTypeAction): SortType => {
  switch (action.type) {
    case 'sortType/SET':
      return action.payload;

    default:
      return sortType;
  }
};

export default sortTypeReducer;