import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import "../assets/scss/Accordion.scss"
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
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
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
                                <FaUser className="text-sm mr-2" /><span>Users</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes. It adheres to the WAI-ARIA design pattern.
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