import React from "react";
import { useSelfInfo } from "@/shared/api";

export function Avatar(props: Omit<React.ComponentProps<'img'>, 'src'>) {
  const { data: { avatar } = {}, isLoading } = useSelfInfo();

  if (isLoading) {
    return <></>;
  }

  return <img {...props} src={avatar?.url || 'https://wee-bee.ru/default-avatar.jpg'} />;
}

export function Name() {
  const { data: { username } = {} } = useSelfInfo();

  return <>{username}</>;
}
