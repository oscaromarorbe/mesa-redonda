export const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  }
}

export const reducer = createReducer([], {
  CREATE_ORDER: (state, action) => {
    const customer = action.customer;
    return Object.assign({}, state, {
      orders: {
        ...state[orders],
        [ID]: {
          customer,
        }
      }
    })
  }
});