import { Typography, Tag, Flex, Divider } from 'antd';

export default function ModalContent({coin}){
    return (
        <>
            <Flex align='center'>
                <img src={coin.icon} alt={coin.name} style={{width: 40, height: 40}}/>
                <Typography.Title level={2} style={{marginBottom: 0, marginLeft:10 }}>
                    {coin.name} ({coin.symbol})
                </Typography.Title>
            </Flex>

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