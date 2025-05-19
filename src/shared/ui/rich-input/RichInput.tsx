
export function RichInput({ name, defaultValue }: { name: string, defaultValue: string }) {
  return (
    <>
      <input type="hidden" name={name} value={defaultValue} />
      
    </>
  );
}

