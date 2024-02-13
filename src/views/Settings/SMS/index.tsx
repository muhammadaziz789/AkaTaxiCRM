import { useCallback, useMemo } from "react";
import AddButton from "../../../components/Buttons/AddButton";
import CTabs from "../../../components/CElements/CTab";
import usePageRouter from "../../../hooks/useObjectRouter";
import CTable from "../../../components/CElements/CTable";
import { Header } from "../../../components/Header";
import { useGetQueries } from "../../../hooks/useGetQueries";
import { useQuery } from "react-query";
import smsService from "../../../services/sms";
import TypeCard from "./SMSType";
import SMSMessage from "./Message";
import { FormatTime } from "../../../utils/formatTime";

const tabList = [
  {
    slug: "firebase",
    name: "Push xabar",
  },
  {
    slug: "sms",
    name: "Sms xabarnoma",
  },
  {
    slug: 'sms_result',
    name: 'Sms hisobotlar'
  }
  // {
  //   slug: "news",
  //   name: "Yangiliklar",
  // },
];

const SMS = () => {
  const { tab } = useGetQueries();
  const { navigateTo, navigateQuery } = usePageRouter();

  // const { data: sms } = useQuery(["GET_SMS_LIST", tab], () => {
  //   return smsService.getList(tab || "sms");
  // });


  const { data: smsReports } = useQuery(['GET_SMS_REPORTS', tab], () => {
    return smsService.getReports();
  })


  const bodyColumns = useMemo(() => {
    if (!smsReports?.data) return []
    return smsReports?.data
  }, [smsReports])

  const headColumns = useMemo(() => {
    return [
      {
        title: "Kimga",
        id: "phone",
        render:(val:any)=>{
          return <p>+{val}</p>
        }
      },
      {
        title: "Xabar",
        id: "text",
      },
      {
        title: "Status",
        id: "status",
        render: (val?:any) => {
          return <p className={`${val == 'DELIVERED'? 'text-green-500': 'text-red-500'}`}>{val == 'DELIVERED' ? 'Yuborildi':'Yuborilmadi'}</p>
        }
      },
      {
        title: "sana",
        id: "date",
        render: (val?: any) => {
          return <>{FormatTime(val, 'time')}</>;
        },
      },
    ];
  }, []);

  const handleActions = useCallback((status: string, element: any) => {
    if (status === "learn_more") {
      navigateTo(`/drivers/driver/${element.id}`);
    }

    if (status === "edit") navigateQuery({ id: element.id });

    if (status === "delete") {
    }
  }, []);

  const handleRowClick = (item: any) => {
    navigateTo(`/drivers/driver/${item.id}`);
  };


  return (
    <>
      <Header title="SMS xabarnoma"></Header>
      <div className="px-6">
        <div className="flex justify-between">
          <CTabs tabList={tabList} />

          <div>
            <AddButton
              text="Yangi xabar"
              onClick={() =>
                navigateTo(`/settings/sms/create/${tab || "sms"}`)
              }
            />
          </div>
        </div>

        {tab == 'firebase' ? <TypeCard title='Firebase' /> : tab == 'sms' ? <SMSMessage title='SMS' /> : <CTable
          headColumns={headColumns}
          bodyColumns={bodyColumns}
          count={1}
          handleActions={handleActions}
          handleRowClick={handleRowClick}
          isLoading={false}
          currentPage={1}
        />}

      </div>
    </>
  );
};
export default SMS;
