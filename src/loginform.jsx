import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./Components/Signup"


const SignupLogin = () => {
    <BrowserRouter>
        <Routes>
            <Route path = "/signup" element={<Signup />}></Route>
        </Routes>
    </BrowserRouter>
    // <div className="flex justify-center items-center">
    //     <div className="lg:w-[450px] bg-purple-500 py-2 px-10 rounded-bl-[40px]">
    //         <h1 className="text-3xl text-red-500 text-center mb-8">Login</h1>
    //         <div>
    //             <div className="bg-blue-200 flex items-center gap-5" >
    //                 <input type="text"></input>
    //             </div>
    //             <div className="bg-blue-200 flex items-center gap-5">
    //                 <input type="email"></input>
    //             </div>
    //             <div className="bg-blue-200 flex items-center gap-5">
    //                 <input type="Password"></input>
    //             </div>
    //         </div>
    //     </div>
    // </div>
}

export default SignupLogin