const initialState = {
    searchHistory: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_SEARCH_HISTORY':
        return {
          ...state,
          searchHistory: [action.payload, ...state.searchHistory.slice(0, 4)],
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  