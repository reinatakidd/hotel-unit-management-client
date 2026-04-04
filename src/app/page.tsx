import UnitManagementTable from "@/components/unit-management/UnitManagementTable";
import Sidebar from "@/components/layout/Sidebar";
import UnitManagementNavbar from "@/components/unit-management/UnitManagementNavbar";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-scree flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <UnitManagementNavbar />
        <UnitManagementTable />
      </div>
    </div>
  );
}
