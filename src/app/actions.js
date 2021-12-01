import axios from "axios";

import { apiURL, baseUrl } from "../utils/constants";
import history from "../utils/history";
import { getUserIdFromSession } from "../utils";

const handleException = (e) => {
  if (e.name === "UserException" && e.message === "USER_NOT_FOUND") {
    window.location.href = `${baseUrl}/contacts`;
  }
  console.error(e);
};

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
      handleException(e);
    }
  };
};

export const fetchConversationsList = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ASYNC_FETCH" });
      const headers = { user_id: getUserIdFromSession() };
      const url = `${apiURL}/conversations`;
      const res = await axios.get(url, { headers: headers });
      if (res.status === 200) {
        if (res.data && res.data.length && res.data.length > 0) {
          dispatch({ type: "FETCH_CONVERSATIONS_SUCCESS", payload: res.data });
          dispatch({ type: "ASYNC_FETCH_SUCCESS" });
        } else if (res.data.length === 0) {
          history.push("/conversations/new");
        }
      }
    } catch (e) {
      dispatch({ type: "ASYNC_FETCH_FAILURE" });
      handleException(e);
    }
  };
};

export const createConversation = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ASYNC_FETCH" });
      const headers = { user_id: getUserIdFromSession() };
      const url = `${apiURL}/conversations`;
      const res = await axios.post(url, data, { headers: headers });
      if (res.status === 200) {
        if (res.data && res.data.id) {
          history.push(`/conversations/${res.data.id}`);
        }
        dispatch({ type: "ASYNC_FETCH_SUCCESS" });
      }
    } catch (e) {
      dispatch({ type: "ASYNC_FETCH_FAILURE" });
      handleException(e);
    }
  };
};

export const fetchConversationDetails = (conversationId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ASYNC_FETCH" });
      const headers = { user_id: getUserIdFromSession() };
      const url = `${apiURL}/conversations/${conversationId}`;
      const res = await axios.get(url, { headers: headers });
      if (res.status === 200) {
        if (res.data) {
          dispatch({
            type: "FETCH_CHAT_SUCCESS",
            payload: res.data,
          });
        }
        dispatch({ type: "ASYNC_FETCH_SUCCESS" });
      }
    } catch (e) {
      dispatch({ type: "ASYNC_FETCH_FAILURE" });
      handleException(e);
    }
  };
};

export const getConversationMessages = (conversationId) => {
  return async (dispatch) => {
    try {
      const headers = { user_id: getUserIdFromSession() };
      const url = `${apiURL}/conversations/${conversationId}/messages`;
      const res = await axios.get(url, { headers: headers });
      if (res.status === 200) {
        dispatch({ type: "ASYNC_FETCH_SUCCESS" });
        dispatch({
          type: "FETCH_CONVERSATION_MESSAGES_SUCCESS",
          payload: res.data,
        });
      }
    } catch (e) {
      dispatch({ type: "ASYNC_FETCH_FAILURE" });
      handleException(e);
    }
  };
};

export const sendMessage = ({ conversationId, data }) => {
  return async (dispatch) => {
    try {
      const headers = { user_id: getUserIdFromSession() };
      const url = `${apiURL}/conversations/${conversationId}/messages`;
      const res = await axios.post(url, data, { headers: headers });
      if (res.status === 200) {
        dispatch({ type: "ASYNC_FETCH_SUCCESS" });
        dispatch(getConversationMessages(conversationId));
      }
    } catch (e) {
      dispatch({ type: "ASYNC_FETCH_FAILURE" });
      handleException(e);
    }
  };
};
