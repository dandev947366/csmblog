import PageHeading from "../components/heading"
function Dashboard() {
  const breadcrumb = {
    title: 'Report',
    route: '/dashboard'
  }
  return (
    <div>
      <PageHeading breadcrumb={breadcrumb} />
    </div>
  );
}

export default Dashboard;
