import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
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
    } catch (err: any) {
      setError(err?.response?.data?.error ?? "Failed to create unit.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-sm rounded bg-white p-4 shadow"
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-black">Add New Unit</h2>
          <button
            onClick={onClose}
            className="rounded text-black cursor-pointer"
            aria-label="Close"
          >
            <i
              className="fi fi-rr-cross text-sm leading-none"
              aria-hidden="true"
            />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm text-black">
              Unit Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. A-01"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded border border-black px-3 py-2 text-sm text-black placeholder:text-black/50 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="type" className="text-sm text-black">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded border border-black px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              {UNIT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="status" className="text-sm text-black">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded border border-black px-3 py-2 text-sm text-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              {UNIT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="mt-1 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-black px-3 py-2 text-sm text-white hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-black px-3 py-2 text-sm text-white hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Unit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
