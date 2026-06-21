import { Route, Routes } from "react-router-dom"
import RegisterPage from "./Pages/Auth/RegisterPage"
import LoginPage from "./Pages/Auth/LoginPage"
import HomePage from "./Pages/HomePage"

function App() {


  return (
    <Routes>
     <Route path="/register" element={<RegisterPage />}/>
     <Route path="/login" element={<LoginPage />}/>
     <Route path="/home" element={<HomePage />}/>
    </Routes>
  )
}

export default App
