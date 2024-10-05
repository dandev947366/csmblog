import { useEffect } from "react";
import { RootState } from "../../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../../../helpers/myHelper";
import { clearToast } from "../../../redux/slice/toastSlice";
import  PageHeading  from "../../../components/heading"
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
    </div>
  );
}

export default User;
