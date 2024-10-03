import { FaHome, FaUser } from "react-icons/fa"


export const sideabarItem = [
    {
        'label':'MAIN',
        'items':[
            {
                icon: <FaHome className="text-sm mr-2"  />,
                label: "Dashboard",
                links:[
                    {title: 'Main dashboard', to: '/dashboard'},
                    {title: 'Order dashboard', to: '/dashboard/order'}

                ]
            }
        ],
    },
    {
        'label':'FUNCTION',
        'items':[
            {
                icon: <FaUser className="text-sm mr-2"  />,
                label: "Users",
                links:[
                    {title: 'User catelogue', to: '/user/catelogue'},
                    {title: 'Manage user', to: '/user'}

                ]
            }
        ],
    }
]