import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export function LayoutLink({ src: Src, label, onClick, href }: { src?: any, label: ReactNode, onClick?: () => void, href?: string }) {

  const icon = typeof Src === 'string' 
    ? (
      <img
        src={Src}
        className='w-[20px] h-[20px]'
      />
    )
    : (
      <Src size={20} />
    )

  if (href) {
    return (
      <NavLink 
        to={href}
        className={({ isActive }) => 'p-3 rounded-lg transition cursor-pointer flex flex-row gap-3 items-center justify-start' + (isActive ? ' text-primary' : '')}
      >
        {icon}
  
        {label}
      </NavLink>
    );
  }
  
  return (
    <div onClick={onClick} className='p-3 rounded-lg transition cursor-pointer flex flex-row gap-3 items-center justify-start'>
      {icon}

      {label}
    </div>
  )
}