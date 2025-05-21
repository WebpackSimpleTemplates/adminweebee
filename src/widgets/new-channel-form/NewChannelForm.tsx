import { useActionState } from "react";

const initState = {
  step: 0,
  name: '',
  logo: null as { url: string, id: number },
  employees: [] as string[],
  tgToken: '',
  vkToken: '',
};

export function NewChannelForm() {
  const [] = useActionState((state: typeof initState, payload: null | FormData | { firld: string, value: any }) => {
    

    return state;
  }, initState);

  return (
    <>NewChannelForm</>
  );
}