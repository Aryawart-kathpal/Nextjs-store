import {LuUser} from 'react-icons/lu';
import { currentUser,auth } from '@clerk/nextjs/server';

async function UserIcon() {

  // const {userId} = auth();// auth is not async, so if we just need the id we can use this approach
  const user = await currentUser();// this on other hand provides us will all the info of the logged in user

  const profileImage = user?.imageUrl;
  // could also have used next Image component, but not reqd. as for below use 
  if(profileImage){
    return <img src={profileImage} className='w-6 h-6 rounded-full object-cover'/>
  }
  return (
    <LuUser className='w-6 h-6 bg-primary rounded-full text-white'/>
  )
}
export default UserIcon