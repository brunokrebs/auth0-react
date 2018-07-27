import React from "react";
import PropTypes from "prop-types";
import { Button, Drawer, Form, Row, Col, Input } from "antd";
import styled from "styled-components";

const ButtonsContainerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  left: 0;
  background: #fff;
  border-radius: 0 0 4px 4px;
`;

class MemberEditForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props
          .editMember(values, this.props.data.id)
          .then(() => this.props.toggleDrawerVisibility());
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Drawer
        title="Create"
        width={500}
        placement="right"
        onClose={this.props.toggleDrawerVisibility}
        maskClosable={false}
        visible={this.props.visible}
      >
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Name">
                {getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "Please enter user name" }
                  ],
                  initialValue: this.props.data && this.props.data.name
                })(
                  <Input
                    placeholder="Please enter an updated user name"
                    size="large"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <ButtonsContainerWrapper>
          <Button
            size="large"
            style={{
              marginRight: 8
            }}
            onClick={this.props.toggleDrawerVisibility}
          >
            Cancel
          </Button>
          <Button size="large" type="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </ButtonsContainerWrapper>
      </Drawer>
    );
  }
}

MemberEditForm.propTypes = {
  data: PropTypes.object,
  toggleDrawerVisibility: PropTypes.func,
  visible: PropTypes.bool,
  form: PropTypes.object
};

const WrappedMemberEditForm = Form.create()(MemberEditForm);

export default WrappedMemberEditForm;
