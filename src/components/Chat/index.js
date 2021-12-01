import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import { Button, Input, Typography, Col } from "antd";

import { CloseOutlined } from "@ant-design/icons";
import { getUserIdFromSession } from "../../utils";
import { baseUrl, ConversationPage } from "../../utils/constants";
import {
  fetchConversationDetails,
  sendMessage,
  getConversationMessages,
} from "../../app/actions";
import { ConversationsListPageLoader, TitleLoader } from "../common/Skeletons";
import Layout from "../common/Layout";

import MessageCard from "./MessageCard";

const Wrapper = styled.div`
  height: calc(100vh - 100px);
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  .clear-btn {
    outline: none;
    border: none;
    height: 46px;
  }
  .message-card {
    cursor: pointer;
    margin-bottom: 1.6em;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .messageListWrapper {
    width: auto;
    max-height: 400px;
    overflow-y: scroll;
  }
`;
const ChatNameDiv = styled.div`
  display: flex;
  justify-content: space-between;
  height: 48px;
  border: 1px solid #000000;
  .ant-input {
    outline: none;
    border: none;
  }
`;
const { Title } = Typography;

function getUserId() {
  try {
    return getUserIdFromSession();
  } catch (e) {
    window.location.href = `${baseUrl}/contacts`;
  }
}

function Chat() {
  const dispatch = useDispatch();
  const location = useLocation();
  const chatDetails = useSelector((state) => state.chat);
  const loading = useSelector((state) => state.loading);
  const [messageText, setMessageText] = useState("");
  const pathname = location.pathname.split("/");
  const currentUserId = getUserId();
  const messageList =
    chatDetails && chatDetails.recent_messages
      ? chatDetails.recent_messages
      : [];
  const onInputChange = (e) => {
    setMessageText(e.target.value);
  };
  const handleClick = () => {
    if (messageText) {
      dispatch(
        sendMessage({
          conversationId: pathname[2],
          data: { content: messageText },
        })
      );
      setMessageText("");
    }
  };
  const renderMessageList = (list) => {
    return list
      .map((message) => (
        <div key={message.id} className="message-card">
          <MessageCard
            key={message.id}
            senderName={message.sender_name}
            message={message.content}
            highlight={message.sender_id === currentUserId}
            self={message.sender_id === currentUserId}
          />
        </div>
      ))
      .reverse();
  };

  useEffect(() => {
    dispatch(fetchConversationDetails(pathname[2]));
    const intervalId = setInterval(() => {
      dispatch(getConversationMessages(pathname[2]));
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div style={{ padding: "24px", maxWidth: "300px" }}>
          <TitleLoader />
          <ConversationsListPageLoader />
        </div>
      </Layout>
    );
  }
  return (
    <Layout showBackButton>
      <Wrapper>
        <Title className="h1">{chatDetails ? chatDetails.title : ""}</Title>
        <div className="messageListWrapper">
          {renderMessageList(messageList)}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Col span={12}>
            <ChatNameDiv>
              <Input type="text" value={messageText} onChange={onInputChange} />
              <Button
                className="clear-btn"
                onClick={() => {
                  setMessageText("");
                }}
              >
                <CloseOutlined />
              </Button>
            </ChatNameDiv>
          </Col>
          <Col offset={6} span={6}>
            <Button className="cta-btn" onClick={handleClick}>
              {ConversationPage.sendButtonText}
            </Button>
          </Col>
        </div>
      </Wrapper>
    </Layout>
  );
}

export default Chat;
