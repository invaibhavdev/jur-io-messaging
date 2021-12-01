import { Avatar } from "antd";
import styled from "styled-components";
import { HomePageConstants, DefaultAvatar } from "../../utils/constants";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  .userInfo {
    margin-left: 0.8rem;
    .userName {
      font-size: 1em;
      margin-bottom: 0.5em;
    }
  }
  svg {
    background-color: ${(props) => (props.selected ? "#BCE3FF" : "#fff")};
  }
`;
const ContactCard = ({
  name,
  avatar = DefaultAvatar,
  about = HomePageConstants.contactCardDefaultAbout,
  selected = true,
}) => {
  return (
    <Wrapper selected={selected}>
      <div>
        <Avatar size={48} src={avatar} />
      </div>
      <div className="userInfo">
        <div className="userName">
          <span>{name}</span>
        </div>
        <div>
          <span>{about}</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default ContactCard;
