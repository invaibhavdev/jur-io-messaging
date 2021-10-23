import axios from "axios";

import { apiURL } from "../utils/constants";
import history from "../utils/history";

export const fetchUsersData = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ASYNC_FETCH" });
      const url = `${apiURL}/contacts`;
      const res = await axios.get(url);
      if (res.status === 200) {
        dispatch({ type: "FETCH_CONTACTS_SUCCESS", payload: res.data });
        dispatch({ type: "ASYNC_FETCH_SUCCESS" });
      }
    } catch (e) {
      dispatch({ type: "ASYNC_FETCH_FAILURE" });
      console.error(e);
    }
  };
};

export const fetchConversationsList = (userId) => {
  return async (dispatch) => {
    try {
      sessionStorage.setItem("selectedUser", userId);
      dispatch({ type: "ASYNC_FETCH" });
      const headers = { user_id: userId };
      const url = `${apiURL}/conversations`;
      const res = await axios.get(url, { headers: headers });
      if (res.status === 200) {
        if (res.data && res.data.length && res.data.length > 0) {
          dispatch({ type: "FETCH_CONVERSATIONS_SUCCESS", payload: res.data });
          dispatch({ type: "ASYNC_FETCH_SUCCESS" });
          history.push("/conversations");
        } else {
          history.push("/contacts");
        }
      }
    } catch (e) {
      dispatch({ type: "ASYNC_FETCH_FAILURE" });
      console.error(e);
    }
  };
};