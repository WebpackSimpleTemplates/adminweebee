import { useIsMobile } from "../../hooks/useIsMobile"

export function Title({ backLabel, backHref, children, action }) {
  const isMobile = useIsMobile();

  document.title = children;

  if (!isMobile) {
    return (
      <div 
        className="card px-5 py-4 bg-base-100 text-2xl flex flex-row items-center justify-between h-[80px]"
      >
        <span>
          {backLabel && <><a href={backHref} className='text-gray-500 underline'>{backLabel}</a>/</>}{children}
        </span>
        {action}
      </div>
    );
  }

  return (
    <>
      <span>
        {backLabel && <><a href={backHref} className='text-gray-500 underline'>{backLabel}</a>/{children}</>}
      </span>
      <div className="py-4 text-xl flex flex-row items-center justify-between">
        {children}
        {action}
      </div>
    </>
  );
}