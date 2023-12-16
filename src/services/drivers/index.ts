import request from "../../utils/request";
const driverService = {
  getList: (params: any) =>
    request.get(
      `/drivers?page=${params.page}q=${params.q}&perPage=${params.perPage}${
        params?.car_id ? `&car_id=${params.car_id}` : ""
      }`
    ),
  createElement: (data: any) => request.post("/drivers", { ...data }),
  getActives: (params: any) => request.get(`/drivers-popular?q=${params.q}`),
  updateElement: (id: string, data: any) => request.put(`/drivers/${id}`, data),
  deleteElement: (id: string) => request.delete(`/drivers/${id}`),
  getElement: (id: string | undefined) => request.get(`/drivers/${id}`),
  getDriverTripHistory: (id: string | undefined) =>
    request.get(`booking/driver-trips/${id}`),
};

export default driverService;
