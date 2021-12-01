import styled from "styled-components";
import { Avatar } from "antd";
import { DefaultAvatar } from "../../utils/constants";
import { isToday, getTime, getDate } from "../../utils";

const Wrapper = styled.div`
  min-width: 260px;
  width: fit-content;
  display: flex;
  background-color: ${(props) => (props.highlight ? "#EDF7FF" : "#fff")};
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
      color: #5f5f5f;
    }
    .message {
      font-size: 1.4em;
      font-weight: regular;
      color: #5f5f5f;
    }
  }
`;
const MessageCard = ({
  createdAt,
  senderName,
  highlight,
  message,
  self = false,
  avatar = DefaultAvatar,
}) => {
  return (
    <Wrapper highlight={highlight}>
      <div>
        <Avatar size={48} src={avatar} />
      </div>
      <div className="info">
        <div className="title">
          <span>{message}</span>
        </div>
        <div className="sender">
          <span>{self ? "You" : senderName}</span>{" "}
          {createdAt ? (
            <>
              <span>at {getTime(createdAt)} </span>
              <span>{isToday(createdAt) ? "Today" : getDate(createdAt)}</span>
            </>
          ) : null}
        </div>
      </div>
    </Wrapper>
  );
};

export default MessageCard;
