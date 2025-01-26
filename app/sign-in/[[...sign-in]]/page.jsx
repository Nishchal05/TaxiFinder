import { SignIn } from '@clerk/nextjs'
export default function Page() {
  return <div>
  
  <img src="/banner.jpg" alt="banner" className='h-screen w-full' />
  
  <div className=' absolute top-5 right-10'>
  <SignIn />
  </div></div>
}