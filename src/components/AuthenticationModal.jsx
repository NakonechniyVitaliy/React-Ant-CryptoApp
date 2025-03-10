import {Button, Form, Input, Checkbox} from "antd";
import axios from "axios";


export default function AuthenticationModal({login = false, registration = false}){

    const onFinish = (values) => {
        if (registration){
            RegistrationApiRequest(values);
        }

        if(login){
            loginApiRequest(values);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function loginApiRequest(values){
        axios.post('http://127.0.0.1:8000/api/registration', values, {
            method: 'POST',
            headers: {
                accept: 'application/json'
            },
        })
        .then(result => {console.log(result)})
    }

    function RegistrationApiRequest(values){
        axios.post('http://127.0.0.1:8000/api/registration', values, {
            method: 'POST',
            headers: {
                accept: 'application/json'
            }
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

            { !login && (
                <Form.Item
                    label="Password repeat"
                    name="PasswordRepeat"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please repeat your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match!'));
                            },
                        }),
                    ]}>
                    <Input.Password />
                </Form.Item>
            )}



            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}