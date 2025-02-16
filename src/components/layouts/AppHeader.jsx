import { Layout, Select, Space } from 'antd';
import {CryptoContext} from "../../context/crypto-context.jsx";
import {useContext} from "react";


const headerStyle = {
    color: 'black',
    height: 60,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'space-between',
};

const headerElement = {
    flexGrow: 1,
    textAlign: 'center',
}

const options = [
    {
        label: 'China',
        value: 'china',
        emoji: '🇨🇳',
        desc: 'China (中国)',
    },
    {
        label: 'USA',
        value: 'usa',
        emoji: '🇺🇸',
        desc: 'USA (美国)',
    },
    {
        label: 'Japan',
        value: 'japan',
        emoji: '🇯🇵',
        desc: 'Japan (日本)',
    },
    {
        label: 'Korea',
        value: 'korea',
        emoji: '🇰🇷',
        desc: 'Korea (韩国)',
    },
];

const handleChange = (value) => {
    console.log(`selected ${value}`);
};

export default function AppHeader() {
    const {crypto} = useContext(CryptoContext)

    return (
        <Layout.Header style={headerStyle}>
            <div style={headerElement}>
                <Select
                    mode="multiple"
                    style={{
                        width: '100%',
                    }}
                    placeholder="select one country"
                    defaultValue={['china']}
                    onChange={handleChange}
                    options={crypto.map((coin) => ({
                            name: coin.name,
                            icon: coin.icon,
                            symbol: coin.symbol,
                        })
                    )}
                    optionRender={(option) => (
                        <Space>
                            <img src={option.data.icon} />{' '}
                            {option.data.name}
                        </Space>
                    )}
                />
            </div>


            <div style={headerElement}></div>
            <div style={headerElement}></div>

        </Layout.Header>
    )
}