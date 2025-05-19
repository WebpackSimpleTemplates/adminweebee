import axios from "axios";
import { v4 } from "uuid";

export async function loadMultiFromDevice(accept?: string) {
  const input = document.createElement('input');

  input.type = 'file';
  input.accept = accept;
  input.style.display = 'none';
  input.multiple = true;

  document.body.appendChild(input);

  await new Promise((res) => {
    input.onchange = res;
    input.click();
  })

  document.body.removeChild(input);

  if (input.files.length === 0) {
    return [];
  }

  const files = Array.from(input.files).map((file) => ({ file, id: v4() }));

  const fd = new FormData();

  for (const { id, file } of files) {
    fd.append(id, file);
  }

  const { data } = await axios.post('https://files.wee-bee.ru/upload', fd);

  return Object.keys(data).map((id) => {
    const { file } = files.find((f) => f.id === id);

    return {
      name: file.name,
      size: file.size,
      type: file.type,
      src: 'https://files.wee-bee.ru/' + data[id],
    };
  });
}