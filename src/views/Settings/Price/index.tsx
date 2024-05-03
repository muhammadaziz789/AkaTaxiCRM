import CTabs from "../../../components/CElements/CTab";
import { useGetQueries } from "../../../hooks/useGetQueries";
// import { useSelector } from "react-redux";
import { Header } from "../../../components/UI/Header";
import CBreadcrumbs from "../../../components/CElements/CBreadcrumbs";
import { breadCrumbs, tabList, TabActions } from "./Logic";

const Price = () => {
  const { currentTab } = useGetQueries();
  const { GetCurrentPage } = TabActions();
  // const regions = useSelector((state: any) => state.regions.regions);

  return (
    <>
      <Header sticky={true}>
        <CBreadcrumbs items={breadCrumbs} progmatic={true} />
      </Header>
      <div className="px-5">
        <div className="flex">
          <CTabs tabList={tabList} />
        </div>

        {GetCurrentPage(currentTab)}
      </div>
    </>
  );
};
export default Price;
