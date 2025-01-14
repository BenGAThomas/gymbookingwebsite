// import SignupLogin from "./loginform"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./Components/Signup"
import Navbar from "./Components/Navbar"


function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />
        <Routes>
            <Route path = "/signup" element={<Signup />}></Route>
        </Routes>
    </BrowserRouter>
      {/* <SignupLogin /> */}
    </>
  )
}

export default App
