import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BoxProvider } from "./context/BoxContext";
import { ToastProvider } from './context/ToastContext';
import Navbar from "./components/NavBar/NavBar";
import BoxForm from "./components/BoxForm/BoxForm";
import BoxTable from './components/BoxTable/BoxTable';
import Toast from './components/Toast/Toast';
import './App.css';


function App() {
  return (
    <BoxProvider>
      <ToastProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/shippingBoxCalculator" element={<BoxForm />} />
                <Route path="/shippingBoxCalculator/add" element={<BoxForm />} />
                <Route path="/shippingBoxCalculator/list" element={<BoxTable />} />
                <Route path="*" element={<BoxForm />} />
              </Routes>
            </main>
            <Toast />
          </div>
        </Router>
      </ToastProvider>
    </BoxProvider>
  )
}

export default App;