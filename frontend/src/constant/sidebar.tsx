import { FaHome, FaUser } from "react-icons/fa";

// No JSX here, just references to the icon components
export const sidebarItem = [
    {
        label: 'MAIN',
        items: [
            {
                icon: FaHome, // React component reference, not JSX (<FaHome />)
                active: ['dashboard'],
                label: "Dashboard",
                links: [
                    { title: 'Main dashboard', to: '/dashboard' },
                    { title: 'Order dashboard', to: '/dashboard/order' }
                ]
            }
        ],
    },
    {
        label: 'FUNCTION',
        items: [
            {
                icon: FaUser,
                active: ['user'],
                label: "Users",
                links: [
                    { title: 'User catalogue', to: '/user/catelogue/index' },
                    { title: 'Manage user', to: '/user/index' }
                ]
            }
        ],
    }
];
