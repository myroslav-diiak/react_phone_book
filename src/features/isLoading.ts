type SetIsLoadingAction = {
  type: 'isLoading/SET';
  payload: boolean;
};

const setIsLoading = (isLoading: boolean): SetIsLoadingAction => ({
  type: 'isLoading/SET',
  payload: isLoading,
});

export const actions = { setIsLoading };

const isLoadingReducer = (isLoading = true, action: SetIsLoadingAction): boolean => {
  switch (action.type) {
    case 'isLoading/SET':
      return action.payload;

    default:
      return isLoading;
  }
};

export default isLoadingReducer;