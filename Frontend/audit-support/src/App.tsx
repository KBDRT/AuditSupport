import AdminPage from './pages/admin/AdminPage'
import Header from './components/common/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from "./components/ui/toaster"

function App() {

  return (
    <>
      <Toaster></Toaster>
      <Header></Header>

      <BrowserRouter>
        <Routes>
            <Route path="/admin" element={<AdminPage />} />
            {/* <Route path="/units" element={<Units />} />
            <Route path="/documents" element={<ReceiptDocuments />} />
            <Route path="/receiptDocumentsEdit/:id" element={<ReceiptDocumentEdit />} />
            <Route path="/receiptDocumentsAdd/" element={<ReceiptDocumentAdd />} />
            <Route path="/*" element={<Resources />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


