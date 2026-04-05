import { ReactNode } from "react";
import { TUnitProps } from "@/types/unit";

type UnitManagementMobileListProps = {
  units: TUnitProps[];
  getStatusStyle: (status: string) => string;
  renderActionButton: (unit: TUnitProps) => ReactNode;
};

const getUnitIconStyle = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-teal-50 text-[#2db6b6]";
    case "Occupied":
      return "bg-red-50 text-red-500";
    case "Cleaning In Progress":
      return "bg-yellow-50 text-yellow-600";
    default:
      return "bg-orange-50 text-orange-500";
  }
};

const getStatusDotStyle = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-green-500";
    case "Occupied":
      return "bg-red-500";
    case "Cleaning In Progress":
      return "bg-yellow-500";
    default:
      return "bg-orange-500";
  }
};

export default function UnitManagementMobileList({
  units,
  getStatusStyle,
  renderActionButton,
}: UnitManagementMobileListProps) {
  return (
    <div className="space-y-3">
      {units.map((unit) => (
        <div
          key={unit.id}
          className="rounded-xl border border-gray-200 bg-white p-4"
        >
          <div className="mb-3 flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div
                className={`h-9 w-9 shrink-0 rounded-lg ${getUnitIconStyle(
                  unit.status,
                )} flex items-center justify-center`}
              >
                {unit.type === "cabin" ? (
                  <i className="fi fi-rr-home text-sm leading-none" />
                ) : (
                  <i className="fi fi-rr-bed text-sm leading-none" />
                )}
              </div>

              <div>
                <p className="text-sm font-medium leading-snug text-gray-800">
                  {unit.name}
                </p>
                <span className="mt-0.5 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                  {unit.type}
                </span>
              </div>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                unit.status,
              )}`}
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${getStatusDotStyle(
                  unit.status,
                )}`}
              />
              {unit.status}
            </span>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <div className="w-full [&>button]:w-full [&>button]:justify-center [&>button]:rounded-lg [&>button]:py-2.5">
              {renderActionButton(unit)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
