import { useState } from "react";
import { BiLink } from "react-icons/bi";
import { FaFileUpload } from "react-icons/fa";
import { FaCamera } from "react-icons/fa6";
import { Editor } from "./Editor";
import { Photo } from "./Photo";
import { UrlInput } from "./UrlInput";
import { loadFromDevice } from "./loadFromDevice";

export function ImageInput({ onInput }: { onInput: (src: string) => void }) {
  const [image, setImage] = useState<string>();

  const [screen, setScreen] = useState<'photo' | 'url' | 'editor'>();

  if (screen === 'editor') {
    return <Editor image={image} onDone={(src) => { setScreen(null); onInput(src); }} onCancel={() => setScreen(null)} />;
  }

  if (screen === 'photo') {
    return <Photo onPhoto={(src) => { setScreen(null); onInput(src); }} onCancel={() => setScreen(null)} />;
  }

  if (screen === 'url') {
    return (
      <UrlInput
        onCancel={() => setScreen(null)}
        onLoad={(dataUrl) => {
          setImage(dataUrl);
          setScreen('editor');
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div 
        className="btn btn-lg"
        onClick={() => setScreen('photo')}
      >
        <FaCamera />
        Сфотографировать
      </div>
      <div 
        className="btn btn-lg"
        onClick={async () => {
          setImage(await loadFromDevice('image/*'));
          setScreen('editor');
        }}
      >
        <FaFileUpload />
        Загрузить с устройства
      </div>
      <div 
        className="btn btn-lg"
        onClick={() => setScreen('url')}
      >
        <BiLink size={20} />
        Ввести URL
      </div>
      <div 
        className="btn btn-lg"
        onClick={() => onInput('https://wee-bee.ru/default-avatar.jpg')}
      >
        Установить дефолтный
      </div>      
    </div>
  );
}