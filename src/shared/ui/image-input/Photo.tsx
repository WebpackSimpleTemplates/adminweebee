import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { FaCheck } from "react-icons/fa";
import { GrFormPreviousLink } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { MdFlipCameraIos } from "react-icons/md";

export function Photo({ onPhoto, onCancel }: { onPhoto: (src: string) => void, onCancel: () => void }) {
  const ref = useRef<HTMLVideoElement>();
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const update = () => navigator.mediaDevices.enumerateDevices()
      .then((res) => res.filter((d) => d.kind === 'videoinput'))
      .then(setDevices)
      .then(() => setLoading(false));

    update();

    navigator.mediaDevices.addEventListener('devicechange', update);

    return () => navigator.mediaDevices.removeEventListener('devicechange', update);
  }, []);

  useEffect(() => {
    const device = devices[index];

    if (!device) {
      return;
    }

    (async () => {
      setLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: device.deviceId, width: 250, height: 250 } });
      setLoading(false);

      ref.current.srcObject = stream;
    })();
  }, [index, devices.length]);

  useEffect(() => {
    setIndex(0);
  }, [devices.length]);

  return (
    <>
      <div className="flex flex-row">
        <button onClick={onCancel} className="btn" type="button">
          <GrFormPreviousLink size={20} />
          {/* Назад */}
        </button>
      </div>

      <video
        ref={ref}
        autoPlay
        playsInline
        className="w-[250px] h-[250px] rounded-full object-cover object-center mx-auto"
        style={{ display: devices.length > 0 && !loading ? 'block' : 'none' }}
      />
      {!loading && devices.length === 0 && (
        <div className="w-[250px] h-[250px] text-warning p-2 rounded-full bg-base-200 flex justify-center items-center text-center mx-auto">
          Чтобы сделать фото подключите камеру
        </div>
      )}
      {loading && (
        <div className="w-[250px] h-[250px] p-2 rounded-full bg-base-200 flex justify-center items-center text-center mx-auto">
          Подключение к камере...
        </div>
      )}

      <div className="flex flex-row gap-1 w-[250px] mx-auto mt-2">
        <button
          type="button"
          className="btn flex-1"
          disabled={loading || devices.length < 2}
          onClick={() => setIndex(index + 1 === devices.length ? 0 : index + 1)}
        >
          <MdFlipCameraIos size={20} />
        </button>
        <button
          type="button"
          className="btn btn-primary flex-1"
          disabled={loading || devices.length === 0}
          onClick={async () => {
            const canvas = document.createElement('canvas');
            canvas.width = 250;
            canvas.height = 250;

            canvas.style.display = 'none';
            document.body.appendChild(canvas);

            const ctx = canvas.getContext('2d');

            ctx.drawImage(ref.current, 0, 0);

            const dataUrl = canvas.toDataURL();

            document.body.removeChild(canvas);
            const blobBin = atob(dataUrl.split(',')[1]);
            const array = [];
            for(let i = 0; i < blobBin.length; i++) {
                array.push(blobBin.charCodeAt(i));
            }
            const file=new Blob([new Uint8Array(array)], {type: 'image/png'});
            const formdata = new FormData();
            formdata.append("avatar", file);

            const url = await axios.post('https://files.wee-bee.ru/upload', formdata).then((res) => 'https://files.wee-bee.ru/' + res.data.avatar);

            onPhoto(url);
          }}
        >
          <FaCheck />
        </button>
      </div>
    </>
  )
}