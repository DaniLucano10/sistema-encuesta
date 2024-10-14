import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewForm from "./pages/ViewForm";
import EncryptPage from "./pages/EncryptPage";

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/getID" element={<EncryptPage />} />
        <Route path="/viewform/:encryptedId"  element={<ViewForm />}/>
      </Routes>
    </Router>
  )
}

export default App;
