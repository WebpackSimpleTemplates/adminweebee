import React from "react";
import { FaTelegramPlane, FaVk } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const Share = React.memo(({ link }: { link: string }) => (
  <>
    <a href={"https://telegram.me/share/url?url=" + encodeURIComponent(link)} target="_blank" className="btn btn-ghost btn-square">
      <FaTelegramPlane size={20} />
    </a>
    <a href={"https://vk.com/share.php?url=" + encodeURIComponent(link)} target="_blank" className="btn btn-ghost btn-square">
      <FaVk size={20} />
    </a>
    <a href={`mailto:?subject=${encodeURIComponent("Приглашение в ВКС")}&body=${encodeURIComponent('Ссылка для входа ' + link)}`} target="_blank" className="btn btn-ghost btn-square">
      <MdEmail size={20} />
    </a>
  </>
));