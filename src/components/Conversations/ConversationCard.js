import { Avatar } from "antd";
import styled from "styled-components";
import { DefaultAvatar } from "../../utils/constants";

const Wrapper = styled.div`
  display: flex;
  background-color: ${(props) => (props.selected ? "#EDF7FF" : "#fff")};
  padding: 0.8em 1.6em;
  align-items: center;
  .info {
    margin-left: 0.8rem;
    .title {
      font-size: 1.6em;
      margin-bottom: 0.25em;
    }
    .sender {
      font-size: 1.4em;
      font-weight: bold;
      color: #5f5f5f;
    }
    .message {
      font-size: 1.4em;
      font-weight: regular;
      color: #5f5f5f;
    }
  }
`;
const ConversationCard = ({
  title,
  sender,
  message,
  selected = false,
  avatar = DefaultAvatar,
}) => {
  return (
    <Wrapper selected={selected}>
      <div>
        <Avatar size={48} src={avatar} />
      </div>
      <div className="info">
        <div className="title">
          <span>{title}</span>
        </div>
        <div className="sender">
          <span>{sender}</span>
        </div>
        <div className="message">
          <span>{message}</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default ConversationCard;
