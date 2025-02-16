import {Layout} from "antd";
import { Card, Statistic, List, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {useContext} from "react";
import {CryptoContext} from "../../context/crypto-context.jsx";
import {capitalize} from "../../utils.js";

export default function AppSider(){
    const {loading, assets} = useContext(CryptoContext)
    const siderStyle = {
        minHeight: 'calc(100vh - 60px)',
    }
    const siderTitle = {
        fontSize: '21px',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: '15px',
    }


    return (
        <Layout.Sider style={siderStyle} width={360}>
            <p style={siderTitle}>
                My assets
            </p>
            {assets.map((asset) => (
                <Card key={asset.id}
                    size="small"
                    style={{
                        width: 300,
                        marginBottom: 10,
                        textAlign: "left",
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 10,
                }}>
                    <Statistic
                        title={capitalize(asset.id)}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{
                            color: asset.grow ? '#3f8600' : '#cf1322',
                            textAlign: 'left',
                        }}
                        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        suffix="$"
                    />
                    <List
                        size="small"
                        bordered
                        dataSource={[
                            {key: 'Total Profit', value: asset.totalProfit, profitParams: true, growPercent: asset.growPercent},
                            {key: 'Assets Amount', value: asset.amount},
                        ]}
                        style={{backgroundColor: "white"}}
                        renderItem={(item) =>
                            <List.Item>
                                <span>{item.key}</span>
                                <span>
                                    {item.profitParams ? (
                                        <>
                                        <Tag color={asset.grow ? 'green' : 'red'}>{item.growPercent} %</Tag>
                                        <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                                            {item.value}
                                        </Typography.Text>
                                        </>
                                    ) : (
                                        item.value
                                    )}
                                </span>
                            </List.Item>}
                    />
                </Card>
            ))}
        </Layout.Sider>
    )
}

