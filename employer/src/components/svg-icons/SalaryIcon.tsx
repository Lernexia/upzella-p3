import React from 'react';
import { SalaryIconProps } from '@/types/props/IconProps.types';

const SalaryIcon: React.FC<SalaryIconProps> = ({
    size = 24,
    color = 'currentColor',
    className = '',
    currency = 'INR',
    animate = false
}) => {
    // Define currency symbols
    const currencySymbols: Record<string, string> = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'INR': '₹',
        'JPY': '¥',
        'CNY': '¥',
        'CAD': '$',
        'AUD': '$',
    };

    // Use the currency symbol or default to the currency code if symbol not found
    const symbol = currencySymbols[currency] || currency;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}        >
            {animate && (
                <defs>
                    <style>
                        {`
                            
                            @keyframes currencyGlow {
                                0%, 100% { 
                                    fill: #22c55e;
                                    filter: drop-shadow(0 0 2px rgba(34, 197, 94, 0.3));
                                }
                                50% { 
                                    fill: #16a34a;
                                    filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.6));
                                }
                            }
                            @keyframes moneyFloat {
                                0%, 100% { 
                                    transform: translateY(0px);
                                }
                                50% { 
                                    transform: translateY(-1px);
                                }
                            }
                            .money-container {
                                animation: moneyShake 2s ease-in-out infinite;
                                transform-origin: center center;
                            }
                            .currency-symbol {
                                animation: currencyGlow 2s ease-in-out infinite;
                            }
                            .money-note {
                                animation: moneyFloat 3s ease-in-out infinite;
                            }
                        `}
                    </style>
                </defs>
            )}            <g className={animate ? "money-container" : ""}>
            {/* Simple banknote/money */}
            <rect
                x="3"
                y="7"
                width="18"
                height="10"
                rx="2"
                fill={color}
                fillOpacity="0.1"
                stroke={color}
                strokeWidth="1.5"
                className={animate ? "money-note" : ""}
            />

            {/* Dollar sign in center */}
            <circle
                cx="12"
                cy="12"
                r="3.5"
                fill="none"
                stroke={color}
                strokeWidth="1.2"
                opacity="0.3"
            />

            {/* Simple corner decorations */}
            <circle cx="6" cy="10" r="1" fill={color} opacity="0.3" />
            <circle cx="18" cy="10" r="1" fill={color} opacity="0.3" />
            <circle cx="6" cy="14" r="1" fill={color} opacity="0.3" />
            <circle cx="18" cy="14" r="1" fill={color} opacity="0.3" />

            {/* Currency symbol in center */}
            <text
                x="12"
                y="14.9"
                textAnchor="middle"
                fontSize="8"
                fill={animate ? "#22c55e" : color}
                fontWeight="bold"
                fontFamily="sans-serif"
                className={animate ? "currency-symbol" : ""}
            >
                {symbol}
            </text>
            </g>
        </svg>
    );
};

export default SalaryIcon;
