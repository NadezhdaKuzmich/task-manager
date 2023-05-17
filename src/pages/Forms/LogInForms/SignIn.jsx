import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../slices/AuthSlice/AuthSlise";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Avatar, Alert } from "antd";
import styles from "./Forms.module.css";
import { useState, useEffect } from "react";

const SignIn = () => {
  const { user, error } = useSelector((store) => store.user);
  const [alert, setAlert] = useState(error.verification);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error.verification) {
      setAlert(error.verification);
    } else if (!error.verification && user.username && user.password) {
      navigate("/user");
    }
  }, [user, navigate, error]);

  const closeAlert = () => {
    setAlert(false);
  };

  const onFinish = (values) => {
    dispatch(login(values));
  };

  return (
    <div className={styles.formWrap}>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <h2>Welcome</h2>
          <Avatar
            size={54}
            style={{ backgroundColor: "#b7bdeb" }}
            icon={<UserOutlined />}
          />
          <Form
            name="normal_login"
            className={styles.login}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className={styles.icon} />}
                placeholder="Username"
                autoComplete="username"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className={styles.icon} />}
                type="password"
                placeholder="Password"
                size="large"
                autoComplete="new-password"
              />
            </Form.Item>
            {alert ? (
              <Alert
                type="error"
                message="You entered an invalid username or password."
                showIcon
                onClose={closeAlert}
                closable
              />
            ) : null}
            <Form.Item name="btn">
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          <p>
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;