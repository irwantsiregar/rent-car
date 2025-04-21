import DashboardLayout from "@/components/layouts/DashboardLayout";
import Cars from "@/components/views/Cars";

function CarsPage() {
  return (
    <DashboardLayout title="Cars" description="List of all car">
      <Cars />
    </DashboardLayout>
  );
}

export default CarsPage;
