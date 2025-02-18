import { Layout, Select, Space, Modal, Drawer } from 'antd';
import {CryptoContext} from "../../context/crypto-context.jsx";
import {useContext, useEffect, useState} from "react";
import ModalContent from "../modalContent.jsx"



const headerStyle = {
    color: 'black',
    height: 60,
    backgroundColor: 'white',
    display: 'flex',
};

const headerElement = {
    display: 'flex',
    flexGrow: 1,
    textAlign: 'left',
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'flex-start',
    marginTop: 15,
}
export default function AppHeader() {
    const [cryptoListSelect, setCryptoListSelect] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coin, setCoin] = useState();


    const {crypto} = useContext(CryptoContext)

    useEffect(() => {
        const handleKeyPress = (event) => {
            if(event.key === 'Enter'){
                setCryptoListSelect((prev) => !prev);
            }
        }

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    })

    function handleSelect(value){
        setCoin(value);
        setIsModalOpen(true);
    }


    return (
        <Layout.Header style={headerStyle}>
            <div style={headerElement}>
                <Select
                    mode="single"
                    style={{
                        maxWidth: 200,
                        width: '100%',
                    }}
                    onClick={() => setCryptoListSelect((prev) => !prev)}
                    onSelect={handleSelect}
                    open={cryptoListSelect}
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
            </div>


            <div style={headerElement}></div>
            <div style={headerElement}></div>

            <Modal open={isModalOpen}
                   onCancel={() => setIsModalOpen(false)}
                   footer={null}>
                   <ModalContent coin={coin}/>
            </Modal>

            <Drawer title="Basic Drawer" onClose={onClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>

        </Layout.Header>
    )
}