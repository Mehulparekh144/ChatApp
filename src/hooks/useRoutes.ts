import { useMemo } from "react";
import {  usePathname } from "next/navigation";
import {HiChat, HiUser} from 'react-icons/hi'
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

const useRoutes = () =>{
  const pathName = usePathname()
  const {conversationId} = useConversation()

  const routes = useMemo(()=>[
    {
      label : 'Chat',
      href : '/conversations',
      icon : HiChat,
      active : pathName === '/conversation'  || !!conversationId
    },
    {
      label : 'Users',
      href : '/users',
      icon : HiUser,
      active : pathName === '/users' 
    },
    {
      label : 'Logout',
      href : '#',
      icon : HiArrowLeftOnRectangle,
      onClick : ()=> signOut(),
    },

  ] , [pathName , conversationId])

  return routes;
}

export default useRoutes;