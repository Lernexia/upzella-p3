import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

const AIIcon: React.FC<IconProps> = ({
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
            <defs>
                <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
                
                {animate && (
                    <style>
                        {`
                            @keyframes aiPulse {
                                0%, 100% { opacity: 0.8; }
                                50% { opacity: 1; }
                            }
                            @keyframes neuralFlow {
                                0% { stroke-dashoffset: 10; }
                                100% { stroke-dashoffset: 0; }
                            }
                            @keyframes chipGlow {
                                0%, 100% { stroke-opacity: 0.7; }
                                50% { stroke-opacity: 1; }
                            }
                            @keyframes circuitFlow {
                                0% { opacity: 0.5; }
                                50% { opacity: 1; }
                                100% { opacity: 0.5; }
                            }
                            .ai-neural-node {
                                animation: aiPulse 2s ease-in-out infinite;
                            }
                            .ai-neural-connection {
                                stroke-dasharray: 2 2;
                                animation: neuralFlow 3s linear infinite;
                            }
                            .ai-chip {
                                animation: chipGlow 4s ease-in-out infinite;
                            }
                            .ai-circuit-trace {
                                animation: circuitFlow 3s ease-in-out infinite;
                            }
                        `}
                    </style>
                )}
            </defs>
            
            {/* Main AI Chip */}
            <rect
                x="5"
                y="5"
                width="14"
                height="14"
                rx="3"
                fill="url(#ai-gradient)"
                fillOpacity="0.08"
                stroke="url(#ai-gradient)"
                strokeWidth="1.5"
                className={animate ? "ai-chip" : ""}
            />
                {/* Neural Network Pattern - Simplified */}
            <circle cx="9" cy="9" r="1" fill="url(#ai-gradient)" opacity="0.8" className={animate ? "ai-neural-node" : ""} style={animate ? { animationDelay: '0s' } : {}}/>
            <circle cx="15" cy="9" r="1" fill="url(#ai-gradient)" opacity="0.8" className={animate ? "ai-neural-node" : ""} style={animate ? { animationDelay: '0.5s' } : {}}/>
            <circle cx="12" cy="12" r="1" fill="url(#ai-gradient)" className={animate ? "ai-neural-node" : ""} style={animate ? { animationDelay: '1s' } : {}}/>
            <circle cx="9" cy="15" r="1" fill="url(#ai-gradient)" opacity="0.8" className={animate ? "ai-neural-node" : ""} style={animate ? { animationDelay: '1.5s' } : {}}/>
            <circle cx="15" cy="15" r="1" fill="url(#ai-gradient)" opacity="0.8" className={animate ? "ai-neural-node" : ""} style={animate ? { animationDelay: '2s' } : {}}/>
            
            {/* Neural Connections */}
            <path
                d="M9 9L12 12M15 9L12 12M12 12L9 15M12 12L15 15"
                stroke="url(#ai-gradient)"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.6"
                className={animate ? "ai-neural-connection" : ""}
            />
            
            {/* Circuit Board Traces */}
            <path
                d="M3 8H5M3 12H5M3 16H5"
                stroke="url(#ai-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="1"
                className={animate ? "ai-circuit-trace" : ""}
                style={animate ? { animationDelay: '0.5s' } : {}}
            />
            <path
                d="M19 8H21M19 12H21M19 16H21"
                stroke="url(#ai-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="1"
                className={animate ? "ai-circuit-trace" : ""}
                style={animate ? { animationDelay: '1s' } : {}}
            />
            
            {/* AI Typography */}
            <text
                x="12"
                y="13.8"
                textAnchor="middle"
                fontSize="5"
                fontWeight="900"
                fill={color}
                opacity="0.9"
                fontFamily="system-ui, -apple-system, sans-serif"
            >
                AI
            </text>
        </svg>
    );
};

export default AIIcon;
