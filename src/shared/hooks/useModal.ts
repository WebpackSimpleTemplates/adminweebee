import { useRef } from "react";

export function useModal() {
  const ref = useRef<HTMLDialogElement>();

  return {
    ref,
    open() {
      if (!ref.current.open) {
        ref.current.showModal();
      }
    },
    close() {
      if (ref.current.open) {
        ref.current.close();
      }
    }
  }
}