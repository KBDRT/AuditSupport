import UsersPage from './pages/admin/UsersPage'
import Header from './components/common/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from "./components/ui/toaster"
import DirectionPage from './pages/direction/DirectionsPage'
import YearsPage from './pages/year/YearsPage'

function App() {

  return (
    <>
      <Toaster></Toaster>
      <Header></Header>

      <BrowserRouter>
        <Routes>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/directions" element={<DirectionPage />} />
            <Route path="/eduyears" element={<YearsPage />} />
            {/* <Route path="/receiptDocumentsEdit/:id" element={<ReceiptDocumentEdit />} />
            <Route path="/receiptDocumentsAdd/" element={<ReceiptDocumentAdd />} />
            <Route path="/*" element={<Resources />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


