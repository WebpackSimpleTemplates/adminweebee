import { useState, type ReactNode } from "react";

export function VerticalTabs({ children }: { children: [string, ReactNode, boolean?][] }) {
  const items = children.filter((c) => !!c);
  const [tab, setTab] = useState(children[0][0]);

  return (
    <div className="flex flex-row gap-4 bg-base-300">
      <ul className="menu bg-base-200">
        {items.map(([label,, block]) => (
          <li 
            key={label}
            onClick={() => !block && setTab(label)}
          >
            <a 
              className={''
                + (label === tab ? ' menu-active' : '')
                + (block ? ' opacity-50 cursor-not-allowed' : '')
              }
              role="tab"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      {items.map(([label, content]) => (
        <div key={label} style={{ display: tab === label ? 'block' : 'none' }} className="flex-1 w-full p-4 h-[720px] overflow-auto">
          {content}
        </div>
      ))}
    </div>
  )
}