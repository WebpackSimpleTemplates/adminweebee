import { ComponentProps, memo, ReactNode, useRef, useState } from "react";

export const Copy = memo(({ text, className, copiedChild, children, withoutTooltip, ...props }: { text: string, copiedChild?: ReactNode, withoutTooltip?: boolean } & Omit<ComponentProps<'button'>, 'onClick' | 'type'>) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<NodeJS.Timeout>()

  if (withoutTooltip) {
    return (
      <button
        type="button"
        className={[className, copied && 'btn-success'].filter((i) => !!i).join(' ')}
        {...props}
        onClick={async () => {
          if (timer.current) {
            clearTimeout(timer.current);
          }

          await navigator.clipboard.writeText(text);

          setCopied(true);

          timer.current = setTimeout(() => setCopied(false), 1000);
        }}
      >
        {(copied && copiedChild) || children}
      </button>
    );
  }

  return (
    <div className="tooltip" data-tip={copied ? "Скопировано" : "Копировать"}>
      <button
        type="button"
        className={[className, copied && 'btn-success'].filter((i) => !!i).join(' ')}
        {...props}
        onClick={async () => {
          if (timer.current) {
            clearTimeout(timer.current);
          }

          await navigator.clipboard.writeText(text);

          setCopied(true);

          timer.current = setTimeout(() => setCopied(false), 1000);
        }}
      >
        {(copied && copiedChild) || children}
      </button>
    </div>
  )
})