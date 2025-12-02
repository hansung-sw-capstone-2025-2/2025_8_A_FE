/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLoading } from "../contexts/LoadingContext";

export const LoadingSpinner = () => {
  const { isLoading, loadingMessage } = useLoading();
  const [displayedText, setDisplayedText] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const searchMessages = [
    "패널 데이터를 불러오는 중입니다...",
    "조건에 맞는 패널을 검색하고 있습니다...",
    "패널 프로필을 분석하고 있습니다...",
    "검색 결과를 준비하고 있습니다...",
  ];

  const compareMessages = [
    "라이브러리를 비교 분석하고 있습니다...",
    "인사이트를 생성하고 있습니다...",
  ];

  const loadingMessages = loadingMessage?.includes("비교")
    ? compareMessages
    : searchMessages;

  useEffect(() => {
    if (!loadingMessage) {
      setDisplayedText("");
      setCurrentMessageIndex(0);
      setCharIndex(0);
      return;
    }

    const currentMessage = loadingMessages[currentMessageIndex];

    if (charIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentMessage[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 150);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [loadingMessage, currentMessageIndex, charIndex]);

  if (!isLoading) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[150] flex flex-col items-center justify-center gap-6 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
      aria-label="Loading"
      role="status"
    >
      <div className="animate-spin">
        <svg
          width="80"
          height="80"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="226.796" cy="145.227" r="145.227" fill="white" />
          <circle
            cx="168.227"
            cy="254.773"
            r="145.227"
            fill="url(#paint0_linear_236_465)"
          />
          <circle
            cx="226.796"
            cy="145.227"
            r="145.227"
            fill="url(#paint1_linear_236_465)"
            fillOpacity="0.8"
          />
          <path
            d="M168.338 122.561C241.283 122.561 300.439 181.585 300.658 254.478C279.373 269.101 253.599 277.661 225.823 277.661C152.878 277.661 93.7203 218.637 93.502 145.743C114.787 131.12 140.563 122.561 168.338 122.561Z"
            fill="white"
          />
          <circle cx="198.21" cy="201.307" r="52.6038" fill="#A697EE" />
          <circle
            cx="198.21"
            cy="201.307"
            r="52.6038"
            fill="url(#paint2_linear_236_465)"
          />
          <circle cx="198.21" cy="201.307" r="52.6038" fill="#A697EE" />
          <circle
            cx="198.21"
            cy="201.307"
            r="52.6038"
            fill="url(#paint3_linear_236_465)"
          />
          <path
            d="M197.401 172.175L223.974 187.488V218.113L197.401 233.426L170.828 218.113V187.488L197.401 172.175Z"
            fill="#C5BDF5"
          />
          <path
            d="M197.401 172.175L223.974 187.488V218.113L197.401 233.426L170.828 218.113V187.488L197.401 172.175Z"
            fill="url(#paint4_linear_236_465)"
          />
          <path
            d="M197.401 172.175L170.828 156.863M197.401 172.175L170.828 187.488M197.401 172.175L223.974 187.488M223.974 218.113L250.813 202.647M223.974 218.113L197.401 233.426M223.974 218.113V187.488M197.401 233.426L223.539 248.488M197.401 233.426L170.828 218.113M170.828 218.113V247.604M170.828 218.113V187.488M170.828 187.488L144.521 202.647M223.974 156.296V187.488"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="square"
          />
          <defs>
            <linearGradient
              id="paint0_linear_236_465"
              x1="217.298"
              y1="162.883"
              x2="-24.1807"
              y2="533.088"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#A697EE" />
              <stop offset="1" stopColor="#FCCDFF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_236_465"
              x1="315.303"
              y1="11.4025"
              x2="124.32"
              y2="342.196"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DEDAFA" />
              <stop offset="1" stopColor="#C5BDF5" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_236_465"
              x1="215.984"
              y1="168.023"
              x2="128.516"
              y2="302.118"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#A697EE" />
              <stop offset="1" stopColor="#5632A5" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_236_465"
              x1="215.984"
              y1="168.023"
              x2="128.516"
              y2="302.118"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#A697EE" />
              <stop offset="1" stopColor="#5632A5" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_236_465"
              x1="230.057"
              y1="159.915"
              x2="174.008"
              y2="271.842"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DEDAFA" />
              <stop offset="0.779063" stopColor="#A99BFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {loadingMessage && (
        <div className="mt-4 text-center text-white">
          <p className="font-medium text-lg tracking-wide">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>
        </div>
      )}
      <span className="sr-only">Loading...</span>
    </div>,
    document.body
  );
};
