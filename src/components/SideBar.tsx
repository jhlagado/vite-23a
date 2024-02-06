import { FC, ReactNode } from "react";
import { BsPlus, BsLightningFill, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";

export default function SideBar() {
  return (
    <>
      <div className="h-screen w-16 m-0 flex flex-col bg-gray-900 text-gray-900 dark:bg-gray-900 dark:text-white">
        <SideBarIcon icon={<FaFire size="28" />} />
        <SideBarIcon icon={<BsPlus size="32" />} />
        <SideBarIcon icon={<BsLightningFill size="20" />} />
        <SideBarIcon icon={<FaPoo size="28" />} />
        <SideBarIcon icon={<BsGearFill size="32" />} />
      </div>
    </>
  );
}

interface SideBarIconProps {
  icon: ReactNode;
  text?: string;
}

const SideBarIcon: FC<SideBarIconProps> = ({ icon, text = "tooltip 💡" }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);
