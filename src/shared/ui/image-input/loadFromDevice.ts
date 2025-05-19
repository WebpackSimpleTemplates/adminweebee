export async function loadFromDevice(accept?: string) {
  const input = document.createElement('input');

  input.type = 'file';
  input.accept = accept;
  input.style.display = 'none';

  document.body.appendChild(input);

  await new Promise((res) => {
    input.onchange = res;
    input.click();
  })

  document.body.removeChild(input);

  const file = input.files[0];

  const reader = new FileReader();

  await new Promise((res) => {
    reader.onloadend = res;
    reader.readAsDataURL(file);
  })

  return reader.result as string;
}