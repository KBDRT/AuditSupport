import AdminPage from './pages/admin/AdminPage'
import Header from './components/common/Header'
import { Toaster } from "./components/ui/toaster"

function App() {

  return (
    <>
      <Toaster></Toaster>
      <Header></Header>
      <AdminPage></AdminPage>
    </>
  )
}

export default App


