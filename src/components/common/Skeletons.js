import { Skeleton } from "antd";
import { times } from "../../utils";

export const TitleLoader = () => {
  return <Skeleton paragraph={false} active />;
};
export const ContactsPageLoader = () => {
  return times(<Skeleton avatar paragraph={{ rows: 1 }} active />, 6);
};

export const ConversationsListPageLoader = () => {
  return times(<Skeleton avatar paragraph={{ rows: 3 }} active />, 6);
};
