import { HiOutlineBars3CenterLeft, HiOutlineCog6Tooth } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { IoGridOutline, IoExitOutline } from "react-icons/io5";
import { BsFullscreenExit } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
function Header() {

  return (
    <div className="app-header h-14 fixed w-full content-center top-0 bg-white">
      <div className="main-header mx-auto px-15px h-full flex items-stretch justify-between">
        <HiOutlineBars3CenterLeft className="text-25px cursor-pointer mt-4" />
        <div className="header-right-content flex justify-between items-center">
          <div className="header-search flex items-center space-x-4">
            <IoIosSearch className="text-25px cursor-pointer" />
            <div className="cart-dropdown">
              <Link to="/" className="header-link flex relative">
                <FiShoppingCart className="cursor-pointer header-link-icon" />
                <span className="badge absolute top-[2px] right-[2px] text-[10px] text-white w-[14px] h-[15px] text-center rounded-full bg-primary font-semi-bold">5</span>
              </Link>
            </div>
            <div className="notification-dropdown">
              <Link to="/" className="header-link flex relative">
                <GoBell className="cursor-pointer header-link-icon" />
                <span className="badge absolute top-[2px] right-[2px] text-[10px] text-white w-[14px] h-[15px] text-center rounded-full bg-second font-semi-bold">5</span>
              </Link>
            </div>
            <div className="shortcut-dropdown">
              <Link to="/" className="header-link flex">
                <IoGridOutline className="cursor-pointer header-link-icon" />
              </Link>
            </div>
            <div className="fullscreen">
              <Link to="/" className="header-link flex">
                <BsFullscreenExit className="cursor-pointer header-link-icon" />
              </Link>
            </div>
            <div className="profile">
              <DropdownMenu className="outline-none">
                <DropdownMenuTrigger className="flex">
                  <Avatar className="mr-4">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="profile-content text-left">
                    <div className="font-semibold">Dan Le</div>
                    <div className="role text-xs text-[#536485]">Administrator</div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="top-10">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center text-[#333335] cursor-pointer"><CgProfile className="mr-2 text-[18px]" />Profile</DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center text-[#333335] cursor-pointer"><IoExitOutline className="mr-2 text-[18px]" />Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="header-setting">
                <div className="header-link flex">
                  <HiOutlineCog6Tooth className="header-link-icon cursor-pointer animate-spin spin-low" />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
