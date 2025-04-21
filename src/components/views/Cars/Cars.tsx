import ButtonsAction from "@/components/commons/ButtonsAction/ButtonsAction";
import DataTable from "@/components/ui/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect, useId } from "react";
import { COLUMN_LISTS_CARS } from "./Cars.constants";
import useCars from "./useCars";
import useManipulate from "./useManipulate";
import { ICar } from "@/types/Car";

const Cars = () => {
  const { push, isReady, query } = useRouter();
  const uniqueID = useId();

  const {
    dataCars,

    isLoadingCars,
    isRefetchingCars,

    refetchCars,
    selectedId,
    setSelectedId,
  } = useCars();

  const { handleAddCar, handleDeleteCar } = useManipulate();

  const addCarsModal = useDisclosure();
  const deleteCarsModal = useDisclosure();

  const { setURL } = useChangeUrl();

  useEffect(() => {
    if (isReady) setURL();
  }, [isReady]);

  const renderCell = useCallback(
    (car: ICar, columKey: Key) => {
      const cellValue = car[columKey as keyof typeof car];

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
        case "actions":
          return (
            <ButtonsAction
              onPressButtonAdd={() => handleAddCar(car)}
              onPressButtonDetail={() => {}}
              onPressButtonUpdate={() => {
                setSelectedId(`${car?.id}`);
              }}
              onPressButtonDelete={() => handleDeleteCar(car?.id || "")}
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
          columns={COLUMN_LISTS_CARS}
          data={dataCars || []}
          emptyContent="Cars is empty"
          isLoading={isLoadingCars || isRefetchingCars}
          onClickButtonTopContent={addCarsModal.onOpen}
          renderCell={renderCell}
          totalPages={0}
          placeholderSearch="Search by name"
        />
      )}
    </section>
  );
};

export default Cars;
