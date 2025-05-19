import { useState } from "react";

export function StatusInput({ name, defaultValue }: { name: string, defaultValue: string }) {
  const [value, setValue] = useState(defaultValue);

  const colors = {
    PLANNED: 'gray',
    WAIT: 'yellow',
    PROGRESS: 'blue',
    CHECKING: 'purple',
    DONE: 'green',
  }

  return (
    <select name={name} value={value} onChange={(e) => setValue(e.target.value)} className={`select bg-${colors[value]}-200`}>
      <option value="PLANNED">Планируется</option>
      <option value="WAIT">Ожидается</option>
      <option value="PROGRESS">В работе</option>
      <option value="CHECKING">Выполнено</option>
      <option value="DONE">Принято</option>
    </select>
  )
}