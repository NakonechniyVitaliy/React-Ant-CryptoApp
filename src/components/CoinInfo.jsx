import {Flex, Typography} from "antd";

export default function CoinInfo({coin}){
    return (
        <Flex align='center'>
            <img src={coin.icon} alt={coin.name} style={{width: 30, height: 30}}/>
            <Typography.Title level={3} style={{marginBottom: 0, marginLeft:10 }}>
                {coin.name} ({coin.symbol})
            </Typography.Title>
        </Flex>
    )
}