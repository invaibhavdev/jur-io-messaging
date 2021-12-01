import { useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import ContactCard from "../Contacts/ContactCard";
import { StartConversationConstants } from "../../utils/constants";

const Wrapper = styled.div`
  height: calc(100vh - 200px);
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 3.6em;
  //   align-self: flex-start;
  .selectedMemberListWrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .contact-card {
    flex-grow: 1;
    padding: 1em;
    width: 50%;
    font-size: 1.4em;
    justify-content: space-between;
  }
  .clear-btn {
    outline: none;
    border: none;
    height: 46px;
  }
`;

const ChatNameDiv = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  height: 48px;
  border: 1px solid #000000;
  .ant-input {
    outline: none;
    border: none;
  }
`;
const SetUpConversation = ({ members, handleClick }) => {
  const [groupName, setGroupName] = useState("");
  const onInputChange = (e) => {
    setGroupName(e.target.value);
  };
  const renderList = (list = []) => {
    return list.map((listItem) => (
      <div key={listItem.id} className="contact-card">
        <ContactCard selected name={listItem.name} about={listItem.about} />
      </div>
    ));
  };
  return (
    <Wrapper>
      <div className="selectedMemberListWrapper">{renderList(members)}</div>
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
        <ChatNameDiv>
          <Input type="text" value={groupName} onChange={onInputChange} />
          <Button
            className="clear-btn"
            onClick={() => {
              setGroupName("");
            }}
          >
            <CloseOutlined />
          </Button>
        </ChatNameDiv>
        <Button
          className="cta-btn"
          onClick={() => {
            handleClick(groupName);
          }}
        >
          {StartConversationConstants.continueButtonText}
        </Button>
      </div>
    </Wrapper>
  );
};

export default SetUpConversation;
