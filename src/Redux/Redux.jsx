const redux = require('redux');
 // Define the initial state
const initialState = {
    count: 0,
  };
  
  // Reducer function
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      case 'DECREMENT':
        return { ...state, count: state.count - 1 };
      case 'INCREMENTBY2':
        return { ...state, count: state.count + 2 };
      case 'DECREMENTBY2':
        return { ...state, count: state.count - 2 };
      default:
        return state;
    }
  };
  
  // Create a Redux store with the reducer
  const store = Redux.createStore(counterReducer);
  
  // Subscribe to the store to get updates
  store.subscribe(() => {
    const state = store.getState();
    console.log(state);
  });
  
  // Dispatch actions to update the state
  store.dispatch({ type: 'INCREMENT' }); // Output: { count: 1 }
  store.dispatch({ type: 'INCREMENTBY2' }); // Output: { count: 3 }
  store.dispatch({ type: 'INCREMENTBY2' }); // Output: { count: 5 }
  
  store.dispatch({ type: 'DECREMENT' }); // Output: { count: 4 }
  store.dispatch({ type: 'DECREMENTBY2' }); // Output: { count: 2 }
  
