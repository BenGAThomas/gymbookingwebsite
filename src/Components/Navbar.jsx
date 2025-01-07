import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='register'>Register</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/coaches'>Coaches</Link>
        <Link to='/faqs'>FAQs</Link>
        <Link to='/contactUs'>Contact Us</Link>
    </nav>
  )
}

export default Navbar