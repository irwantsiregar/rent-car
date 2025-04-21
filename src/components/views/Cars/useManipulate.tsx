import CarServices from "@/services/cars.service";
import { ICar } from "@/types/Car";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import useCars from "./useCars";

const useManipulate = () => {
  const { refetchCars } = useCars();

  const addCar = async (data: ICar) => {
    const payload = { ...data };

    delete payload.id;

    const response = await CarServices.addCar(payload);

    return response;
  };

  const deleteCar = async (id: string | number) => {
    const response = await CarServices.deleteCar(id);

    return response;
  };

  const {
    mutate: mutateAddCar,
    isPending: isPendingMutateAddCar,
    isSuccess: isSuccessMutateAddCar,
  } = useMutation({
    mutationFn: addCar,
    onError: () => {
      addToast({
        title: "Fail Order",
        description: "Order has been fail",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Success Order",
        description: "Order successfully..",
        color: "success",
      });

      refetchCars();
    },
  });

  const {
    mutate: mutateDeleteCar,
    isPending: isPendingMutateDeleteCar,
    isSuccess: isSuccessMutateDeleteCar,
  } = useMutation({
    mutationFn: deleteCar,
    onError: () => {
      addToast({
        title: "Fail Delete",
        description: "Delete has been fail",
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Success Delete",
        description: "Delete Car successfully..",
        color: "success",
      });

      refetchCars();
    },
  });

  const handleAddCar = (data: ICar) => mutateAddCar(data);

  const handleDeleteCar = (id: string) => mutateDeleteCar(id);

  return {
    handleAddCar,
    handleDeleteCar,
    isPendingMutateAddCar,
    isSuccessMutateAddCar,
    isPendingMutateDeleteCar,
    isSuccessMutateDeleteCar,
  };
};

export default useManipulate;
