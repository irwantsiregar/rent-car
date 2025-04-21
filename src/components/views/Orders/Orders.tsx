import ButtonsAction from "@/components/commons/ButtonsAction/ButtonsAction";
import DataTable from "@/components/ui/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import { totalPages } from "@/utils/totalPages";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect, useId } from "react";
import { CiStar } from "react-icons/ci";
import { COLUMN_LISTS_ORDERS } from "./Orders.constants";
import useOrders from "./useOrders";

const Orders = () => {
  const { push, isReady, query } = useRouter();
  const uniqueID = useId();

  const {
    dataOrders,

    isLoadingOrders,
    isRefetchingOrders,

    refetchOrders,
    selectedId,
    setSelectedId,

    currentLimit,
    currentPage,
  } = useOrders();

  const addOrdersModal = useDisclosure();
  const deleteOrdersModal = useDisclosure();

  const { setURL } = useChangeUrl();

  useEffect(() => {
    if (isReady) setURL();
  }, [isReady]);

  console.log(dataOrders);

  const renderCell = useCallback(
    (post: Record<string, unknown>, columKey: Key) => {
      const cellValue = post[columKey as keyof typeof post];

      const isURL = typeof cellValue === "string" && cellValue.includes("http");

      switch (columKey) {
        case "image":
          return (
            <Image
              src={isURL ? cellValue : "/images/car_default.webp"}
              alt="Image"
              width={100}
              height={100}
              loading="lazy"
              className="rounded-lg"
            />
          );
        case "name":
          return <h4 className="flex font-semibold">{cellValue as string}</h4>;
        case "pickup_location":
          return (
            <Chip
              aria-label="pickup location"
              color="primary"
              className="border-default-200"
              size="sm"
            >
              {cellValue as string}
            </Chip>
          );
        case "dropoff_location":
          return (
            <Chip
              aria-label="dropoff location"
              color="secondary"
              className="border-default-200"
              size="sm"
            >
              {cellValue as string}
            </Chip>
          );
        case "actions":
          return (
            <ButtonsAction
              onPressButtonAdd={() => {}}
              onPressButtonDetail={() => {}}
              onPressButtonUpdate={() => {
                setSelectedId(`${post?.id}`);
              }}
              onPressButtonDelete={() => {
                setSelectedId(`${post?.id}`);
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LISTS_ORDERS}
          data={dataOrders || []}
          emptyContent="Orders is empty"
          isLoading={isLoadingOrders || isRefetchingOrders}
          onClickButtonTopContent={addOrdersModal.onOpen}
          renderCell={renderCell}
          totalPages={0}
          placeholderSearch="Search by name"
        />
      )}
    </section>
  );
};

export default Orders;
