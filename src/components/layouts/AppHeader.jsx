import { Layout, Select, Space, Modal, Drawer, Button } from 'antd';
import {CryptoContext} from "../../context/crypto-context.jsx";
import {useContext, useEffect, useState} from "react";
import ModalContent from "../ModalContent.jsx"
import FormAsset from "../FormAsset.jsx";
import AuthenticationModal from "../AuthenticationModal.jsx"

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
    marginTop: 15,
}

const headerElementRight = {
    justifyContent: 'flex-end',
}


export default function AppHeader() {
    const [cryptoListSelect, setCryptoListSelect] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [coin, setCoin] = useState();
    const [loginModal, setLoginModal] = useState(false);
    const [RegistrationModal, setRegistrationModal] = useState(false);

    const {crypto, addAsset} = useContext(CryptoContext)

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
1
    function handleSelect(value){
        setCoin(crypto.find((c) => c.id === value));
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
                            <img style={{width: 25}} src={option.data.icon}/>
                            {option.data.name}
                        </Space>
                    )}
                />
            </div>

            {/* ---------------- Login Modal ---------------- */}
                <div style={{marginRight: 10}}>
                    <Button type="primary" onClick={() => setLoginModal(true)}>Login</Button>
                </div>
                <Modal title="Login"
                       open={loginModal}
                       footer={null}
                       onCancel={() => setLoginModal(false)}>
                       <AuthenticationModal login={true}/>
                </Modal>
            {/* ---------------- End Login Modal ---------------- */}


            {/* ---------------- Registration Modal ---------------- */}
                <div>
                    <Button type="primary" onClick={() => setRegistrationModal(true)}>Registration</Button>
                </div>
                <Modal title="Registration"
                       open={RegistrationModal}
                       footer={null}
                       onCancel={() => setRegistrationModal(false)}>
                    <AuthenticationModal registration={true}/>
                </Modal>
            {/* ---------------- End Registration Modal ---------------- */}


            <div style={{...headerElement, ...headerElementRight}}>
                <Button type="primary" onClick={() => setIsDrawerOpen(true)}>Add Asset</Button>
            </div>


            <Modal open={isModalOpen}
                   onCancel={() => setIsModalOpen(false)}
                   footer={null}>
                <ModalContent coin={coin}/>
            </Modal>

            <Drawer title="Basic Drawer"
                    onClose={() => setIsDrawerOpen(false)}
                    open={isDrawerOpen}
                    destroyOnClose>
                <FormAsset/>
            </Drawer>

        </Layout.Header>
    )
}