"use client";

import { useState } from "react";
import { useUnits } from "@/hooks/useUnits";
import NewUnitModal from "@/components/modal/NewUnitModal";
import { TUnitProps } from "@/types/unit";

type TInspectionStateProps = {
  bed: boolean;
  bathroom: boolean;
  electricity: boolean;
};

export default function UnitManagementTable() {
  const { units, getUnits, changeUnitStatus } = useUnits();
  const [isNewUnitModalOpen, setIsNewUnitModalOpen] = useState<boolean>(false);
  const [checkoutUnit, setCheckoutUnit] = useState<TUnitProps | null>(null);

  const [inspection, setInspection] = useState<TInspectionStateProps>({
    bed: false,
    bathroom: false,
    electricity: false,
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";
      case "Occupied":
        return "bg-red-100 text-red-700";
      case "Cleaning In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Maintenance Needed":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const openCheckoutModal = (unit: TUnitProps) => {
    setCheckoutUnit(unit);
    setInspection({
      bed: false,
      bathroom: false,
      electricity: false,
    });
  };

  const handleInspectionSubmit = () => {
    if (!checkoutUnit) return;

    const allGood = Object.values(inspection).every(Boolean);
    changeUnitStatus(
      checkoutUnit.id,
      allGood ? "Cleaning In Progress" : "Maintenance Needed",
    );

    setCheckoutUnit(null);
  };

  const actionButtonBaseClass =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-colors focus:outline-none";

  const renderActionButton = (unit: TUnitProps) => {
    switch (unit.status) {
      case "Available":
        return (
          <button
            onClick={() => changeUnitStatus(unit.id, "Occupied")}
            className={`${actionButtonBaseClass} border border-[#2db6b6] text-[#2db6b6] hover:bg-[#2db6b6]/10`}
          >
            Check In
          </button>
        );

      case "Occupied":
        return (
          <button
            onClick={() => openCheckoutModal(unit)}
            className={`${actionButtonBaseClass} border border-red-500 text-red-600 hover:bg-red-50`}
          >
            Check Out
          </button>
        );

      case "Cleaning In Progress":
      case "Maintenance Needed":
        return (
          <button
            onClick={() => changeUnitStatus(unit.id, "Available")}
            className={`${actionButtonBaseClass} border border-orange-500 text-orange-700 hover:bg-orange-50`}
          >
            Resolve
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="px-8 pt-8 pb-4 bg-white">
        <div className="flex justify-between items-center">
          <div className="relative">
            <select
              onChange={(e) => getUnits(e.target.value)}
              defaultValue=""
              className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm bg-white text-gray-600 \
							focus:outline-none hover:border-[#2db6b6]/50 transition"
            >
              <option value="">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Cleaning In Progress">Cleaning In Progress</option>
              <option value="Maintenance Needed">Maintenance Needed</option>
            </select>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <i className="fi fi-rr-angle-small-down text-sm" />
            </div>
          </div>

          <button
            onClick={() => setIsNewUnitModalOpen(true)}
            className="flex items-center gap-2 bg-[#2db6b6] hover:bg-[#25a5a5] text-white \
			px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
          >
            <i className="fi fi-rr-plus-small text-sm leading-none" />
            Add New Unit
          </button>
        </div>
      </div>

      <div className="overflow-x-auto min-h-72 bg-white p-6">
        <table className="w-full text-center rounded-4xl overflow-hidden border-separate border-spacing-b-2 min-w-175">
          <thead className="bg-[#d9f2f2]">
            <tr className="text-sm text-gray-500">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {units?.map((unit) => (
              <tr
                key={unit.id}
                className="bg-white hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-700">
                  <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2db6b6]/10 text-[#2db6b6]">
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
                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100">
                    {unit.type}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${getStatusStyle(
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

        {checkoutUnit && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Unit Inspection
              </h3>

              <p className="text-sm text-gray-500 mb-4">{checkoutUnit.name}</p>

              <div className="flex flex-col gap-3 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-[#2db6b6]"
                    checked={inspection.bed}
                    onChange={(e) =>
                      setInspection({ ...inspection, bed: e.target.checked })
                    }
                  />
                  Bed Condition OK
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-[#2db6b6]"
                    checked={inspection.bathroom}
                    onChange={(e) =>
                      setInspection({
                        ...inspection,
                        bathroom: e.target.checked,
                      })
                    }
                  />
                  Bathroom Clean
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-[#2db6b6]"
                    checked={inspection.electricity}
                    onChange={(e) =>
                      setInspection({
                        ...inspection,
                        electricity: e.target.checked,
                      })
                    }
                  />
                  Electricity Working
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setCheckoutUnit(null)}
                  className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleInspectionSubmit}
                  className="px-4 py-2 text-sm bg-[#2db6b6] hover:bg-[#25a5a5] text-white rounded-lg transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <NewUnitModal
        isOpen={isNewUnitModalOpen}
        onClose={() => setIsNewUnitModalOpen(false)}
        onSuccess={() => getUnits()}
      />
    </>
  );
}
