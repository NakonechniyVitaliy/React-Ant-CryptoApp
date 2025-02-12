import {Layout} from "antd";
import { Card, Statistic, List, Typography, Tag, Spin} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {FakeCryptoData, AssetsData} from '../../../Api.js';
import {useEffect, useState} from "react";
import { percentDifference, capitalize } from "../../../utils.js"

const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#1677ff',
};

export default function AppSider(){

    const [loading, setLoading] = useState();
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(()=>{
        async function preload(){
            setLoading(true);
            const assets = await AssetsData();
            const { result } = await FakeCryptoData();

            setAssets(assets.map((asset) =>{
                const coin = result.find((c) => c.id === asset.id)

                return {
                    grow: coin.price > asset.price,
                    growPercent: percentDifference(coin.price, asset.price),
                    totalAmount: asset.amount * coin.price,
                    totalProfit: (asset.amount * coin.price - asset.amount * asset.price).toFixed(2),
                    ...asset,
                    }
                })
            );
            setCrypto(result);
            setLoading(false);
        }
        preload();
    }, [])

    if(loading){
        return <Spin fullscreen />
    }

    return (
        <Layout.Sider width="50%" style={siderStyle}>
            {assets.map((asset) => (
                <Card key={asset.id}
                    size="small"
                    style={{
                        width: 300,
                        marginBottom: 10,
                        textAlign: "left",
                        marginLeft: 20,
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

