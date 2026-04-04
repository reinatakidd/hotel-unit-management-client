import axios from "axios";
import { API_BASE_URL } from "@/constants/api";
import { TUnitProps } from "@/types/unit";

export const fetchUnits = async (status?: string): Promise<TUnitProps[]> => {
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

export const createUnit = async (
  unit: Omit<TUnitProps, "id">,
): Promise<TUnitProps> => {
  const response = await axios.post(`${API_BASE_URL}/api/units`, unit);
  return response.data;
};
