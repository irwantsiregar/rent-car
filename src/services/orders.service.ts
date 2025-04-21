import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const ordersServices = {
  getOrders: (params?: string, isSearch?: boolean) =>
    instance.get(`${endpoint.ORDERS}`),
};

export default ordersServices;
