import useChangeUrl from "@/hooks/useChangeUrl";
import carsServices from "@/services/cars.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useCars = () => {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<string>("");

  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getCars = async () => {
    let params = `limit=${currentLimit}`;

    if (currentPage) {
      params += `&page=${currentPage}`;
    }

    const res = await carsServices.getCars(params);
    const { data } = res;

    return data;
  };

  const {
    data: dataCars,
    isLoading: isLoadingCars,
    isRefetching: isRefetchingCars,
    refetch: refetchCars,
  } = useQuery({
    queryKey: ["Cars", currentPage, currentLimit, currentSearch],
    queryFn: () => getCars(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataCars,
    isLoadingCars,
    isRefetchingCars,
    refetchCars,
    selectedId,
    setSelectedId,
  };
};

export default useCars;
