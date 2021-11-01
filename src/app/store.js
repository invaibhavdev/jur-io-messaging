import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const reducer = (
  state = { snackbar: { visible: false, message: "" }, loading: false },
  action
) => {
  switch (action.type) {
    case "ASYNC_FETCH":
      return { ...state, loading: true };
    case "ASYNC_FETCH_SUCCESS":
      return { ...state, loading: false };
    case "ASYNC_FETCH_FAILURE":
      return { ...state, loading: false };
    case "FETCH_USERS_SUCCESS":
      return { ...state, users: action.payload };
    case "FETCH_CONTACTS_SUCCESS":
      return { ...state, contacts: action.payload };
    case "FETCH_CONVERSATIONS_SUCCESS":
      return { ...state, conversations: action.payload };
    case "FETCH_CHAT_SUCCESS":
      return { ...state, chat: action.payload };
    case "FETCH_CONVERSATION_MESSAGES_SUCCESS":
      return {
        ...state,
        chat: { ...state.chat, recent_messages: action.payload },
      };
    case "SHOW_SNACKBAR": {
      const newState = {
        ...state,
        snackbar: {
          visible: true,
          message: action.payload,
          severity: action.severity,
        },
      };
      return newState;
    }
    case "HIDE_SNACKBAR": {
      return { ...state, snackbar: { visible: false, message: "" } };
    }
    default:
      return state;
  }
};

const initializeStore = (initialState) => {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancer(applyMiddleware(thunk));
  return createStore(reducer, initialState, enhancer);
};

// exports the functionality to initialize the store
// rather than exporting the store instance
export const store = initializeStore();
