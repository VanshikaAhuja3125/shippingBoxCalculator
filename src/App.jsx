import { HashRouter as Router, Routes, Route } from "react-router-dom";
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
                <Route path="/" element={<BoxForm />} />
                <Route path="/add" element={<BoxForm />} />
                <Route path="/list" element={<BoxTable />} />
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