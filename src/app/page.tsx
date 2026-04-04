"use client";
import Image from "next/image";
import { useState } from "react";

type TUnitProps = {
  id: number;
  name: string;
  type: string;
  status: string;
};

const initialUnits: TUnitProps[] = [
  { id: 1, name: "Unit A-101", type: "Cabin", status: "Available" },
  { id: 2, name: "Unit B-202", type: "Capsule", status: "Occupied" },
  {
    id: 3,
    name: "Unit C-303",
    type: "Capsule",
    status: "Cleaning in Progress",
  },
  {
    id: 4,
    name: "Unit D-404",
    type: "Cabin",
    status: "Maintenance Needed",
  },
];

export default function Home() {
  const [units, setUnits] = useState<TUnitProps[]>(initialUnits);

  const fetchUnits = (status?: string) => {
    if (!status) {
      setUnits(initialUnits);
      return;
    }

    setUnits(initialUnits.filter((unit) => unit.status === status));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl">Unit Management</h2>
        <div className="flex">
          <Image
            src="https://picsum.photos/300/300"
            alt="Unit Image"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p>Reinata Kidd</p>
            <p>Admin</p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white">
        <select
          onChange={(e) => fetchUnits(e.target.value)}
          className="mb-4 border rounded px-2 py-1"
          defaultValue=""
        >
          <option value="">All Statuses</option>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Cleaning in Progress">Cleaning in Progress</option>
          <option value="Maintenance Needed">Maintenance Needed</option>
        </select>
        <table className="w-full rounded-lg overflow-hidden">
          <thead className="text-white">
            <tr>
              <th className="p-4 bg-[#2db6b6]">Name</th>
              <th className="p-4 bg-[#2db6b6]">Type</th>
              <th className="p-4 bg-[#2db6b6]">Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {units?.map((unit) => (
              <tr key={unit.id}>
                <td className="p-4">{unit.name}</td>
                <td className="p-4">{unit.type}</td>
                <td className="p-4">
                  <select
                    value={unit.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setUnits((prevUnits) =>
                        prevUnits.map((u) =>
                          u.id === unit.id ? { ...u, status: newStatus } : u,
                        ),
                      );
                    }}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Cleaning in Progress">
                      Cleaning in Progress
                    </option>
                    <option value="Maintenance Needed">
                      Maintenance Needed
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
