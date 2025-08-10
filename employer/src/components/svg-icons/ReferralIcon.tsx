import React from 'react';
import { IconProps } from '@/types/props/IconProps.types';

interface ReferralIconProps extends IconProps {
    animation?: boolean;
}

const ReferralIcon: React.FC<ReferralIconProps> = ({ 
    size = 24, 
    color = 'currentColor',
    className = '',
    animation = false
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
            {animation && (
                <style>
                    {`
                        .pulse { animation: pulse 2s ease-in-out infinite; }
                        .slide { animation: slide 3s ease-in-out infinite; }
                        .fade { animation: fade 2s ease-in-out infinite; }
                        
                        @keyframes pulse {
                            0%, 100% { opacity: 0.4; }
                            50% { opacity: 1; }
                        }
                        
                        @keyframes slide {
                            0%, 100% { transform: translateX(0); }
                            50% { transform: translateX(2px); }
                        }
                        
                        @keyframes fade {
                            0%, 100% { opacity: 0.3; }
                            50% { opacity: 0.8; }
                        }
                    `}
                </style>
            )}
            
            {/* Person 1 (Referrer) */}
            <circle 
                cx="7" 
                cy="5" 
                r="2.5" 
                stroke={color} 
                strokeWidth="1.5" 
                fill="none"
            />
            <path 
                d="M7 10.5c-2.2 0-4 1.3-4 3v2.5h8v-2.5c0-1.7-1.8-3-4-3z" 
                stroke={color} 
                strokeWidth="1.5" 
                fill="none"
            />
            
            {/* Person 2 (Referred) */}
            <circle 
                cx="17" 
                cy="5" 
                r="2.5" 
                stroke={color} 
                strokeWidth="1.5" 
                fill="none"
            />
            <path 
                d="M17 10.5c-2.2 0-4 1.3-4 3v2.5h8v-2.5c0-1.7-1.8-3-4-3z" 
                stroke={color} 
                strokeWidth="1.5" 
                fill="none"
            />
            
            {/* Arrow indicating referral direction */}
            <path 
                d="M10 5h4" 
                stroke={color} 
                strokeWidth="1.5" 
                strokeLinecap="round"
                className={animation ? "slide" : ""}
            />
            <path 
                d="M12 3l2 2-2 2" 
                stroke={color} 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={animation ? "slide" : ""}
            />
            
            {/* Handshake/connection symbol */}
            <circle 
                cx="12" 
                cy="5" 
                r="1" 
                fill={color} 
                opacity="0.3"
                className={animation ? "pulse" : ""}
            />
            
            {/* Network nodes showing referral network */}
            <circle 
                cx="7" 
                cy="18" 
                r="1" 
                fill={color} 
                opacity="0.4"
                className={animation ? "fade" : ""}
            />
            <circle 
                cx="17" 
                cy="18" 
                r="1" 
                fill={color} 
                opacity="0.4"
                className={animation ? "fade" : ""}
                style={animation ? { animationDelay: '0.5s' } : {}}
            />
            <circle 
                cx="12" 
                cy="20" 
                r="1" 
                fill={color} 
                opacity="0.4"
                className={animation ? "fade" : ""}
                style={animation ? { animationDelay: '1s' } : {}}
            />
            
            {/* Connection lines */}
            <line 
                x1="7" 
                y1="16" 
                x2="7" 
                y2="17" 
                stroke={color} 
                strokeWidth="1" 
                opacity="0.3"
                className={animation ? "fade" : ""}
            />
            <line 
                x1="17" 
                y1="16" 
                x2="17" 
                y2="17" 
                stroke={color} 
                strokeWidth="1" 
                opacity="0.3"
                className={animation ? "fade" : ""}
                style={animation ? { animationDelay: '0.5s' } : {}}
            />
            <line 
                x1="8" 
                y1="18" 
                x2="11" 
                y2="19" 
                stroke={color} 
                strokeWidth="1" 
                opacity="0.3"
                className={animation ? "fade" : ""}
                style={animation ? { animationDelay: '0.25s' } : {}}
            />
            <line 
                x1="13" 
                y1="19" 
                x2="16" 
                y2="18" 
                stroke={color} 
                strokeWidth="1" 
                opacity="0.3"
                className={animation ? "fade" : ""}
                style={animation ? { animationDelay: '0.75s' } : {}}
            />
        </svg>
    );
};

export default ReferralIcon;
