type SetSortDirectionAction = {
  type: 'sortDirection/SET';
  payload: boolean;
};

const setSortDirection = (sortDirection: boolean): SetSortDirectionAction => ({
  type: 'sortDirection/SET',
  payload: sortDirection,
});

export const actions = { setSortDirection };

const sortDirectionReducer = (sortDirection = true, action: SetSortDirectionAction): boolean => {
  switch (action.type) {
    case 'sortDirection/SET':
      return action.payload;

    default:
      return sortDirection;
  }
};

export default sortDirectionReducer;