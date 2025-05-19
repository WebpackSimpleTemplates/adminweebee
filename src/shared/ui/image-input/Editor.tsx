import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import axios from "axios";

export function Editor({ image, onDone, onCancel }: { image: string, onDone: (src: string) => void, onCancel: () => void }) {

  const editorRef = useRef<AvatarEditor>();
  const [scale, setScale] = useState(1);

  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <>
        Сохранение...
      </>
    );
  }

  return (
    <>
      <AvatarEditor 
        ref={editorRef}
        backgroundColor="transparent"
        className="mx-auto"
        image={image}
        width={250}
        height={250}
        borderRadius={125}  
        scale={scale}
      />
      <div className="mx-auto flex w-[300px] flex-row gap-1">
        <button
          type="button"
          className="btn flex-1"
          onClick={() => setScale(scale + 0.1)}
        >
          <BsZoomIn />
        </button>
        <button
          type="button"
          className="btn flex-1"
          onClick={() => setScale(Math.max(1, scale - 0.1))}
        >
          <BsZoomOut />
        </button>
      </div>

      <div className="flex flex-row items-center gap-1 mt-2 justify-end">
        <button
          type="button"
          className="btn"
          onClick={async () => {
            setLoading(true);

            editorRef.current.getImage().toBlob(async (blob) => {
              const formdata = new FormData();
              formdata.append("avatar", blob);
  
              const url = await axios.post('https://files.wee-bee.ru/upload', formdata).then((res) => 'https://files.wee-bee.ru/' + res.data.avatar);
  
              setLoading(false);
              onDone(url);
            });
          }}
        >
          Применить
        </button>
        <button
          type="button"
          className="btn"
          onClick={onCancel}
        >
          Отменить
        </button>
      </div>
    </>
  );
}