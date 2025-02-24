
import {useContext, useState} from "react";
import {Select, Space, Form, Input, Button, Typography, Flex, InputNumber, DatePicker} from "antd";
import {CryptoContext} from "../context/crypto-context.jsx";

export default function FormAsset(){
    const [form] = Form.useForm();
    const [coin, setCoin] = useState();
    const {crypto} = useContext(CryptoContext)

    const onOk = (value) => {
        console.log('onOk: ', value);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function handleAmountChange(value){
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2),
        })
    }

    function handlePriceChange(value){
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2),
        })

    }

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
                form={form}
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
                    price: coin.price.toFixed(3),
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    placeholder="Enter coin amount"
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            type: "number",
                            min: 0,
                            message: 'Please input Amount!',
                        },
                    ]}
                >
                    <InputNumber onChange={handleAmountChange} style={{width:'100%'}} />
                </Form.Item>

                <Form.Item label="Price" name="price">
                    <InputNumber
                        style={{width:'100%'}}
                        value={coin.price}
                        onChange={handlePriceChange}
                    />
                </Form.Item>

                <Form.Item label="Date&Time" name="dateTime">
                    <DatePicker style={{width:'100%'}} showTime />
                </Form.Item>

                <Form.Item label="Total" name="total">
                    <InputNumber style={{width:'100%'}} disabled/>
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