import { useEffect } from "react";
import { RootState } from "../../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../../../helpers/myHelper";
import { clearToast } from "../../../redux/slice/toastSlice";
import PageHeading from "../../../components/heading"
import { Checkbox } from "../../../components/ui/checkbox"
import { Switch } from "../../../components/ui/switch"
import { Button } from "../../../components/ui/button"
import {Link} from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"

interface PageHeadingProps {
  title: string,
  to: string
}
function User() {
  const breadcrumb = {
    title: 'Manage user',
    route: '/user/index'
  }

  return (
    <div>
      <PageHeading breadcrumb={breadcrumb} />
      <div className="container">
        <Card className='rounded-[5px] mt-[15px]'>
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-15px ">
            <CardTitle className="uppercase">Manage User List </CardTitle>
            <CardDescription className="text-xs text-[red]">Show user list, filter and sort users</CardDescription>
          </CardHeader>
          <CardContent className="p-15px">
            <Table className="border border-solid border-[#f3f3f3]">
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                <TableHead><Checkbox className="text-white border-solid border-[#cac8c8]"  /></TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Full name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>User group</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                <TableCell><Checkbox className="text-white mr-1 border-solid border-[#cac8c8]"  /></TableCell>
                  <TableCell className="font-medium">HT000001</TableCell>
                  <TableCell>Dan Le</TableCell>
                  <TableCell>dan.dev947366@gmail.com</TableCell>
                  <TableCell>013 123 1234</TableCell>
                  <TableCell>Helsinki, Finland</TableCell>
                  <TableCell>Administrator</TableCell>
                  <TableCell><Switch /></TableCell>
                  <TableCell>
                  <Button variant="outline" className="bg-primary">
                  <Link to="user/update"><FaEdit className="text-white" /></Link>
                  </Button>
                  </TableCell>

                </TableRow>
              </TableBody>
            </Table>

          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default User;
