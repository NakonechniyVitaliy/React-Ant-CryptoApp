
import {useContext, useState} from "react";
import {Select, Space, Form, Input, Button, Typography, Flex, InputNumber} from "antd";
import {CryptoContext} from "../context/crypto-context.jsx";

export default function FormAsset(){

    const [coin, setCoin] = useState();
    const {crypto} = useContext(CryptoContext)

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    if(!coin){
        return (
            <Select
                mode="single"
                style={{
                    width: '100%',
                }}
                onSelect={(value) => setCoin(crypto.find((c) => c.id === value))}
                placeholder="press Enter to choose"
                options={crypto.map((coin) => ({
                        name: coin.name,
                        icon: coin.icon,
                        symbol: coin.symbol,
                        value: coin.id,
                    })
                )}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 25}} src={option.data.icon} />
                        {option.data.name}
                    </Space>
                )}
            />
        )
    }

    return (
        <>
            <Flex align='center'>
                <img src={coin.icon} alt={coin.name} style={{width: 30, height: 30}}/>
                <Typography.Title level={3} style={{marginBottom: 0, marginLeft:10 }}>
                    {coin.name} ({coin.symbol})
                </Typography.Title>
            </Flex>

            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    marginTop: 30,
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 0,
                            message: 'Please input Amount!',
                        },
                    ]}
                >
                    <InputNumber style={{width:'100%'}} />
                </Form.Item>

                <Form.Item label="Price"
                    name="price"
                >
                    <InputNumber style={{width:'100%'}}/>
                </Form.Item>


                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}