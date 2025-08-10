import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const VideoIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor',
  className = '',
  animate = false
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {animate && (
        <defs>
          <style>
            {`
              @keyframes videoPlay {
                0%, 100% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.1); opacity: 1; }
              }
              @keyframes videoRecord {
                0%, 100% { fill: ${color}; }
                50% { fill: #EF4444; }
              }
              @keyframes videoStream {
                0% { stroke-dasharray: 0 20; }
                50% { stroke-dasharray: 10 10; }
                100% { stroke-dasharray: 20 0; }
              }
              .video-camera {
                animation: videoPlay 2.5s ease-in-out infinite;
              }
              .video-play {
                animation: videoPlay 2s ease-in-out infinite;
              }
              .video-record {
                animation: videoRecord 1.5s ease-in-out infinite;
              }
              .video-stream {
                animation: videoStream 3s ease-in-out infinite;
              }
            `}
          </style>
        </defs>
      )}
      
      {/* Video camera body */}
      <path 
        d="M23 7l-7 5 7 5V7z" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "video-camera" : ""}
      />
      
      {/* Camera lens */}
      <rect 
        x="1" 
        y="5" 
        width="15" 
        height="14" 
        rx="2" 
        ry="2" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={animate ? "video-stream" : ""}
      />
      
      {/* Play button overlay */}
      <polygon 
        points="7,9 7,15 13,12" 
        fill={color} 
        opacity="0.7"
        className={animate ? "video-play" : ""}
        style={animate ? { animationDelay: '0.3s' } : {}}
      />
      
      {/* Recording indicator when animated */}
      {animate && (
        <circle 
          cx="18" 
          cy="6" 
          r="1.5" 
          className="video-record"
          style={{ animationDelay: '0.6s' }}
        />
      )}
      
      {/* Stream lines when animated */}
      {animate && (
        <>
          <line 
            x1="2" 
            y1="8" 
            x2="4" 
            y2="8" 
            stroke={color} 
            strokeWidth="1" 
            strokeLinecap="round"
            className="video-stream"
            opacity="0.5"
            style={{ animationDelay: '0.9s' }}
          />
          <line 
            x1="2" 
            y1="12" 
            x2="5" 
            y2="12" 
            stroke={color} 
            strokeWidth="1" 
            strokeLinecap="round"
            className="video-stream"
            opacity="0.5"
            style={{ animationDelay: '1.2s' }}
          />
          <line 
            x1="2" 
            y1="16" 
            x2="3.5" 
            y2="16" 
            stroke={color} 
            strokeWidth="1" 
            strokeLinecap="round"
            className="video-stream"
            opacity="0.5"
            style={{ animationDelay: '1.5s' }}
          />
        </>
      )}
    </svg>
  );
};

export default VideoIcon;
