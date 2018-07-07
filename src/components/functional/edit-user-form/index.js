import React from "react";
import PropTypes from "prop-types";
import { Card, Form, Input, Button } from "antd";
import styled from "styled-components";

const CardWrapper = styled(Card)`
  width: 500px;
  margin: 20px auto !important;
`;

class EditUserForm extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.editUser({
          id: this.props.match.params.id,
          name: values.name
        });
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
              rules: [{ required: true, message: "Please input your name!" }],
              initialValue: this.props.user.get("name")
            })(
              <Input
                placeholder="Name"
                size="large"
                disabled={this.props.userUi.get("loading")}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              disabled={this.props.userUi.get("loading")}
            >
              Update user
            </Button>
          </Form.Item>
        </Form>
      </CardWrapper>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(EditUserForm);

WrappedNormalLoginForm.propTypes = {
  userUi: PropTypes.object
};

export default WrappedNormalLoginForm;
