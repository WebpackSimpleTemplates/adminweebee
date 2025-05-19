import { useState, type ReactNode } from "react";

export function Tabs({ children, className }: { children: [string, ReactNode, boolean?][], className?: string }) {
  const items = children.filter((c) => !!c);
  const [tab, setTab] = useState(children[0][0]);

  return (
    <>
      <div role="tablist" className={"tabs tabs-border" + (className ? ' ' + className : '')}>
        {items.map(([label,, block]) => (
          <a 
            className={
              'tab'
              + (label === tab ? ' tab-active' : '')
              + (block ? ' opacity-50 cursor-not-allowed' : '')
            }
            key={label}
            onClick={() => !block && setTab(label)}
            role="tab"
          >
            {label}
          </a>
        ))}
      </div>
      {items.map(([label, content]) => (
        <div key={label} style={{ display: tab === label ? 'block' : 'none' }}>
          {content}
        </div>
      ))}
    </>
  )
}