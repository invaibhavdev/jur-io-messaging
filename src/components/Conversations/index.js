import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Typography, Row, Col } from "antd";
import { fetchConversationsList } from "../../app/actions";
import { ConversationListConstants } from "../../utils/constants";
import ConversationCard from "./ConversationCard";

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
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
    position: relative;
    left: 100%;
    align-self: flex-end;
  }
`;
const { Title } = Typography;
const Conversations = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const list = useSelector((state) => state.conversations);
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
          role="link"
          onClick={() => {
            history.push(`/conversation/${listItem.id}`);
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
    let selectedUser = sessionStorage.getItem("selectedUser");
    if (selectedUser) {
      selectedUser = JSON.parse(selectedUser);
      const userId = selectedUser.id;
      setCurrentUserId(userId);
      dispatch(fetchConversationsList(userId));
    }
  }, [dispatch]);

  return (
    <Row>
      <Col span={10} offset={2}>
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
      </Col>
    </Row>
  );
};

export default Conversations;