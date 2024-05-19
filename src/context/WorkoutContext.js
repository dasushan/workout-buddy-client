import { createContext, useReducer } from 'react';

export const WorkoutsContext = createContext();

// state is the previous state value
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload,
      };
    // we return a new value we want the state to be
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

// Context.Provider component
// Wrap the whole Component tree so that every component has access to the context
// children property represents whatever components/template WorkoutsContextProvider component wraps
// in this the children property represents the App component that was wrapped in the index file
// The App component wraps all other component in our application, it means all components will have access to
// WorkoutsContext
export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
// The custom  WorkoutsContextProvider component returns the actual provider of the context that we created
