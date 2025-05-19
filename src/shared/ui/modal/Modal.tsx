import React, { type MutableRefObject, type ReactNode } from "react"

export const Modal = React.memo(({ ref, children, big, onClose = () => {} }: { ref: MutableRefObject<HTMLDialogElement>, children: ReactNode, big?: boolean, onClose?: () => void }) => (
  <dialog ref={ref} className="modal" onClick={() => {ref.current.close(); onClose()}}>
    <div className={"modal-box overflow-x-hidden" + (big ? '  w-11/12 max-w-5xl' : '')} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </dialog>
))