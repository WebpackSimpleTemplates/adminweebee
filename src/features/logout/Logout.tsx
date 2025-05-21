import { clearAuthCredentials } from "@/shared/api";
import { useModal } from "@/shared/hooks/useModal"
import { Modal } from "@/shared/ui/modal";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router";

export function Logout({ small }: { small?: boolean }) {
  const modal = useModal();
  const navigate = useNavigate();

  return (
    <>
      {small && (
        <button onClick={modal.open} className="btn btn-error btn-sm btn-outline btn-square">
          <TbLogout />
        </button>
      )}
      {!small && (
        <button onClick={modal.open} className="btn btn-error btn-outline">
          <TbLogout />
          Выйти
        </button>
      )}
      <Modal ref={modal.ref}>
        Вы уверены что хотите выйти?
        <div className="flex flex-row gap-2 justify-end items-center mt-3">
          <button onClick={modal.close} className="btn">
            Нет
          </button>
          <button
            className="btn"
            onClick={() => {
              navigate('/login');
              clearAuthCredentials();
            }}
          >
            Да
          </button>
        </div>
      </Modal>
    </>
  )
}