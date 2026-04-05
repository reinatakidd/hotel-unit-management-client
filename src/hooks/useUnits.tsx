import { useEffect, useState } from "react";
import { TUnitProps } from "@/types/unit";
import * as unitsService from "@/services/unitService";

export const useUnits = () => {
  const [units, setUnits] = useState<TUnitProps[]>([]);

  const getUnits = async (status?: string) => {
    try {
      const data = await unitsService.fetchUnits(status);
      setUnits(data);
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  const changeUnitStatus = async (unitId: number, newStatus: string) => {
    setUnits((prev) =>
      prev.map((u) => (u.id === unitId ? { ...u, status: newStatus } : u)),
    );
    try {
      await unitsService.updateUnitStatus(unitId, newStatus);
    } catch (error) {
      console.error("Error updating unit status:", error);
    }
  };

  const addUnit = async (unit: Omit<TUnitProps, "id">) => {
    try {
      const newUnit = await unitsService.createUnit(unit);
      setUnits((prev) => [...prev, newUnit]);
    } catch (error) {
      console.error("Error creating unit:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    void unitsService
      .fetchUnits()
      .then((data) => {
        if (isMounted) {
          setUnits(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching units:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { units, getUnits, changeUnitStatus, addUnit };
};
