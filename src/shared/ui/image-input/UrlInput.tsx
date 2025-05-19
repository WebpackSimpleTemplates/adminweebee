import { useRef, useState } from "react"

export function UrlInput({ onLoad, onCancel }: { onLoad: (dataUrl: string) => void, onCancel: () => void }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const ref = useRef<HTMLImageElement>(null);
  
  return (
    <div className="flex flex-col gap-1">
      {url && !loading && !error && (
        <img ref={ref} src={url} className="w-[250px] h-auto object-contain object-center mx-auto" />
      )}
      {loading && (
        <div className="w-[250px] h-[250px] rounded-full bg-base-200 flex justify-center items-center text-center mx-auto">
          Загрузка изображения...
        </div>
      )}
      {error && !loading && (
        <div className="w-[250px] h-[250px] rounded-full bg-base-200 flex justify-center items-center text-center mx-auto text-error p-2">
          Ошибка загрузки изображения
        </div>
      )}
      <fieldset className="fieldset w-full flex-1">
        <legend className="fieldset-legend">Вставьте URL адрес изображения</legend>
        <input
          type="text"
          autoFocus
          className="input w-full"
          onChange={async ({ target: { value } }) => {
            setError(false);
            setLoading(true);

            const response = await fetch('https://rtc.wee-bee.ru/proxy', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ to: value })
            });

            if (response.status === 200) {
              const file = await response.blob();
              const reader = new FileReader();

              await new Promise((res) => {
                reader.onloadend = res;
                reader.readAsDataURL(file);
              })
          
              setUrl(reader.result as string);
            } else {
              setError(true);
              setUrl('');
            }

            setLoading(false);
          }}
        />
      </fieldset>

      <div className="flex flex-row justify-end mt-1 gap-1">
        <button
          type="button"
          disabled={!url}
          className="btn btn-primary"
          onClick={() => onLoad(url)}
        >
          Далее
        </button>
        <button type="button" className="btn" onClick={onCancel}>
          Назад
        </button>
      </div>
    </div>
  )
}