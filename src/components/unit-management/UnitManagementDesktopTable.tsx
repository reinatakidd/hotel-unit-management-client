import { ReactNode } from "react";
import { TUnitProps } from "@/types/unit";

type UnitManagementDesktopTableProps = {
  units: TUnitProps[];
  getStatusStyle: (status: string) => string;
  renderActionButton: (unit: TUnitProps) => ReactNode;
};

export default function UnitManagementDesktopTable({
  units,
  getStatusStyle,
  renderActionButton,
}: UnitManagementDesktopTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-175 overflow-hidden rounded-4xl border-separate border-spacing-b-2 text-center">
        <thead className="bg-[#d9f2f2]">
          <tr className="text-sm text-gray-500">
            <th className="px-6 py-3 font-medium">Name</th>
            <th className="px-6 py-3 font-medium">Type</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {units.map((unit) => (
            <tr key={unit.id} className="bg-white transition hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-700">
                <div className="flex items-center justify-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#2db6b6]/10 text-[#2db6b6] flex items-center justify-center">
                    {unit.type === "cabin" ? (
                      <i className="fi fi-rr-home text-sm leading-none" />
                    ) : (
                      <i className="fi fi-rr-bed text-sm leading-none" />
                    )}
                  </div>
                  {unit.name}
                </div>
              </td>

              <td className="px-6 py-4 text-gray-600">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                  {unit.type}
                </span>
              </td>

              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-sm ${getStatusStyle(
                    unit.status,
                  )}`}
                >
                  {unit.status}
                </span>
              </td>

              <td className="px-6 py-4">{renderActionButton(unit)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
