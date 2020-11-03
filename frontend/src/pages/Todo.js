import React from 'react'
import { Button, Col, Divider, Input, List, notification, Row } from 'antd'
import { useEffect, useState } from 'react';
import axios from '../config/axios';
import TodoItem from '../containers/TodoItem';
import LocalStorageService from "../services/localStorage";
import { withRouter } from 'react-router-dom';

function Todo(props) {
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const fetchTodos = () => {
        axios.get("/todos")
            .then((res) => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchTodos()
    }, []);

    const createTodo = () => {
        axios.post('/todos', { task: inputValue })
            .then(res => {
                fetchTodos()
                setInputValue("")
            })
            .catch(err => {
                console.log(err)
                notification.error({
                    description: "Login first"
                })
            })
    }

    const onLogout = () => {
        LocalStorageService.clearToken();
        props.history.push("/login")
        props.setRole('guest')
    }

    const onLogin = () => {
        props.history.push("/login")
    }

    return (
        <div className="App">
            <h1>Todo list</h1>
            <Row justify="center">
                <Col span={8}>
                    <Input value={inputValue} onChange={e => setInputValue(e.target.value)} />
                </Col>
                <Col span={2}>
                    <Button onClick={createTodo} style={{ width: "100%", color: "white", backgroundColor: "cornflowerblue" }}>Add</Button>
                </Col>
                {true ?
                    <Col span={2}>
                        <Button onClick={onLogout} style={{ width: "100%", color: "white", backgroundColor: "salmon" }}>Logout</Button>
                    </Col>
                    :
                    <Col span={2}>
                        <Button onClick={onLogin} style={{ width: "100%", color: "white", backgroundColor: "salmon" }}>Login</Button>
                    </Col>
                }
            </Row>
            <Row>
                <Col>
                    <Divider />
                </Col>
            </Row>
            <Row justify="center">
                <Col span={12}>
                    <List
                        size="small"
                        bordered
                        dataSource={data}
                        renderItem={item => <List.Item><TodoItem todo={item} fetchTodos={fetchTodos} /></List.Item>}
                    />
                </Col>
            </Row>

        </div>
    );
}

export default withRouter(Todo);
