"use client";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import UserAvatar from "./UserAvatar";

interface UserDataProps {
  data: User;
}

const UserBox: React.FC<UserDataProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push("/api/conversations/" + data.data.id);
      })
      .finally(() => setIsLoading(false));
  }, [data.id, router]);

  return (
    <div
      className="w-full flex gap-4 items-center p-3 rounded-md  dark:hover:bg-primary-foreground dark:text-neutral-100 text-zinc-900 cursor-pointer transition hover:bg-gray-200"
      onClick={handleClick}
    >
      <UserAvatar user={data}/>
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium">{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
