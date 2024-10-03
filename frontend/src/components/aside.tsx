import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import "../assets/scss/Accordion.scss"
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaCube } from "react-icons/fa";
function Aside() {
    return (
        <div className="app-aside bg-[#111c43] w-60 h-full z-10 fixed">
            <div className="main-sidebar-header">
                <p>
                    <h1 className="text-[#a3aed1] text-center bg-[#111c43] w-60 h-full px-6 py-3 text-[30px]">CSM Blog</h1>
                    <hr className="text-[#a3aed1]" />
                </p>
            </div>
            <div className="main-sidebar mt-1 text-[#a3aed1]">
                <div className="menu-category px-6 py-2">MAIN</div>
                <Accordion type="single" collapsible className="px-3 sidebar-accordion">
                    <AccordionItem value="item-1" className="border-lg bg-[rgba(255, 255, 255, 0.05)]">
                        <AccordionTrigger className="text-[#a3aed1]">
                            <div className="menu-label flex flex-1 items-center">
                                <FaHome className="text-sm mr-2" /><span>Dashboard</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="border-0 mt-2">
                            <ul>
                                <li className="pl-6">
                                    <Link to="#" className="side-menu__item block text-[#a3aed1] text-13px relative hover:text-white p-2 rounded-lg hover:bg-[rgba(255,255,255,0.5)]">General Report</Link>
                                    <span className="absolute left-2 top-1/2 transform -transform-y-1/2 2 w-1 h-1 border border-solid border-primary rounded-full border-white"></span>
                                </li>
                                <li className="pl-6">
                                    <Link to="#" className="side-menu__item block text-[#a3aed1] text-13px relative hover:text-white p-2 rounded-lg hover:bg-[rgba(255,255,255,0.5)]">Orders Report</Link>
                                    <span className="absolute left-2 top-1/2 transform -transform-y-1/2 2 w-1 h-1 border border-solid border-primary rounded-full border-white"></span>
                                </li>

                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="main-sidebar mt-1 text-[#a3aed1]">
                <div className="menu-category px-6 py-2">FUNCTION</div>
                <Accordion type="single" collapsible className="px-3 sidebar-accordion">
                    <AccordionItem value="item-1" className="border-lg bg-[rgba(255, 255, 255, 0.05)]">
                        <AccordionTrigger className="text-[#a3aed1]">
                            <div className="menu-label flex flex-1 items-center">
                                <FaUser className="text-sm mr-2" /><span>Mange Users</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="border-0 mt-2">
                            <ul>
                                <li className="pl-6">
                                    <Link to="#" className="side-menu__item block text-[#a3aed1] text-13px relative hover:text-white p-2 rounded-lg hover:bg-[rgba(255,255,255,0.5)]">Manage Groups</Link>
                                    <span className="absolute left-2 top-1/2 transform -transform-y-1/2 2 w-1 h-1 border border-solid border-primary rounded-full border-white"></span>
                                </li>
                                <li className="pl-6">
                                    <Link to="#" className="side-menu__item block text-[#a3aed1] text-13px relative hover:text-white p-2 rounded-lg hover:bg-[rgba(255,255,255,0.5)]">Manage User</Link>
                                    <span className="absolute left-2 top-1/2 transform -transform-y-1/2 2 w-1 h-1 border border-solid border-primary rounded-full border-white"></span>
                                </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-lg bg-[rgba(255, 255, 255, 0.05)]">
                        <AccordionTrigger className="text-[#a3aed1]">
                            <div className="menu-label flex flex-1 items-center">
                                <FaUser className="text-sm mr-2" /><span>Products</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>

        </div>
    )
}

export default Aside