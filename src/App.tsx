import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EncryptPage from "./pages/EncryptPage";
import FormView from "./pages/FormView";

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/getID" element={<EncryptPage />} />
        <Route path="/formview"  element={<FormView />}/>
      </Routes>
    </Router>
  )
}

export default App;
