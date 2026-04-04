import axios from "axios";
import { API_BASE_URL } from "@/constants/api";
import { TUnit } from "@/types/unit";

export const fetchUnits = async (status?: string): Promise<TUnit[]> => {
  const url = `${API_BASE_URL}/api/units${status ? `?status=${encodeURIComponent(status)}` : ""}`;
  const response = await axios.get(url);
  return response.data;
};

export const updateUnitStatus = async (
  unitId: number,
  newStatus: string,
): Promise<void> => {
  await axios.put(`${API_BASE_URL}/api/units/${unitId}`, { status: newStatus });
};
