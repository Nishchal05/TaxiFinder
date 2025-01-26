"use client";
import React from "react";
import { Button } from "../../components/ui/button";
import Image from "next/image"; 
import democar from "../../public/democar.webp";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { useRouter } from "next/navigation";
const DrawerFile = ({ index, price, carname, pic }) => {
    const Router=useRouter();
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="border p-2 rounded-lg bg-black text-white hover:opacity-75">
            Book
          </Button>
        </DrawerTrigger>
        <DrawerContent className=' flex flex-col bg-transparent'>
          <DrawerHeader>
            <div className=" flex w-full justify-center">
            <Image
              src={pic || democar} 
              alt={carname}
              width={500}
              height={100}
            />
            </div>
            <DrawerTitle className=' text-white'>{carname}</DrawerTitle>
            <DrawerDescription>
              Price: ${price}.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={()=>{Router.push('/car-payment?amount='+price)}}>Make Payment</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerFile;
