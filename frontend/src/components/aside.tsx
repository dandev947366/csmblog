import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import "../assets/scss/Accordion.scss"
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaCube } from "react-icons/fa";
import sidebarItem from "../constant/sidebar.js";

function Aside() {
    return (
        <div className="app-aside bg-[#111c43] w-60 h-full z-10 fixed">
            <div className="main-sidebar-header">
                <div>
                    <h1 className="text-[#a3aed1] text-center bg-[#111c43] w-60 h-full px-6 py-3 text-[30px]">CSM Blog</h1>
                    <hr className="text-[#a3aed1]" />
                </div>
            </div>

            <div className="main-sidebar mt-1 text-[#a3aed1]">
                <div className="menu-category px-6 py-2">MAIN</div>
                {sidebarItem && sidebarItem.map((group, groupIndex) => (
                    <Accordion key={index} type="single" collapsible className="px-3 sidebar-accordion">
                        <AccordionItem value={`item-${index + 1}`} className="border-lg bg-[rgba(255, 255, 255, 0.05)]">
                            <AccordionTrigger className="text-[#a3aed1]">
                                <div className="menu-label flex flex-1 items-center">
                                    <FaHome className="text-sm mr-2" /><span>{item.label}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="border-0 mt-2">
                                <ul>
                                    {item.subItems.map((subItem, subIndex) => (
                                        <li className="pl-6" key={subIndex}>
                                            <Link to={subItem.link} className="side-menu__item block text-[#a3aed1] text-13px relative hover:text-white p-2 rounded-lg hover:bg-[rgba(255,255,255,0.5)]">
                                                {subItem.label}
                                            </Link>
                                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 w-1 h-1 border border-solid border-primary rounded-full border-white"></span>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </div>
    )
}

export default Aside;
