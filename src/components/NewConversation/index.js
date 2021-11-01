import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Typography } from "antd";
import {
  SelectContactsConstants,
  StartConversationConstants,
} from "../../utils/constants";
import { createConversation, fetchUsersData } from "../../app/actions";
import Layout from "../common/Layout";
import SetUpConversation from "./SetUpConversation";
import SelectContactScreen from "./SelectContacts";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  label {
    margin-bottom: 1.7em;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .ant-checkbox-group {
    display: inline-flex;
    flex-direction: column;
  }
  .ant-checkbox-wrapper {
    &::after {
      height: 0;
    }
  }
  .ant-checkbox-inner {
    height: 0;
    width: 0;
    visibility: hidden;
  }
  input[type="checkbox"] {
    width: 0;
    height: 0;
  }
  .h1 {
    margin-bottom: 0.1em;
  }
  .h2 {
    font-weight: normal;
    color: #5f5f5f;
    margin-top: 0 !important;
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
  // const history = useHistory();
  const list = useSelector((state) => state.contacts);
  const conversationList = useSelector((state) => state.conversations);
  const [value, setValue] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [nextStep, setNextStep] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [pageSubTitle, setPageSubTitle] = useState("");
  const [showPageSubtitle, setShowPageSubtitle] = useState(
    conversationList && conversationList.length > 0 ? false : true
  );
  const [showBackButton, setShowBackButton] = useState(false);
  const onSelectedChange = (values) => {
    // update checked value list
    setValue(values);
  };
  const handleCtaClick = (groupName) => {
    dispatch(createConversation({ title: groupName, contact_ids: value }));
  };

  const handleContinueClick = () => {
    const subtitle = StartConversationConstants.topSubHeaderText.replace(
      "$value$",
      value.length
    );
    setPageSubTitle(subtitle);
    setNextStep(true);
    setShowBackButton(true);
    setShowPageSubtitle(true);
  };
  const chatMembers = (selected = [], list = []) => {
    return list.filter((listItem) => selected.indexOf(listItem.id) > -1);
  };
  useEffect(() => {
    let selectedUser = sessionStorage.getItem("selectedUser");
    if (selectedUser) {
      selectedUser = JSON.parse(selectedUser);
      // const userId = selectedUser.id;
      const firstName = selectedUser.name.split(" ")[0];
      setSelectedUser(selectedUser);
      const title = SelectContactsConstants.topHeaderText.replace(
        "$user$",
        firstName
      );
      setPageTitle(title);
      setPageSubTitle(SelectContactsConstants.topSubHeaderText);
    }
    if (!list) {
      dispatch(fetchUsersData());
    }
  }, [dispatch]);
  return (
    <Layout showBackButton={showBackButton} title="">
      <Wrapper>
        <Title className="h1">{pageTitle}</Title>
        {showPageSubtitle ? (
          <Title className="h2" level={2}>
            {pageSubTitle}
          </Title>
        ) : null}
        {!nextStep ? (
          <SelectContactScreen
            list={list}
            value={value}
            onChange={onSelectedChange}
            selectedUser={selectedUser}
            handleCtaClick={handleContinueClick}
          />
        ) : (
          <SetUpConversation
            members={chatMembers(value, list)}
            handleClick={handleCtaClick}
          />
        )}
      </Wrapper>
    </Layout>
  );
};

export default Conversations;
