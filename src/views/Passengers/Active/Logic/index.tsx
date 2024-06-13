import { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import passengerService from "../../../../services/passengers";
import reasonService from "../../../../services/reason";
import { getStoredFilters } from "../../../../components/UI/Filter/Logic";

export const breadCrubmsItems = [
  {
    label: "Yo'lovchi",
    link: "/passengers/passenger-list",
  },
  {
    label: "Aktiv",
  },
];

export const Status = [
  { value: "created", label: "Qidiryapti" },
  { value: "driver_accepted", label: "Topildi" },
  { value: "on-way", label: "Safarda" },
  { value: "done", label: "Yetib bordi" },
  { value: "canceled_by_driver", label: "Haydovchi bekor qildi" },
  { value: "canceled_by_client", label: "Yo'lovchi bekor qildi" },
];

export const FetchFunction = () => {
  const [driverLists, setDriverLists] = useState();
  const [openModal, setOpenModal] = useState(false);
  const { filters } = getStoredFilters({});
  const { q, reason, status, page } = filters;

  const {
    data: passengers,
    isLoading,
    refetch,
  } = useQuery(["GET_ACTIVE_PASSENGERS", q, page, reason, status], () => {
    return passengerService.getActivePassengers({
      q,
      page: page || 1,
      reason: reason?.value,
      status: status?.value,
    });
  });

  const { mutate: postReason } = useMutation({
    mutationFn: (data: any) => {
      return reasonService.postReason(data).then(() => {
        refetch();
      });
    },
  });

  const bodyColumns: any = useMemo(() => {
    const list =
      passengers?.data?.map((item: any) => {
        return {
          ids: {
            id: item.id,
            reason_id: item.reason_id,
          },
          ...item,
          from: {
            from_region_name: item?.from_region_name,
            from_district_name: item?.from_district_name,
          },
          to: {
            to_region_name: item?.to_region_name,
            to_district_name: item?.to_district_name,
          },
          info: {
            name: item?.full_name,
            gender: item?.gender,
            img: item?.image,
          },
          notelist: {
            id: item.id,
            notelist: item.notes_count,
          },
        };
      }) ?? [];

    return (
      {
        list,
        ...passengers,
      } ?? []
    );
  }, [passengers]);

  return {
    bodyColumns,
    isLoading,
    refetch,
    driverLists,
    setDriverLists,
    openModal,
    setOpenModal,
    postReason,
  };
};
