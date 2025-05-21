import { Name } from "@/entities/profile";
import { Logout } from "@/features/logout";
import { BiMenu } from "react-icons/bi";

export function Header({ open, setOpen }: { open?: boolean, setOpen?: (val: boolean) => void }) {
  return (
    <div className="w-full flex flex-row justify-between items-center py-3 px-5">
      <div className="flex flex-row items-center gap-3">
        {!!setOpen && (
          <button onClick={() => setOpen(!open)} className="btn btn-square btn-ghost btn-sm">
            <BiMenu size={20} />
          </button>
        )}
        {(!setOpen || !open) && (
          <div className="text-2xl font-bold flex flex-row items-end">
            <div className="text-blue-500">
              Wee
            </div>
            <div className="text-teal-500">
              Bee
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row items-center gap-2">
        <Name />
        <img src="https://wee-bee.ru/default-avatar.jpg" className="w-[30px] h-[30px] rounded-full object-center object-cover" />
        <Logout small />
      </div>
    </div>
  )
}