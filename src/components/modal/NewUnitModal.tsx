import { useState } from "react";
import axios from "axios";
import { createUnit } from "@/services/unitService";
import { TUnitProps } from "@/types/unit";

const UNIT_TYPES = ["capsule", "cabin"] as const;

const UNIT_STATUSES = [
  "Available",
  "Occupied",
  "Cleaning In Progress",
  "Maintenance Needed",
] as const;

type TNewUnitFormProps = Omit<TUnitProps, "id">;

type TNewUnitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function NewUnitModal({
  isOpen,
  onClose,
  onSuccess,
}: TNewUnitModalProps) {
  const [form, setForm] = useState<TNewUnitFormProps>({
    name: "",
    type: "capsule",
    status: "Available",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Unit name is required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createUnit(form);
      setForm({ name: "", type: "capsule", status: "Available" });
      onSuccess();
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error ?? "Failed to create unit.");
      } else {
        setError("Failed to create unit.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white shadow-lg"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Add New Unit</h2>

          <button
            onClick={onClose}
            className="text-gray-400 cursor-pointer hover:text-gray-600 transition"
            aria-label="Close"
          >
            <i className="fi fi-rr-cross text-sm leading-none" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Unit Name</label>

            <input
              name="name"
              type="text"
              placeholder="e.g. A-01"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm 
              focus:outline-none focus:border-[#2db6b6]/60 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Type</label>

            <div className="relative">
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="appearance-none border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm 
                focus:outline-none focus:border-[#2db6b6]/60 transition w-full"
              >
                {UNIT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>

              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <i className="fi fi-rr-angle-small-down text-sm" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Status</label>

            <div className="relative">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="appearance-none border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm 
                focus:outline-none focus:border-[#2db6b6]/60 transition w-full"
              >
                {UNIT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <i className="fi fi-rr-angle-small-down text-sm" />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer text-sm rounded-lg border border-gray-200 
              text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm cursor-pointer rounded-lg bg-[#2db6b6] hover:bg-[#25a5a5] 
              text-white font-medium transition shadow-sm disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Unit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
