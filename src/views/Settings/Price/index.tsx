import { useEffect, useMemo, useState } from "react";
import AddButton from "../../../components/Buttons/AddButton";
import CTabs from "../../../components/CElements/CTab";
import { useGetQueries } from "../../../hooks/useGetQueries";
import DynamicPrice from "./DynamicPrice";
import StaticPrice from "./StaticPrice";
import { useSelector } from "react-redux";
import priceService from "../../../services/price";
import { Header } from "../../../components/Header";
const tabList = [
  {
    slug: "static",
    name: "Statik narxlar",
  },
  {
    slug: "regional_price",
    name: "Viloyatlararo narxlar",
  },
];

const getCities = (arr: any, direction: string) => {
  const result = arr.reduce((accumulator: any, currentObject: any) => {
    const existingObject = accumulator.find(
      (obj: any) => obj[direction] === currentObject[direction]
    );

    if (existingObject) {
      existingObject.list = [];
      existingObject.value += currentObject.value;
    } else {
      accumulator.list = [];
      accumulator.push({ ...currentObject });
    }

    return accumulator;
  }, []);

  return result;
};

const Price = () => {
  const { currentTab, start, end } = useGetQueries();
  const [edit, setEdit] = useState(false);
  const regions = useSelector((state: any) => state.regions.regions);

  const selected: any = useMemo(() => {
    const first = regions.find((i: any) => i.id == start);
    const second = regions.find((i: any) => i.id == end);
    return [first, second];
  }, [start, end, regions]);

  const [locations, setLocations] = useState<any>({});
  const [changesList, setChangesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetPrices = () => {
    setLoading(true);
    priceService
      .getList({
        start_region_id: start,
        end_region_id: end,
      })
      .then((res) => {
        if (!res?.data?.length) return {};
        const arr: any = res?.data;

        const starting_cities = getCities(arr, "start_location_id");
        const ending_cities = getCities(arr, "end_location_id");

        for (let i = 0; i < arr.length; i++) {
          const obj = arr[i];
          for (let j = 0; j < ending_cities.length; j++) {
            if (obj.end_location_id === ending_cities[j]?.end_location_id) {
              ending_cities[j].list.push(obj);
            }
          }
        }

        setLocations({ starting_cities, ending_cities });
      })
      .finally(() => setLoading(false));
  };

  const handleSave = () => {
    if (!changesList.length) return;
    if (edit) {
      priceService
        .updateElement(changesList)
        .then((res) => {
          console.log("res", res);
        })
        .finally(() => setChangesList([]));
    }
  };

  useEffect(() => {
    setLocations({});
    if (start && end) GetPrices();
  }, [start, end]);

  return (
    <>
      <Header title="Adminlar" />
      <div className="px-5"> 
        <div className="flex justify-between">
          <CTabs tabList={tabList} />

          {currentTab === "regional_price" ? (
            <AddButton
              onClick={() => {
                setEdit((prev) => !prev);
                handleSave();
              }}
              iconLeft={false}
              text={edit ? "Saqlash" : "Tahrirlash"}
              style={{ maxWidth: "200px" }}
              id={edit ? "successBtn" : "addBtn"}
            />
          ) : (
            ""
          )}
        </div>

        <div>
          {currentTab === "regional_price" ? (
            <DynamicPrice
              regions={regions}
              selected={selected}
              locations={locations}
              edit={edit}
              changesLis={changesList}
              setChangesList={setChangesList}
              loading={loading}
            />
          ) : (
            <StaticPrice />
          )}
        </div>
      </div>
    </>
  );
};
export default Price;
