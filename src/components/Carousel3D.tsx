import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Carousel3DProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function Carousel3D({ 
  images, 
  autoPlay = true, 
  autoPlayInterval = 5000 
}: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // 启动自动轮播
  useEffect(() => {
    if (autoPlay) {
      startAutoPlay();
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval]);
  
  // 开始自动轮播函数
  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
  };
  
  // 停止自动轮播
  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  // 下一张幻灯片
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  // 上一张幻灯片
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  // 跳转到指定幻灯片
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  // 鼠标悬停时停止自动轮播，离开时重新开始
  const handleMouseEnter = () => {
    if (autoPlay) {
      stopAutoPlay();
    }
  };
  
  const handleMouseLeave = () => {
    if (autoPlay) {
      startAutoPlay();
    }
  };
  
  // 计算每个幻灯片的位置和样式
  const getSlideStyle = (index: number) => {
    const angle = ((index - currentIndex) / images.length) * 360;
    const radius = 250; // 旋转半径
    
    const x = Math.sin((angle * Math.PI) / 180) * radius;
    const z = Math.cos((angle * Math.PI) / 180) * radius;
    
    // 根据距离当前幻灯片的位置设置透明度和大小
    const distance = Math.abs(index - currentIndex);
    const opacity = distance === 0 ? 1 : 0.5;
    const scale = distance === 0 ? 1 : 0.8;
    
    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${angle}deg) scale(${scale})`,
      opacity,
      transition: 'transform 1s ease, opacity 0.5s ease',
    };
  };
  
  return (
    <div 
      ref={carouselRef}
      className="carousel-3d-container w-full h-full relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="carousel-3d w-full h-full"
        style={{
          transform: `translateY(${20}px)`, // 微调垂直位置
        }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="carousel-item absolute w-[80%] h-[70%] left-[10%] top-[15%]"
            style={getSlideStyle(index)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl glow">
              <img 
                src={image} 
                alt={`Blockchain technology slide ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* 导航按钮 */}
      <button 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-[#0a0a1f]/70 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#00f5ff]/70 transition-colors z-10"
        onClick={prevSlide}
      >
        <i className="fa-solid fa-chevron-left text-xl"></i>
      </button>
      
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-[#0a0a1f]/70 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#00f5ff]/70 transition-colors z-10"
        onClick={nextSlide}
      >
        <i className="fa-solid fa-chevron-right text-xl"></i>
      </button>
      
      {/* 指示器 */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'w-10 bg-gradient-to-r from-[#00f5ff] to-[#00ff9d]' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}