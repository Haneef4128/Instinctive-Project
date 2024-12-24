import React from "react";
import Quyl from "../assets/Quyl.png";
import Dashboard from "../assets/Dashboard.png";
import Students from "../assets/Students.png"; 
import Chapter from "../assets/Chapter.png";  
import Help from "../assets/Help.png";        
import Reports from "../assets/Reports.png";  
import Settings from "../assets/Settings.png"; 

const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-white text-black fixed py-[30px] px-[12px]">
      <div className="mb-6">
        <img src={Quyl} alt="Quyl Logo" className="w-[98px] h-[42px]" />
      </div>
      <div className="w-[224px] h-[328px] gap-2">
        {/* Dashboard Item */}
        <div className="w-[224px] h-[48px] py-[12px] px-[12px] flex items-center gap-[10px] rounded-tl-[6px]">
          <div className="w-[24px] flex-shrink-0">
            <img
              src={Dashboard}
              alt="Dashboard Icon"
              className="w-[24px] h-[24px]"
            />
          </div>
          <div className="flex-1">
            <p
              className="font-noto text-[16px] font-bold leading-[22px] text-left text-customGray"
            >
              Dashboard
            </p>
          </div>
        </div>

        <div className="w-[224px] h-[48px] py-[12px] px-[12px] flex items-center gap-[10px] bg-studentsGray rounded-[6px]">
          <div className="w-[24px] flex-shrink-0">
            <img
              src={Students}
              alt="Students Icon"
              className="w-[24px] h-[24px]"
            />
          </div>
          <div className="flex-1">
            <p className="font-noto text-[16px] font-bold leading-[22px] text-left">
              Students
            </p>
          </div>
        </div>

        <div className="w-[224px] h-[48px] py-[12px] px-[12px] flex items-center gap-[10px]">
          <div className="w-[24px] flex-shrink-0">
            <img
              src={Chapter}
              alt="Chapter Icon"
              className="w-[24px] h-[24px]"
            />
          </div>
          <div className="flex-1">
            <p className="font-noto text-[16px] font-bold leading-[22px] text-left text-customGray">
              Chapter
            </p>
          </div>
        </div>

        <div className="w-[224px] h-[48px] py-[12px] px-[12px] flex items-center gap-[10px]">
          <div className="w-[24px] flex-shrink-0">
            <img
              src={Help}
              alt="Help Icon"
              className="w-[24px] h-[24px]"
            />
          </div>
          <div className="flex-1">
            <p className="font-noto text-[16px] font-bold leading-[22px] text-left text-customGray">
              Help
            </p>
          </div>
        </div>

        <div className="w-[224px] h-[48px] py-[12px] px-[12px] flex items-center gap-[10px]">
          <div className="w-[24px] flex-shrink-0">
            <img
              src={Reports}
              alt="Reports Icon"
              className="w-[24px] h-[24px]"
            />
          </div>
          <div className="flex-1">
            <p className="font-noto text-[16px] font-bold leading-[22px] text-left text-customGray">
              Reports
            </p>
          </div>
        </div>

        <div className="w-[224px] h-[48px] py-[12px] px-[12px] flex items-center gap-[10px]">
          <div className="w-[24px] flex-shrink-0">
            <img
              src={Settings}
              alt="Settings Icon"
              className="w-[24px] h-[24px]"
            />
          </div>
          <div className="flex-1">
            <p className="font-noto text-[16px] font-bold leading-[22px] text-left text-customGray">
              Settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


