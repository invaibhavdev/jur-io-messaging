import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button, Radio, Typography } from "antd";

import ContactCard from "./ContactCard";

import { HomePageConstants } from "../../utils/constants";
import { fetchConversationsList, fetchUsersData } from "../../app/actions";

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  label {
    margin-bottom: 1.7em;
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
    margin-bottom: 1.4em;
  }
  .user-list {
    margin-bottom: 3.6em;
  }
  .btn {
    align-self: flex-end;
  }
`;
const { Title } = Typography;
const Contacts = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.contacts);
  const [value, setValue] = useState(-1);

  const onChangeUser = (e) => {
    // change selected user
    setValue(e.target.value);
  };
  const handleCtaClick = () => {
    dispatch(fetchConversationsList(value));
  };
  const renderList = (list) => {
    const result = list.map((listItem) => {
      return {
        label: (
          <div className="contact-card">
            <ContactCard
              selected={listItem.id === value}
              name={listItem.name}
            />
          </div>
        ),
        value: listItem.id,
      };
    });
    return result;
  };

  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);

  return (
    <ContactList>
      <Title className="h1">{HomePageConstants.headerText}</Title>
      {list ? (
        <div className="user-list">
          <Radio.Group
            options={renderList(list)}
            onChange={onChangeUser}
            value={value}
          />
        </div>
      ) : null}
      {value > -1 ? (
        <Button className="btn cta-btn" onClick={handleCtaClick}>
          {HomePageConstants.continueButtonText}
        </Button>
      ) : null}
    </ContactList>
  );
};

export default Contacts;
