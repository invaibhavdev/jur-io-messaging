import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Typography, Row, Col } from "antd";
import { fetchConversationsList } from "../../app/actions";
import { ConversationListConstants } from "../../utils/constants";
import { TitleLoader, ConversationsListPageLoader } from "../common/Skeletons";
import Layout from "../common/Layout";

import ConversationCard from "./ConversationCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  .conversation-card {
    cursor: pointer;
    margin-bottom: 1.6em;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .ant-radio-group {
    display: inline-flex;
    flex-direction: column;
  }
  .ant-radio-wrapper {
    &::after {
      height: 0;
    }
  }
  .ant-radio-inner {
    height: 0;
    width: 0;
    visibility: hidden;
  }
  input[type="radio"] {
    width: 0;
    height: 0;
  }
  .h1 {
    margin-bottom: 0.7em;
  }
  .user-list {
    margin-bottom: 3.6em;
  }
  .btn {
    align-self: flex-end;
  }
`;
const { Title } = Typography;
const Conversations = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const list = useSelector((state) => state.conversations);
  const loading = useSelector((state) => state.loading);
  const [currentUserId, setCurrentUserId] = useState(-1);

  const renderList = (list) => {
    const result = list.map((listItem) => {
      const lastMessage = listItem.last_message;
      let sender = "";
      let message = "";
      let title = listItem.title || "";
      if (lastMessage && lastMessage.length > 0) {
        sender =
          lastMessage[0].sender_id === currentUserId
            ? "You"
            : lastMessage[0].sender_name;
        message = lastMessage[0].content || "";
      }
      return (
        <div
          key={listItem.id}
          role="link"
          onClick={() => {
            history.push(`/conversations/${listItem.id}`);
          }}
          className="conversation-card"
        >
          <ConversationCard
            selected={
              lastMessage &&
              lastMessage[0] &&
              lastMessage[0].sender_id === currentUserId
            }
            title={title}
            sender={sender}
            message={message}
          />
        </div>
      );
    });
    return result;
  };

  useEffect(() => {
    dispatch(fetchConversationsList());
  }, [dispatch]);

  if (loading) {
    return (
      <Row>
        <Col span={6} offset={2}>
          <Wrapper>
            <TitleLoader />
            <ConversationsListPageLoader />
          </Wrapper>
        </Col>
        <Col span={4}></Col>
      </Row>
    );
  }

  return (
    <Layout>
      <Wrapper>
        <Title className="h1">{ConversationListConstants.headerText}</Title>
        {list ? <div className="user-list">{renderList(list)}</div> : null}
        <Button
          className="btn cta-btn"
          onClick={() => {
            history.push("/conversations/new");
          }}
        >
          {ConversationListConstants.continueButtonText}
        </Button>
      </Wrapper>
    </Layout>
  );
};

export default Conversations;
