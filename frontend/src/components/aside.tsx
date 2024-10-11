import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/ui/accordion"
import "../assets/scss/Accordion.scss"
import { Link } from "react-router-dom";
// import { FaHome, FaUser, FaCube } from "react-icons/fa";
import { sidebarItem } from '../constant/sidebar';
import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

function Aside() {
    const location = useLocation()
    // console.log(location)
    const segment = location.pathname

    const getOpenAccordianValue = () => {
        for (let groupIndex = 0; groupIndex < sidebarItem.length; groupIndex++) {
            const group = sidebarItem[groupIndex]
            for (let itemIndex = 0; itemIndex < group.items.length; itemIndex++) {
                const item = group.items[itemIndex]
                if (item.active.includes(segment)) {
                    return `item-${groupIndex}-${itemIndex}`
                }
            }
        }
    }
    const defaultValue = getOpenAccordianValue()
    // console.log(defaultValue);
    return (
        <div className="app-aside bg-[#111c43] w-60 h-full z-10 fixed top-0">
            <div className="main-sidebar-header">
                <div>
                    <h1 className="text-[#a3aed1] text-center bg-[#111c43] w-60 h-full px-6 py-3 text-[30px]">CSM Blog</h1>
                    <hr className="text-[#a3aed1]" />
                </div>
            </div>
            <div className="main-sidebar mt-1 text-[#a3aed1]">
                <div className="main-sidebar mt-1 text-[#a3aed1]">
                    {sidebarItem.map((group, groupIndex) => (
                        <div key={groupIndex}>
                            <div className="menu-category px-6 py-2">{group.label}</div>
                            {group.items.map((item, itemIndex) => (
                                <Accordion key={itemIndex} type="single" collapsible className="px-3 sidebar-accordion" defaultValue={defaultValue}>
                                    <AccordionItem value={`item-${itemIndex + 1}`} className="border-lg bg-[rgba(255, 255, 255, 0.05)]">
                                        <AccordionTrigger className={`rounded-lg ${item.active.includes(segment) ? 'text-[#a3aed1] bg-[rgba(255, 255, 255, 0.05)' : ''}`}>
                                            <div className={`menu-label flex flex-1 items-center text-[#a3aed1] ${item.active.includes(segment) ? 'text-white' : ''}`}>
                                                {/* Render the icon as a component */}
                                                <item.icon className="text-sm mr-2" />
                                                <span>{item.label}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="border-0 mt-2">
                                            <ul>
                                                {item.links.map((subItem, subIndex) => (
                                                    <li className="pl-6" key={subIndex}>
                                                        <Link
                                                            to={subItem.to}
                                                            className={`side-menu__item block text-[#a3aed1] text-13px relative hover:text-white p-2 rounded-lg hover:bg-[rgba(255,255,255,0.5)] ${location.pathname.includes(subItem.to) ? 'bg-white text-black' : ''
                                                                }`}
                                                        >
                                                            {subItem.title}
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
                    ))}
                </div>
            </div>
        </div>
    )
}


export default Aside;
