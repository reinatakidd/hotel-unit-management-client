"use client";

import { useEffect, useState } from "react";
import { useUnits } from "@/hooks/useUnits";
import NewUnitModal from "@/components/modal/NewUnitModal";
import UnitManagementDesktopTable from "@/components/unit-management/UnitManagementDesktopTable";
import UnitManagementMobileList from "@/components/unit-management/UnitManagementMobileList";
import { TUnitProps } from "@/types/unit";

type TInspectionStateProps = {
  bed: boolean;
  bathroom: boolean;
  electricity: boolean;
};

export default function UnitManagementContent() {
  const { units, getUnits, changeUnitStatus } = useUnits();
  const [isNewUnitModalOpen, setIsNewUnitModalOpen] = useState<boolean>(false);
  const [checkoutUnit, setCheckoutUnit] = useState<TUnitProps | null>(null);

  const [inspection, setInspection] = useState<TInspectionStateProps>({
    bed: false,
    bathroom: false,
    electricity: false,
  });
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [hasViewportInfo, setHasViewportInfo] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateViewport = () => {
      setIsMobileViewport(mediaQuery.matches);
      setHasViewportInfo(true);
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

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
            className={`${actionButtonBaseClass} border cursor-pointer border-[#2db6b6] text-[#2db6b6] hover:bg-[#2db6b6]/10`}
          >
            Check In
          </button>
        );

      case "Occupied":
        return (
          <button
            onClick={() => openCheckoutModal(unit)}
            className={`${actionButtonBaseClass} border cursor-pointer border-red-500 text-red-600 hover:bg-red-50`}
          >
            Check Out
          </button>
        );

      case "Cleaning In Progress":
      case "Maintenance Needed":
        return (
          <button
            onClick={() => changeUnitStatus(unit.id, "Available")}
            className={`${actionButtonBaseClass} border cursor-pointer border-orange-500 text-orange-700 hover:bg-orange-50`}
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
      <div className="bg-white px-4 pt-4 pb-4 md:px-8 md:pt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-auto">
            <select
              onChange={(e) => getUnits(e.target.value)}
              defaultValue=""
              className="w-full cursor-pointer appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm bg-white text-gray-600 sm:min-w-52 \
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
            className="flex cursor-pointer w-full items-center justify-center gap-2 bg-[#2db6b6] hover:bg-[#25a5a5] text-white sm:w-auto \
			px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
          >
            <i className="fi fi-rr-plus-small text-sm leading-none" />
            Add New Unit
          </button>
        </div>
      </div>

      <div className="min-h-72 bg-white p-4 md:p-6">
        {hasViewportInfo && isMobileViewport ? (
          <UnitManagementMobileList
            units={units}
            getStatusStyle={getStatusStyle}
            renderActionButton={renderActionButton}
          />
        ) : (
          <UnitManagementDesktopTable
            units={units}
            getStatusStyle={getStatusStyle}
            renderActionButton={renderActionButton}
          />
        )}

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
