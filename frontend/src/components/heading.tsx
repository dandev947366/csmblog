import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Link} from 'react-router-dom'
interface PageHeadingProps {
    breadcrumb: {
        title: string;
        route: string;
    };
}

const PageHeading: React.FC<PageHeadingProps> = ({ breadcrumb }) => {
    return (
        <div className="page-heading py-[20px] bg-white border-b border-[#e7eaec]">
            <div className="px-[10px]">
                {/* Use the breadcrumb.title prop dynamically */}
                <h2 className="text-[24px] font-semibold mb-[5px]">{breadcrumb.title}</h2>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link to="/dashboard">Dashboard</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {/* Use the breadcrumb.route and breadcrumb.title props dynamically */}
                            <Link to={breadcrumb.route}>{breadcrumb.title}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    );
};

export default PageHeading;
