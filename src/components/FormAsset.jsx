
import {useContext, useRef, useState} from "react";
import {Select, Space, Form, Button, InputNumber, DatePicker, Divider} from "antd";
import {CryptoContext} from "../context/crypto-context.jsx";
import DrawerResult from "./DrawerResult.jsx";
import CoinInfo from "./CoinInfo.jsx";


export default function FormAsset(){
    const [form] = Form.useForm();
    const [coin, setCoin] = useState();
    const [showDrawerResult, setShowDrawerResult] = useState(false);

    const assetRef = useRef();
    const {crypto, addAsset} = useContext(CryptoContext)

    const onFinish = (values) => {

        assetRef.current = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }

        addAsset(assetRef.current);

        setShowDrawerResult(true)
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

    if(showDrawerResult){
        return (
            <DrawerResult assetRef={assetRef}/>
        )
    }

    return (
        <>
            <CoinInfo coin={coin}/>
            <Divider></Divider>

            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 6
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
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{width:'50%', backgroundColor: 'lightgreen', color: 'black'}}>
                            Submit
                    </Button>
                </Form.Item>
            </Form>

        </>
    )
}