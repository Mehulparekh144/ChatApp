import getUsers from "@/actions/getUsers";
import SideBar from "@/components/SideBar";
import UserList from "@/components/UserList";
import React, { ReactNode } from "react";

export default async function UsersLayout({
  children,
}: {
  children: ReactNode;
}) {

  const users = await getUsers();
  return (
    <SideBar>
      <div className="h-full">
        <UserList users={users!} />
        {children}</div>
    </SideBar>
  );
}
