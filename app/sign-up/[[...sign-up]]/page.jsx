import { SignUp } from "@clerk/nextjs";
import {banner} from "@/public/banner.jpg";
export default function Page() {
  return(
    <div>
    <img src={banner.src} alt="banner" className=" h-screen w-full" />
    <div className=" absolute top-5 right-10">
      <SignUp />
    </div>
  </div>
  )
}
