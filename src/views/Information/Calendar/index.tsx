import { useQuery } from "react-query";
import calendarService from "../../../services/calendar";
// import SectionHeader from "../../../components/Sections/Header";
// import FilterButton from "../../../components/Filters";
import CalendarUI from "./UI";
import { Skeleton } from "@mui/material";
import { Header } from "../../../components/Header";
import { GetMonth } from "../../../utils/getMonth";
// import BasicDatepicker from "../../../components/CElements/CDatePicker/BasicDatepicker";
// import MultiDatePicker from "../../../components/CElements/CDatePicker/MultiDatepicker";
// import { MultiDatePicker } from "../../../components/CElements/CDatePicker/MultiDatepicker";



const Calendar = () => {
  const month: any = GetMonth()

  const { data: calendar, isLoading } = useQuery(
    ["GET_CALENDAR"],
    () => { return calendarService.getList() }, { enabled: true, }
  );

  return (
    <>
      <Header title="Kalendar bo’yicha ma’lumotlar" />
      <div className="px-5">
        {/* <SectionHeader>
          <FilterButton text="filter" >
            <MultiDatePicker />
          </FilterButton>
        </SectionHeader> */}

        {!isLoading ? (
          <CalendarUI list={calendar?.data} month={month} />
        ) : (
          <div className="h-[1000px] mt-[-220px]">
            <Skeleton style={{ height: "100%", borderRadius: "14px" }} />
          </div>
        )}
      </div>
    </>
  );
};

export default Calendar;