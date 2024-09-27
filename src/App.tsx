import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewForm from "./pages/ViewForm";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/viewform"  element={<ViewForm />}/>
      </Routes>
    </Router>
  )
}

export default App;
