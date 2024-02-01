import { useMemo } from "react";
import SearchHeader from "../../../components/Header/SearchHeader";
import CCard from "../../../components/CElements/CCard";
import { ArrowUp, ArrowDown } from '../../../components/IconGenerator/Svg'
import { useQuery } from "react-query";
import driverService from "../../../services/drivers";
import { Skeleton } from "@mui/material";

const DriverStatistics = () => {
  const { data: widgets, isLoading } = useQuery(['GET_GRAPH_LIST'], () => {
    return driverService.getWidgets()
  })

  const widgetsData = useMemo(() => {
    return widgets?.data ?? []
  }, [widgets])

  return (
    <>
      <SearchHeader />
      <div className="sticky top-20 z-[12] py-[24px] pl-[12px]  w-[100%] bg-[var(--softGray)] ">
        <h1 className="text-2xl font-[600] text-[var(--black)] ml-[15px]">
          Statistika: haydovchi
        </h1>
      </div>
      <div className="px-6 ">
        <div className="flex items-center gap-4">
          {isLoading ? Array.from(new Array(4)).map((_) => <Skeleton animation="wave" width={210} height={150} />) : widgetsData?.map(({ id, name, quantity, change }: { id?: number, name?: string, quantity?: number, change?: any }) => {
            return <CCard style={{ minHeight: 0 }}>
              <div className="flex items-center gap-[18px]">
                {change > 0 ? <ArrowUp fill={true} /> : <ArrowDown fill={true} />}
                <div>
                  <p key={id} className="text-[28px] font-semibold flex items-center gap-4">{quantity}<span className={`text-base ${change > 0 ? 'text-[var(--green)]' : 'text-[var(--danger)]'}`}>{change > 0 ? '+' + change : change}%</span></p>
                  <p className="text-[var-(--gray)] text-sm ">{name}</p>
                </div>
              </div>
            </CCard>
          })}
        </div>

        <div className="pt-[18px]">
          <CCard>
            
          </CCard>
        </div>
      </div>

    </>
  );
};

export default DriverStatistics;
