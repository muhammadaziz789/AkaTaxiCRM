import Ticket from "../Ticket";
import EmptyDataComponent from "../../../../../../components/UI/EmptyDataComponent";

interface Props {
  data: any;
  pageCount?: any;
  page?: number;
  setPage: (evt: any) => void;
}

const AllTrips = ({ data, pageCount, setPage = () => {}, page }: Props) => {
  const nextHandler = () => {
    pageCount != page ? setPage((prev: any) => prev + 1) : null;
  };

  const prevHandler = () => {
    1 != page ? setPage((prev: any) => prev - 1) : null;
  };

  return (
    <div>
      <Ticket data={data} />
      <EmptyDataComponent isVisible={!data.length} />
      {!data.length ? null : (
        <div className="flex mt-5 justify-center">
          <div className="flex gap-3">
            <button onClick={() => prevHandler()} className={`custom-btn ${page == 1 ? 'disabled' : ''}`}>
              Oldingisi
            </button>
            <button onClick={() => nextHandler()} className={`custom-btn ${pageCount == page ? 'disabled' : ''}`}>
              Keyingisi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTrips;
