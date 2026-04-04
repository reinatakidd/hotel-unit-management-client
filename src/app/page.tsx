"use client";
import Image from "next/image";
import { useUnits } from "@/hooks/useUnits";
import { useState } from "react";

import NewUnitModal from "@/components/modal/NewUnitModal";

export default function Home() {
  const { units, getUnits, changeUnitStatus } = useUnits();
  const [isNewUnitModalOpen, setIsNewUnitModalOpen] = useState<boolean>(false);

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
        <div className="flex justify-end gap-2 items-center mb-4">
          <select
            onChange={(e) => getUnits(e.target.value)}
            className="mb-4 border rounded px-2 py-1"
            defaultValue=""
          >
            <option value="">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Cleaning in Progress">Cleaning in Progress</option>
            <option value="Maintenance Needed">Maintenance Needed</option>
          </select>
          <button
            className="cursor-pointer"
            onClick={() => setIsNewUnitModalOpen(true)}
          >
            Add New Unit
          </button>
        </div>
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
                <td className="p-4 w-full">{unit.name}</td>
                <td className="p-4 px-12">{unit.type}</td>
                <td className="p-4">
                  <select
                    value={unit.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      changeUnitStatus(unit.id, newStatus);
                    }}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Cleaning In Progress">
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
      <NewUnitModal
        isOpen={isNewUnitModalOpen}
        onClose={() => setIsNewUnitModalOpen(false)}
        onSuccess={() => getUnits()}
      />
    </div>
  );
}
