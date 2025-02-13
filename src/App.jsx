
import {CryptoContextProvider} from "./context/crypto-context.jsx";
import {AppLayout} from "./components/layouts/AppLayout.jsx";


export default function App() {
  return (
      <CryptoContextProvider>
        <AppLayout />
      </CryptoContextProvider>

  )
}
