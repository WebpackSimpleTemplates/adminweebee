import { type ReactNode } from "react";
import { useLocation, useParams, type To } from "react-router";

export function MenuLink({ to, label, icon, go }: { to: To, label: string, icon: ReactNode, go: (link: To) => void }) {
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