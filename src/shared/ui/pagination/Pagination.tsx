import { getButtons } from "./get-btns";

export type PaginationProps = {
  total: number,
  page: number,
  setPage: (p: number, loadingIndicator: number | string) => void,
  optionsCount?: number,
}

export function Pagination({ page, setPage, optionsCount = 2, total }: PaginationProps) {
  const btns = getButtons(page, optionsCount, total);

  return (
    <div className="join">
      {btns.map((btn, id) => (
        <div
          key={btn.key + ':' + id}
          onClick={() => {
            if (btn.page !== page && typeof btn.page === 'number') {
              setPage(btn.page, page);
            }
          }}
          className={
            "join-item btn"
            + (btn.isActive ? ' btn-active' : '')
            + (typeof btn.page !== 'number' ? ' join-item btn-disabled' : '')
          }
        >
          {btn.label}
        </div>
      ))}
    </div>
  )
}