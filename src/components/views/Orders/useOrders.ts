import useChangeUrl from "@/hooks/useChangeUrl";
import ordersServices from "@/services/orders.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useOrders = () => {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<string>("");

  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getOrders = async () => {
    let params = `limit=${currentLimit}`;

    if (currentPage) {
      params += `&page=${currentPage}`;
    }

    const res = await ordersServices.getOrders(params, currentSearch !== "");
    const { data } = res;

    return data;
  };

  const {
    data: dataOrders,
    isLoading: isLoadingOrders,
    isRefetching: isRefetchingOrders,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["Orders", currentPage, currentLimit, currentSearch],
    queryFn: () => getOrders(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataOrders,
    isLoadingOrders,
    isRefetchingOrders,
    refetchOrders,
    selectedId,
    setSelectedId,

    currentLimit,
    currentPage,
  };
};

export default useOrders;
