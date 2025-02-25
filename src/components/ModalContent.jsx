import { Typography, Tag, Flex, Divider } from 'antd';
import CoinInfo from "./CoinInfo.jsx";

export default function ModalContent({coin}){
    return (
        <>
            <CoinInfo coin={coin} />
            <Divider></Divider>

            <Typography.Paragraph strong style={{marginTop: 10, fontSize: 16}}>
                1 hour:  <Tag style={{marginRight: 20}} color={coin.priceChange1h > 0 ? "green" : "red"}>{coin.priceChange1h}</Tag>
                1 day:  <Tag style={{marginRight: 20}} color={coin.priceChange1d > 0 ? "green" : "red"}>{coin.priceChange1d}</Tag>
                1 week:  <Tag style={{marginRight: 20}} color={coin.priceChange1w > 0 ? "green" : "red"}>{coin.priceChange1w}</Tag>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text style={{fontWeight: 600}}>
                    Price:
                </Typography.Text>

                <Typography.Text style={{marginLeft: 7}}>
                    {coin.price.toFixed(3)}
                </Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text style={{fontWeight: 600}}>
                    Price BTC:
                </Typography.Text>

                <Typography.Text style={{marginLeft: 7}}>
                 {coin.priceBtc}
                </Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text style={{fontWeight: 600}}>
                    Market Cup:
                </Typography.Text>
                <Typography.Text style={{marginLeft: 7}}>
                    {coin.marketCap}
                </Typography.Text>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text style={{fontWeight: 600}}>
                    Contact Address:
                </Typography.Text>
                <Typography.Text style={{marginLeft: 7}}>
                    {coin.contractAddress}
                </Typography.Text>
            </Typography.Paragraph>
        </>
    )
}