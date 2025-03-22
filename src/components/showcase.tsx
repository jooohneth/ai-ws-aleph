"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ChatCard from "@/components/chatCard";
import { chats } from "@/lib/chats";

export function Showcase() {
  return (
    <div className="w-full max-w-4xl px-4 h-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full h-full"
      >
        <CarouselContent>
          {chats.map((chat) => (
            <CarouselItem
              key={chat.id}
              className="md:basis-1/2 lg:basis-1/2 h-full"
            >
              <ChatCard chat={chat} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-10 gap-2 items-end">
          <CarouselPrevious className="static transform-none text-black" />
          <CarouselNext className="static transform-none text-black" />
        </div>
      </Carousel>
    </div>
  );
}
