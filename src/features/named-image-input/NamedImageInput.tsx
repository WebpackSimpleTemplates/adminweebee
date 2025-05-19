import { useModal } from "@/shared/hooks/useModal";
import { ImageInput } from "@/shared/ui/image-input";
import { Modal } from "@/shared/ui/modal";
import { useEffect, useState } from "react";

export function NamedImageInput({ name, defaultValue, className }: { name: string, defaultValue: string, className?: string }) {
  const [src, setSrc] = useState(defaultValue);
  const modal = useModal();

  useEffect(() => setSrc(defaultValue), [defaultValue]);

  return (
    <>
      <img className={className} onClick={modal.open} src={src} />
      <input type="hidden" name={name} value={src} />
      <Modal ref={modal.ref}>
        <ImageInput
          onInput={(src) => {
            modal.close();
            setSrc(src);            
          }}
        />
      </Modal>
    </>
  );
}