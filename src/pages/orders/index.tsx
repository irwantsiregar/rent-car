import DashboardLayout from "@/components/layouts/DashboardLayout";
import Orders from "@/components/views/Orders";

function OrdersPage() {
  return (
    <DashboardLayout
      title="Orders"
      description="List of all car in orders"
      type="admin"
    >
      <Orders />
    </DashboardLayout>
  );
}

export default OrdersPage;
