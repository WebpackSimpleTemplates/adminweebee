import { Avatar, Name } from "@/entities/profile";
import { Logout } from "@/features/logout";
import { userIdState } from "@/shared/api";
import { Fallback } from "@/shared/ui/fallback";
import { useHookstate } from "@hookstate/core";
import { useState, useTransition, type ReactNode } from "react";
import { BiHome, BiMenu } from "react-icons/bi";
import { Link, Outlet, useLocation, useNavigate, useParams, type To } from "react-router";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { FaTags, FaArrowLeft } from "react-icons/fa6";

function MenuLink({ to, label, icon, go }: { to: To, label: string, icon: ReactNode, go: (link: To) => void }) {
  const location = useLocation();
  const { campaignId } = useParams();
  const resultLink = '/' + campaignId + to;

  return (
    <li onClick={() => go(resultLink)}>
      <a className={location.pathname === resultLink ? 'menu-active' : ''}>
      <div className="w-[16px]">{icon}</div>
        {label}
      </a>
    </li>
  )
}

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
              to=""
              go={go}
              icon={<BiHome />}
              label="Главная"
            />
            <MenuLink
              to="/channels"
              go={go}
              icon={<RiCustomerService2Line />}
              label="Каналы"
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
              icon={<FaTags />}
              label="Теги"
            />
          </ul>
          <Link to={"/select-campaign/" + userId} className="btn btn-outline btn-primary mb-2">
            <FaArrowLeft size={15} />
            Другая кампания
          </Link>
          <Logout />
        </div>
      )}
      <div className={"flex flex-col h-full " + (open ? 'w-[calc(100%-250px)]' : 'w-full')}>
        <div className="w-full flex flex-row justify-between items-center py-3 px-5">
          <button onClick={() => setOpen(!open)} className="btn btn-square btn-ghost btn-sm">
            <BiMenu size={20} />
          </button>
          <Link to={"/user/" + userId} className="flex flex-row items-center gap-2">
            <Name />
            <Avatar className="w-[30px] h-[30px] rounded-full object-center object-cover" />
          </Link>
        </div>
        <div className="flex-1 h-full overflow-auto w-full pb-10">
          {pending && <Fallback />}
          {!pending && <Outlet />}
        </div>
      </div>
    </div>
  );
}