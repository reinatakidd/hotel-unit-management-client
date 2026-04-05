import Image from "next/image";

type SidebarProps = {
  mobile?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ mobile = false, onClose }: SidebarProps) {
  const handleNavigation = () => {
    if (mobile && onClose) {
      onClose();
    }
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 flex flex-col justify-between p-6 ${
        mobile ? "h-full w-64" : "min-h-screen w-64"
      }`}
    >
      <div>
        <div className="mb-6 flex items-center justify-between md:mb-10">
          <div className="flex relative items-center gap-2">
            <Image
              src="https://storage.googleapis.com/cf-web-assets/landing-page/bobobox/logo/bobobox-with-icon.svg"
              alt="Bobobox Logo"
              width={200}
              height={50}
            />
            <p className="absolute text-red-500 -top-2 left-12 font-bold">
              NOT
            </p>
            <Image
              src="/assets/notbobobox-disguise.webp"
              width={24}
              height={24}
              alt="NotBobobox Disguise"
              className="absolute top-5 rotate-35 left-3"
            />
          </div>

          {mobile && onClose ? (
            <button
              onClick={onClose}
              className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 md:hidden"
              aria-label="Close menu"
            >
              <i className="fi fi-rr-cross text-sm leading-none" />
            </button>
          ) : null}
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          <button
            onClick={handleNavigation}
            className="flex items-center gap-3 text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <i className="fi fi-rr-apps" />
            Dashboard
          </button>
          <button
            onClick={handleNavigation}
            className="flex cursor-pointer items-center gap-3 px-3 py-2 rounded-lg bg-[#d9f2f2] text-gray-800 font-medium"
          >
            <i className="fi fi-rr-home" />
            Unit
          </button>

          <button
            onClick={handleNavigation}
            className="flex items-center justify-between text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <span className="flex items-center gap-3">
              <i className="fi fi-rr-comment" />
              Messages
            </span>
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              5
            </span>
          </button>

          <button
            onClick={handleNavigation}
            className="flex items-center gap-3 text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <i className="fi fi-rr-broom" />
            Housekeeping
          </button>

          <button
            onClick={handleNavigation}
            className="flex items-center gap-3 text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <i className="fi fi-rr-calendar-day" />
            Calendar
          </button>

          <button
            onClick={handleNavigation}
            className="flex items-center gap-3 text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <i className="fi fi-rr-money" />
            Financials
          </button>

          <button
            onClick={handleNavigation}
            className="flex items-center gap-3 text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <i className="fi fi-rr-star" />
            Reviews
          </button>
        </nav>
      </div>
    </aside>
  );
}
