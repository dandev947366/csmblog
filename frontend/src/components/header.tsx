import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { IoGridOutline } from "react-icons/io5";
import { BsFullscreenExit } from "react-icons/bs"
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="app-header h-14 fixed w-full content-center top-0 bg-white">
      <div className="main-header mx-auto px-15px h-full flex items-stretch justify-between">
      <HiOutlineBars3CenterLeft className="text-30px cursor-pointer"/>
      <div className="header-right-content flex justify-between items-center">
        <div className="header-search">
          <IoIosSearch className="text-30px cursor-pointer"/>
          <div className="cart-dropdown">
            <Link to="/" className="header-link"><FiShoppingCart  /><span className="badge">5</span></Link>
          </div>
          <div className="notification-dropdown">
            <Link to="/" className="header-link"><GoBell  /><span className="badge">5</span></Link>
          </div>
          <div className="shortcut-dropdown">
            <Link to="/" className="header-link"><IoGridOutline  /><span className="badge">5</span></Link>
          </div>
          <div className="shortcut-dropdown">
            <BsFullscreenExit  /><span className="badge">5</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Header