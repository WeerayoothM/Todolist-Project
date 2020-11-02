import { Button, Col, Form, Input, notification, Row } from 'antd'
import React from 'react'
import { withRouter } from 'react-router-dom';
import axios from '../config/axios';
import LocalStorageService from '../services/localStorage';

function Login(props) {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };
    const tailLayout = {
        wrapperCol: { offset: 12, span: 12 },
    };

    const onFinish = ({ username, password }) => {
        axios.post('/users/login', { username, password })
            .then(res => {
                notification.success({
                    description: "Login success"
                })
                LocalStorageService.setToken(res.data.token);
                props.history.push('/');
            })
            .catch(err => {
                console.log(err)
                notification.error({
                    description: "Login failed"
                })
            })
    };
    return (
        <>
            <Row justify="center">
                <h1>Login Form</h1>
            </Row>
            <Row justify="center">
                <Col span={12}>
                    <Form
                        {...layout}
                        name="basic"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>


                        {/* <Form.Item span={24}> */}
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Submit
                            </Button>
                        {/* </Form.Item> */}
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default withRouter(Login);
