import prisma from '@/lib/prismaDb'
import getSession from './getSession'

const getCurrentUser = async () => {
  try {
    const session = await getSession()
    if(!session || !session.user || !session.user.email){
      return null
    }
    const currentUser = await prisma.user.findUnique({
      where : {
        email: session.user.email
      }
    })

    if(!currentUser){
      return null
    }
    return currentUser
  } catch (error) {
    return null
  }
}

export default getCurrentUser