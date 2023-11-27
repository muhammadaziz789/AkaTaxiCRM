import Points from "./Points";
import PriceTable from "./Table";

const DynamicPrice = ({
  regions = [],
  selected = [],
  locations = {},
  edit = false,
  changesLis = [],
  setChangesList = () => {},
  loading = false,
}: {
  regions: any;
  selected: any;
  locations: any;
  edit: boolean;
  changesLis: any;
  loading: boolean;
  setChangesList: (val: any) => void;
}) => {
  const updateCell = (status: string, val: any, object: any) => {
    console.log(status, val, object);

    const obj: any = object;
    status === "price" ? (obj.price = val) : (obj.fee = val);

    if (changesLis.some((i: any) => i.id === obj.id)) {
      const list: any = changesLis.filter((i: any) => i.id !== obj.id);
      list.push(obj);
      setChangesList(list);
    } else {
      setChangesList((prev: any) => [...prev, obj]);
    }
  };

  return (
    <>
      <Points regions={regions} selected={selected} />

      <div>
        {Object.keys(locations).length !== 0 && !loading ? (
          <PriceTable
            locations={locations}
            edit={edit}
            updateCell={updateCell}
          />
        ) : (
          <div className="flex justify-center mt-10">
            {loading ? (
              <h1 className="text-lg">Yuklanmoqda...</h1>
            ) : (
              <div className="text-center">
                <img className="w-[200px]" src="/images/no-data.png" />
                <h2>Ma'lumot mavjud emas</h2>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DynamicPrice;
