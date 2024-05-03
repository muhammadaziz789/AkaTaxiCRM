// import Card from "./Card";
import NullData from "../../../../components/UI/NullData";
import Header from "./Header";
import Standard from "./Standar";
import Comfort from "./Comfort";
import Bussness from "./Bussniss";
import { useQuery } from "react-query";
import carService from "../../../../services/cars";
import { useMemo } from "react";
import { useGetQueries } from "../../../../hooks/useGetQueries";

interface Props {
  list: any;
  isLoading?: boolean;
  loading: boolean
  setInputValue?: any
}

const Section = ({ setInputValue, list = [], loading = true, }: Props) => {
  const { q } = useGetQueries()



  const { data: standart } = useQuery(['GET_STANDART', q], () => {
    return carService.getList(1, q)
  })

  const standartData = useMemo(() => {
    return standart?.data ?? []
  }, [standart])

  const { data: comfort } = useQuery(['GET_COMFORT', q], () => {
    return carService.getList(2, q)
  })

  const comfortData = useMemo(() => {
    return comfort?.data ?? []
  }, [comfort])

  const { data: bussniss } = useQuery(['GET_BUSSNESS', q], () => {
    return carService.getList(3, q)
  })

  const bussnissData = useMemo(() => {
    return bussniss?.data ?? []
  }, [bussniss])


  return (
    <>
      <div className="bg-white p-2 border border-[var(--lightGray)] rounded-xl">
        <Header standart={standartData.length} comfort={comfortData.length} bussniss={bussnissData.length} />
        {list?.length && !loading ? (
          <div className="grid grid-cols-3">

            {/* {list.map((element: any) => (
              <div key={element.id}>
                <Card element={element} />
              </div>
            ))} */}
            <Standard data={standartData} setInputValue={setInputValue} />
            <Comfort data={comfortData} setInputValue={setInputValue} />
            <Bussness data={bussnissData} setInputValue={setInputValue} />
          </div>
        ) : (
          loading ? "Yuklanmoqda..." : <NullData />
        )}
      </div>
    </>
  );
};

export default Section;
