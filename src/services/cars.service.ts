import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICar } from "@/types/Car";

const carsServices = {
  getCars: (params?: string) => instance.get(`${endpoint.CARS}`),
  addCar: (payload: ICar) => instance.post(`${endpoint.CARS}`, payload),
  deleteCar: (id: string | number) => instance.delete(`${endpoint.CARS}/${id}`),
  updateCar: (id: string, payload: ICar) =>
    instance.put(`${endpoint.CARS}/${id}`, payload),
};

export default carsServices;
