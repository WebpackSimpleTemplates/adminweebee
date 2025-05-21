import { Header } from "@/widgets/header";
import { NewChannelForm } from "@/widgets/new-channel-form";

export const meta = () => [
  { title: "Новый канал" },
];

export default function() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="w-full h-full flex justify-center items-center p-3">
        <div className="w-full max-w-[450px]">
          <div className="text-xl text-center font-semibold mb-3">
            Новый канал
          </div>
          <NewChannelForm />
        </div>
      </div>
    </div>
  );
}