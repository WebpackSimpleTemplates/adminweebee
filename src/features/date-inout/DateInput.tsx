import { useModal } from "@/shared/hooks/useModal";
import { Modal } from "@/shared/ui/modal";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { ru } from 'react-day-picker/locale'

const f = (num: number) => (num > 9 ? '' : '0') + num;

function Picker({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  const [selectYear, setSelectYear] = useState(false);

  const date = new Date();
  date.setHours(0);
  
  const [month, setMonth] = useState(date);

  useEffect(() => setMonth(date), [value])

  if (value) {
    const [year, month, day] = value.split('-');

    date.setFullYear(+year);
    date.setMonth(+month - 1);
    date.setDate(+day);
  }

  if (selectYear) {
    const start = new Date();

    start.setFullYear(new Date().getFullYear() + 5);

    return (
      <>
        <div className="font-semibold text-center">
          Выберите год
        </div>
        <div className="flex flex-row gap-1 flex-wrap justify-center h-[350px] overflow-auto">
          {new Array(200).fill(null).map((_, i) => start.getFullYear() - i).map((year) => (
            <button
              type="button"
              className={"btn w-[75px]" + (year === date.getFullYear() ? ' btn-primary' : '')}
              onClick={() => {
                onChange(`${year}-01-01`);
                setSelectYear(false);
              }}
            >
              {year}
            </button>
          ))}
        </div>
      </>
    );
  }

  return (
    <div
      className="w-full flex flex-row justify-center"
      onClick={(e) => {
        if ((e.target as HTMLDivElement).className === 'rdp-caption_label') {
          setSelectYear(true);
        }
      }}
    >
      <DayPicker
        mode="single"
        className="!mx-auto !w-max h-[350px] select-none"
        month={month}
        onMonthChange={setMonth}
        locale={ru}
        onDayClick={(date: Date) => {
          onChange(`${date.getFullYear()}-${f(date.getMonth() + 1)}-${f(date.getDate())}`);
          
        }}
      />
    </div>
  )
}

export function DateInput({ name, defaultValue }: { name: string, defaultValue: string }) {
  const [value, setValue] = useState(defaultValue);
  const modal = useModal();

  useEffect(() => setValue(defaultValue), [defaultValue]);

  return (
    <>
      <input name={name} type="text" readOnly value={value} className="input" onClick={modal.open} />
      <Modal ref={modal.ref}>
        <Picker
          value={value}
          onChange={setValue}
        />
        <div className="flex flex-row justify-end mt-3">
          <button className="btn" onClick={modal.close}>
            Ок
          </button>
        </div>
      </Modal>
    </>
  );
}