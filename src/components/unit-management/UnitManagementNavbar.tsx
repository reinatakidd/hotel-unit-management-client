import Image from "next/image";

type UnitManagementNavbarProps = {
  onMenuClick?: () => void;
};

export default function UnitManagementNavbar({
  onMenuClick,
}: UnitManagementNavbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-3 md:px-6 md:py-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-1.5 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700 md:hidden"
          aria-label="Open menu"
        >
          <i className="fi fi-rr-menu-burger relative top-0.5 text-base leading-none" />
        </button>

        <button className="hidden text-gray-500 hover:text-gray-700 transition md:block">
          <i className="fi fi-rr-arrow-small-left text-lg top-0.5 leading-none" />
        </button>

        <div>
          <h2 className="text-sm font-semibold text-gray-800 md:text-lg">
            Unit Management
          </h2>
          <p className="hidden text-xs text-gray-400 md:block">
            <span className="text-[#2db6b6]">Dashboard</span> / Unit Management
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button className="hidden text-gray-400 transition hover:text-gray-600 md:block">
          <i className="fi fi-rr-settings top-0.5 text-lg leading-none" />
        </button>

        <button className="relative text-gray-400 hover:text-gray-600 transition">
          <i className="fi fi-rr-bell text-lg leading-none top-0.5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2.5">
          <Image
            src="https://picsum.photos/300/300"
            alt="User Avatar"
            width={36}
            height={36}
            className="h-8 w-8 rounded-full md:h-9 md:w-9"
          />
          <div className="hidden leading-tight md:block">
            <p className="text-sm font-medium text-gray-700">Reinata Kidd</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
