import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import AppHeader from "./components/layouts/Header/AppHeader.jsx";
import AppSider from "./components/layouts/Sider/AppSider.jsx";
import AppContent from "./components/layouts/Content/AppContent.jsx";
import {RealCryptoData, FakeCryptoData} from "./Api.js"



const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
};

export default function App() {
    // RealCryptoData();
    FakeCryptoData().then(data =>{
        console.log(data);
    })
  return (
      <Layout style={layoutStyle}>
        <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
      </Layout>
  )


}
