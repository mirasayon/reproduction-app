"use client";
/** Add your relevant code here for the issue to reproduce */

import { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

interface Items {
  title: string;
  cover: string;
  description: string;
}

export default function Chart_Animes_Carousel_Wrapper() {
  const items: Items[] = [
    {
      title: "NODEJS",
      cover: "https://i.postimg.cc/Vkn1Jxb7/nodejs.png",

      description: "javascript runtime",
    },
    {
      title: "NEXTJS",
      cover: "https://i.postimg.cc/tJJnyqJv/image.png",

      description: "The react Framework",
    },
    {
      title: "Deno.js",
      cover: "https://i.postimg.cc/MGjm1YYK/image.png",

      description: "Rust-based javascript runtime",
    },
  ];
  return (
    <Carousel>
      {items.map((item) => {
        return (
          <div key={item.cover} className="relative w-screen">
            <div>
              <img
                height={500}
                alt="cover"
                src={item.cover}
                className="h-[500px] object-cover object-top w-screen "
              />

              <section className="absolute top-0 left-0 rounded-sm m-4 bg-violet-300/50 h-40 p-3 overflow-auto grid">
                <span className="text-xl m-1 overflow-hidden h-7 font-bold">
                  {item.title}
                </span>
                {item.description}
              </section>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}

function Carousel({ children }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  useEffect(() => {
    const slideIntervalID: NodeJS.Timeout = setInterval(
      () =>
        setCurrentIndex(
          currentIndex === children.length - 1 ? 0 : currentIndex + 1
        ),
      8000
    );
    return () => clearInterval(slideIntervalID);
  }, [currentIndex]);

  return (
    <div className="overflow-hidden relative group m-2">
      <div
        className="flex w-max transition-transform ease-out duration-1000"
        style={{
          transform: `translateX(-${window.innerWidth * currentIndex}px)`,
        }}
      >
        {children}
      </div>
      <button
        type="button"
        onClick={() =>
          setCurrentIndex(
            currentIndex === 0 ? children.length - 1 : currentIndex - 1
          )
        }
        className="hidden group-hover:block p-1 absolute top-[45%] left-2 rounded-full shadow bg-white/70 text-gray-800 hover:bg-white"
      >
        <BsChevronCompactLeft size={40} />
      </button>
      <button
        onClick={() =>
          setCurrentIndex(
            currentIndex === children.length - 1 ? 0 : currentIndex + 1
          )
        }
        type="button"
        className="hidden group-hover:block p-1 absolute top-[45%] right-2 rounded-full shadow bg-white/70 text-gray-800 hover:bg-white"
      >
        <BsChevronCompactRight size={40} />
      </button>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {children.map((_arr, ind) => {
            return (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={ind}
                className={`transition-all w-3 h-3 bg-violet-500 rounded-full ${
                  currentIndex === ind ? "p-2" : "bg-opacity-50"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
