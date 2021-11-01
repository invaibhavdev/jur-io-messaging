import PropTypes from "prop-types";
import { Button, Row, Col } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

const Layout = ({ children, showBackButton }) => {
  const history = useHistory();
  return (
    <div style={{ paddingTop: "4em", paddingBottom: "4em" }}>
      <Row>
        <Col span={2}>
          {showBackButton ? (
            <Button onClick={() => history.goBack()} type="text">
              <LeftOutlined />
            </Button>
          ) : null}
        </Col>
        <Col span={20}>{children}</Col>
        <Col span={2}></Col>
      </Row>
    </div>
  );
};

Layout.propTypes = {
  showBackButton: PropTypes.bool,
  children: PropTypes.any,
};

export default Layout;
