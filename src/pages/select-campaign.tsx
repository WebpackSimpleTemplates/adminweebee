import { Avatar, Name } from "@/entities/profile";
import { Logout } from "@/features/logout";
import { agent, SERVER_URL, type Campaign } from "@/shared/api";
import { BiPlus } from "react-icons/bi";
import { Link, useLoaderData } from "react-router";

export async function loader({ params: { userId } }: { params: { userId: string } }) {
  const { data: { campaigns } } = await agent.get(`/users/${userId}?populate=campaigns.logo`);

  return campaigns;
}

export default function SelectCampaign() {
  const campaigns = useLoaderData<Campaign[]>();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 h-full w-full flex items-center justify-center p-5">
        <div className="max-w-full w-[500px] max-h-full">
          <div className="text-xl font-bold mb-3">
            Выберите кампанию
          </div>
          <div className="flex flex-row flex-wrap gap-3">
            {campaigns.map((c) => (
              <Link to={'/' + c.id} className="card border-gray-400 border-[1px] p-4 flex flex-col items-center gap-2 w-[190px] h-[240px]">
                <img
                  src={SERVER_URL + c.logo.url}
                  className="w-[150px] h-[150px] rounded-full object-contain object-center"
                />
                {c.name}
              </Link>
            ))}
            <div className="card border-blue-500 text-blue-500 border-[1px] p-4 flex flex-col items-center gap-2 w-[190px] h-[240px]">
              <div className="flex w-[150px] h-[150px] items-center justify-center">
                <BiPlus
                  size={90}
                  color="#0086C9"
                />
              </div>
              Новая кампания
            </div>
          </div>
        </div>
      </div>
      <div className="pb-5">
        <div className="container mx-auto flex flex-row items-center justify-end gap-5">
          <Link to="/profile" className="flex flex-row items-center gap-2">
            <Name />
            <Avatar className="w-[30px] h-[30px] rounded-full object-center object-cover" />
          </Link>
          <Logout />
        </div>
      </div>
    </div>
  );
}