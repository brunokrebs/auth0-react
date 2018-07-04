import React from "react";
import PropTypes from "prop-types";
import { Card, Form, Input, Button } from "antd";
import styled from "styled-components";

const CardWrapper = styled(Card)`
  width: 500px;
  margin: 20px auto !important;
`;

class NewUserForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        this.props.saveUser(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <CardWrapper title="Add new user">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Please input your name!" }]
            })(<Input placeholder="Name" size="large" />)}
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              disabled={this.props.userUi.get("loading")}
            >
              Add user
            </Button>
          </Form.Item>
        </Form>
      </CardWrapper>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NewUserForm);

WrappedNormalLoginForm.propTypes = {
  userUi: PropTypes.object
};

export default WrappedNormalLoginForm;
