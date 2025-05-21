import { Avatar, Name } from "@/entities/profile";
import { Logout } from "@/features/logout";
import { userIdState } from "@/shared/api";
import { Fallback } from "@/shared/ui/fallback";
import { useHookstate } from "@hookstate/core";
import { useState, useTransition } from "react";
import { BiHome, BiMenu } from "react-icons/bi";
import { Link, Outlet, useNavigate, type To } from "react-router";
import { FaUsers } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { MenuLink } from "./MenuLink";
import { IoIosStarHalf } from "react-icons/io";
import { FaListCheck } from "react-icons/fa6";
import { IoChatbubbles } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { FaPalette } from "react-icons/fa";
import { BiSolidBinoculars } from "react-icons/bi";
import { Header } from "@/widgets/header";

export function Layout() {
  const [open, setOpen] = useState(true);
  const userId = useHookstate(userIdState).get();
  const [pending, startTransition] = useTransition();
  const navigate = useNavigate();

  const go = (link: To) => startTransition(() => navigate(link));

  return (
    <div className="flex-1 w-full h-full flex flex-row justify-start relative">
      {open && (
        <div className="p-3 w-full max-w-[250px] h-full overflow-auto bg-base-200 absolute left-0 top-0 lg:static flex flex-col">
          <div className="p-3 text-2xl font-bold flex flex-row items-end">
            <div className="text-blue-500">
              Wee
            </div>
            <div className="text-teal-500">
              Bee
            </div>
          </div>
          <ul className="menu w-full flex-1 h-full">
            <MenuLink
              to="/"
              go={go}
              icon={<BiHome />}
              label="Главная"
            />
            <MenuLink
              to="/operators"
              go={go}
              icon={<FaUsers />}
              label="Операторы"
            />
            <MenuLink
              to="/tags"
              go={go}
              icon={<IoChatbubbles />}
              label="Мессенджер"
            />
            <MenuLink
              to="/operators"
              go={go}
              icon={<BiSolidBinoculars />}
              label="Посетители"
            />
            <MenuLink
              to="/tags"
              go={go}
              icon={<FaListCheck />}
              label="Анкеты"
            />
            <MenuLink
              to="/tags"
              go={go}
              icon={<IoIosStarHalf />}
              label="Оценки качества"
            />
            <MenuLink
              to="/tags"
              go={go}
              icon={<FaHistory />}
              label="История действий"
            />
            <MenuLink
              to="/tags"
              go={go}
              icon={<FaPalette />}
              label="Контент"
            />
          </ul>
          <Link to={"/select-channel/" + userId} className="btn btn-outline btn-primary mb-2">
            <FaArrowLeft size={15} />
            Другой канал
          </Link>
        </div>
      )}
      <div className={"flex flex-col h-full " + (open ? 'w-[calc(100%-250px)]' : 'w-full')}>
        <Header open={open} setOpen={setOpen} />
        <div className="flex-1 h-full overflow-auto w-full pb-10">
          {pending && <Fallback />}
          {!pending && <Outlet />}
        </div>
      </div>
    </div>
  );
}