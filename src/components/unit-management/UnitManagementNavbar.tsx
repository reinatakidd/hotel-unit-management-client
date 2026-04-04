import Image from "next/image";

export default function UnitManagementNavbar() {
  return (
    <div className="flex items-center justify-between bg-gray-100 px-6 py-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700 transition">
          <i className="fi fi-rr-arrow-small-left text-lg leading-none" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Unit Management
          </h2>
          <p className="text-sm text-gray-400">
            <span className="text-[#2db6b6]">Dashboard</span> / Unit Management
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-gray-600 transition">
          <i className="fi fi-rr-settings text-lg leading-none" />
        </button>
        <button className="relative text-gray-400 hover:text-gray-600 transition">
          <i className="fi fi-rr-bell text-lg leading-none" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3">
          <Image
            src="https://picsum.photos/300/300"
            alt="User Avatar"
            width={36}
            height={36}
            className="rounded-full"
          />

          <div className="leading-tight">
            <p className="text-sm font-medium text-gray-700">Reinata Kidd</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
