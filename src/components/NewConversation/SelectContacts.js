import ContactCard from "../Contacts/ContactCard";
import { SelectContactsConstants } from "../../utils/constants";
import { Button, Checkbox, Typography } from "antd";

const { Title } = Typography;

const SelectContactScreen = ({
  handleCtaClick,
  list,
  onChange,
  value,
  selectedUser,
}) => {
  const renderList = (list) => {
    const result = list
      .filter((listItem) => listItem.id !== selectedUser.id)
      .map((listItem) => {
        return {
          label: (
            <div className="contact-card">
              <ContactCard
                selected={value.indexOf(listItem.id) > -1}
                name={listItem.name}
              />
            </div>
          ),
          value: listItem.id,
        };
      });
    return result;
  };
  return (
    <>
      <Title className="h1" style={{ marginBottom: "1em" }}>
        {SelectContactsConstants.headerText}
      </Title>
      {list ? (
        <div className="user-list">
          <Checkbox.Group options={renderList(list)} onChange={onChange} />
        </div>
      ) : null}
      {value.length > 0 ? (
        <Button className="btn cta-btn" onClick={handleCtaClick}>
          {SelectContactsConstants.continueButtonText}
        </Button>
      ) : null}
    </>
  );
};

export default SelectContactScreen;
