import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { CountryDetails } from "./pages/CountryDetails"
import { Navbar } from "./components/Navbar"
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="bg-slate-50 max-h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:countryCode" element={<CountryDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
