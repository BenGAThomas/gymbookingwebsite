import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className ='bg-green-500'>
      <div className='justify-between items-center flex py-5 px-5'>
        <div>
          {/*logo/website name*/}  
            <h1 className="text-red-600">Coach Finder</h1>
        </div>
      
        <div className="space-x-5 hidden md:block">
        <Link to='/'>Home</Link>
        <Link to='/signup'>Signup</Link>
        <Link to='/login'>Login</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/coaches'>Coaches</Link>
        <Link to='/contactUs'>Contact Us</Link>
        </div>
        <button onClick={toggleMenu} className='md:hidden'>
          {isOpen?(
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="space-y-5 md:hidden">
          <Link className="flex" to='/'>Home</Link>
          <Link className="flex" to='/signup'>Signup</Link>
          <Link className="flex" to='/login'>Login</Link>
          <Link className="flex" to='/profile'>Profile</Link>
          <Link className="flex" to='/coaches'>Coaches</Link>
          <Link className="flex" to='/contactUs'>Contact Us</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar