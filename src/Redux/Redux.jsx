import { createStore } from 'redux';
  
  // Reducer function
  const counterReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
    case 'INCREASE':
            return { ...state, count: state.count + action.amount };
      case 'DECREMENT':
        return { ...state, count: state.count - 1 };
      case 'INCREMENTBY5':
        return { ...state, count: state.count + 5 };
      case 'DECREMENTBY5':
        return { ...state, count: state.count - 5 };
      case 'INCREMENTBY2':
        return { ...state, count: state.count + 2 };
      case 'DECREMENTBY2':
        return { ...state, count: state.count - 2 };
      default:
        return state;
    }
  };
  // Create a Redux store with the reducer
  const store = createStore(counterReducer);
  
  // Subscribe to the store to get updates
  store.subscribe(() => {
    const state = store.getState();
    console.log(state);
  });

  // Dispatch actions to update the state
  store.dispatch({ type: 'INCREMENT' }); // Output: { count: 1 }
  store.dispatch({ type: 'INCREMENTBY5' }); // Output: { count: 1 }
  store.dispatch({ type: 'INCREMENTBY2' }); // Output: { count: 3 }
  store.dispatch({ type: 'INCREMENTBY2' }); // Output: { count: 5 }
  store.dispatch({ type: 'INCREASE' }); 
  store.dispatch({ type: 'DECREMENT' }); // Output: { count: 4 }
  store.dispatch({ type: 'DECREMENTBY5' }); // Output: { count: 4 }
  store.dispatch({ type: 'DECREMENTBY2' }); // Output: { count: 2 }

export default store;