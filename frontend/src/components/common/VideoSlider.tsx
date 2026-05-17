"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface VideoSliderProps {
  videos: { id: string; title: string }[];
}

const VideoSlider: React.FC<VideoSliderProps> = ({ videos }) => {
  return (
    <div className="w-full px-4 py-6 bg-white shadow rounded-2xl">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id}>
            <div className="rounded-xl overflow-hidden shadow-md bg-white">
              <iframe
                width="100%"
                height="215"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              />
              <div className="p-2 text-sm font-medium text-center text-gray-700">
                {video.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoSlider;
