import {Button, Form, Input, Checkbox} from "antd";
import axios from "axios";


export default function AuthenticationModal({login = false, registration = false}){

    const onFinish = (values) => {
        console.log('Success:', values);
        loginApiRequest(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function loginApiRequest(values){
        axios.post('http://127.0.0.1:8000/api/registration', {
            method: 'POST',
            headers: {
                accept: 'application/json'
            },
            data: values
        })
        .then(result => {console.log(result)})
    }



    return (
        <Form
            name="basic" labelCol={{ span: 8,}}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">


            { !login && (
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
            )}


            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        type: "email",
                        message: 'Please input your email!',
                    },
                ]}
            >

                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    {   min: 10,
                        message: 'Password must be at least 10 characters long!',
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}