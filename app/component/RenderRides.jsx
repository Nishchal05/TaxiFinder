import React, { useState } from 'react';
import { CarListData } from '../data/cardetail';
import Image from 'next/image'; 
import democar from '../../public/democar.webp';
import { ScrollArea } from "../../components/ui/scroll-area"
import { Button } from '../../components/ui/button';
import ManIcon from '@mui/icons-material/Man';
import DrawerFile from './Drawer';

const RenderRides = ({ distance }) => {
  const [renderingElement, setRenderingElement] = useState(5); 

  return (
    <div className='flex flex-col gap-5'>
      <ScrollArea className="h-80">
        {CarListData.slice(0, renderingElement).map((val, index) => (
          <div key={index} className='flex flex-col md:flex-row items-center justify-between bg-white rounded-xl mt-2 p-4'>
            <div className='w-full md:w-1/3'>
              <Image
                src={val.image.startsWith('/') ? democar : val.image} 
                alt={val.name}
                width={300}  // Adjusted width for larger screens
                height={200} // Adjusted height for larger screens
                className="w-full h-auto" // Make the image responsive
              />
            </div>
            <div className='flex flex-col w-full md:w-2/3 md:ml-4'>
              <div className='flex items-center gap-2'>
                <h2 className='font-bold text-[1.2rem] md:text-[1.4rem]'>{val.name}</h2>
                <ManIcon />
                <span>{val.seat}</span>
              </div>
              <p className='text-sm md:text-base'>{val.desc}</p>
              <div className='md:flex flex-col gap-4'>
                <p className='text-lg font-semibold'>
                  Price: ${(val.amount * distance).toFixed(2)}
                </p>
              </div>
              <DrawerFile 
                index={index} 
                carname={val.name} 
                price={(val.amount * distance).toFixed(2)} 
                pic={val.image.startsWith('/') ? democar : val.image} 
              />
            </div>
          </div>
        ))}
      </ScrollArea>
      <Button 
        onClick={() => setRenderingElement(renderingElement + 5)} 
        className="self-center mt-4"
      >
        More...
      </Button>
    </div>
  );
};

export default RenderRides;
