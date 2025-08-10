import { Logo } from "../Logo";

export const UpzellaLoader = ({ text = 'Loading Upzella...', fullScreen = true }: { text?: string; fullScreen?: boolean }) => {
    return (
        <div className={`
            ${fullScreen ? 'min-h-screen w-full' : 'h-64'} 
            flex items-center justify-center bg-white fixed z-[9999] top-0 left-0 w-full h-full overflow-hidden cursor-none
        `}>
            <div className="text-center flex flex-col items-center justify-center">
                {/* Logo display */}
                <div className="text-center flex items-center justify-center">
                    <Logo size="lg" link=''/>
                </div>
                  {/* Text with dots animation */}
                {text && (
                    <div className="mt-4">
                        <div className="text-sm font-medium text-gray-700 tracking-wide" 
                        dangerouslySetInnerHTML={{ __html: text }}
                        />
                        <div className="flex justify-center mt-3 space-x-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-purple-600 animate-bounce"
                                  style={{ animationDelay: '0s' }}></span>
                            <span className="inline-block w-2 h-2 rounded-full bg-purple-600 animate-bounce" 
                                  style={{ animationDelay: '0.2s' }}></span>
                            <span className="inline-block w-2 h-2 rounded-full bg-pink-500 animate-bounce" 
                                  style={{ animationDelay: '0.4s' }}></span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const InlineLoader = ({
    size = 'md', 
    variant = 'dots', 
    color = 'purple',
    text,
    className = ''
}: { 
    size?: 'sm' | 'md' | 'lg';
    variant?: 'dots' | 'candidates' | 'matching' | 'processing' | 'uploading';
    color?: 'purple' | 'blue' | 'emerald' | 'slate';
    text?: string;
    className?: string;
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6', 
        lg: 'w-8 h-8'
    };

    const colorClasses = {
        purple: {
            primary: 'bg-gradient-to-r from-purple-600 to-pink-500',
            secondary: 'bg-gradient-to-r from-purple-400 to-pink-400',
            tertiary: 'bg-gradient-to-r from-indigo-500 to-purple-600',
            border: 'border-purple-600',
            glow: 'shadow-lg shadow-purple-500/25'
        },
        blue: {
            primary: 'bg-gradient-to-r from-blue-600 to-cyan-500',
            secondary: 'bg-gradient-to-r from-blue-400 to-cyan-400', 
            tertiary: 'bg-gradient-to-r from-indigo-600 to-blue-600',
            border: 'border-blue-600',
            glow: 'shadow-lg shadow-blue-500/25'
        },
        emerald: {
            primary: 'bg-gradient-to-r from-emerald-600 to-teal-500',
            secondary: 'bg-gradient-to-r from-emerald-400 to-teal-400',
            tertiary: 'bg-gradient-to-r from-green-600 to-emerald-600',
            border: 'border-emerald-600',
            glow: 'shadow-lg shadow-emerald-500/25'
        },
        slate: {
            primary: 'bg-gradient-to-r from-slate-600 to-gray-500',
            secondary: 'bg-gradient-to-r from-slate-400 to-gray-400',
            tertiary: 'bg-gradient-to-r from-gray-600 to-slate-600',
            border: 'border-slate-600',
            glow: 'shadow-lg shadow-slate-500/25'
        }
    };

    const dotSize = {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4'
    };

    const renderAnimation = () => {
        switch (variant) {
            case 'dots':
                return (
                    <div className="flex items-center gap-1.5">
                        <div 
                            className={`${dotSize[size]} ${colorClasses[color].primary} rounded-full animate-bounce`} 
                            style={{ 
                                animationDelay: '0s',
                                borderRadius: 'var(--border-radius-upzella)'
                            }}
                        ></div>
                        <div 
                            className={`${dotSize[size]} ${colorClasses[color].secondary} rounded-full animate-bounce`} 
                            style={{ 
                                animationDelay: '0.2s',
                                borderRadius: 'var(--border-radius-upzella)'
                            }}
                        ></div>
                        <div 
                            className={`${dotSize[size]} ${colorClasses[color].tertiary} rounded-full animate-bounce`} 
                            style={{ 
                                animationDelay: '0.4s',
                                borderRadius: 'var(--border-radius-upzella)'
                            }}
                        ></div>
                    </div>
                );

            case 'candidates':
                // Represents searching/filtering candidates
                return (
                    <div className="flex items-center gap-1">
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className={`w-1.5 ${colorClasses[color].primary} animate-pulse`}
                                style={{ 
                                    height: size === 'sm' ? '8px' : size === 'md' ? '12px' : '16px',
                                    animationDelay: `${i * 0.15}s`,
                                    animationDuration: '1.2s',
                                    borderRadius: 'var(--border-radius-upzella)'
                                }}
                            ></div>
                        ))}
                        <div className="ml-1">
                            <div 
                                className={`${dotSize[size]} ${colorClasses[color].tertiary} rounded-full animate-spin`}
                                style={{ borderRadius: 'var(--border-radius-upzella)' }}
                            ></div>
                        </div>
                    </div>
                );

            case 'matching':
                // Represents AI matching process
                return (
                    <div className="relative flex items-center">
                        <div 
                            className={`${sizeClasses[size]} ${colorClasses[color].primary} rounded-full animate-pulse ${colorClasses[color].glow}`}
                            style={{ borderRadius: 'var(--border-radius-upzella)' }}
                        ></div>
                        <div 
                            className={`absolute inset-0 ${colorClasses[color].secondary} rounded-full animate-ping`}
                            style={{ 
                                borderRadius: 'var(--border-radius-upzella)',
                                animationDuration: '2s'
                            }}
                        ></div>
                        <div 
                            className={`absolute inset-1 bg-white rounded-full animate-spin`}
                            style={{ 
                                borderRadius: 'var(--border-radius-upzella)',
                                animationDuration: '3s'
                            }}
                        ></div>
                    </div>
                );

            case 'processing':
                // Represents data processing/analysis
                return (
                    <div className="flex items-center gap-0.5">
                        {[0, 1, 2, 3, 4, 5].map((i, index) => (
                            <div
                                key={index}
                                className={`w-0.5 bg-gradient-to-t ${colorClasses[color].primary}`}
                                style={{ 
                                    height: size === 'sm' ? '10px' : size === 'md' ? '14px' : '18px',
                                    animationDelay: `${i * 0.1}s`,
                                    animationDuration: '1.5s',
                                    borderRadius: 'var(--border-radius-upzella)',
                                    animation: `processing-wave 1.5s ease-in-out infinite`,
                                    transform: `translateY(${Math.sin(i * 0.5) * 2}px)`
                                }}
                            ></div>
                        ))}
                    </div>
                );

            case 'uploading':
                // Represents file upload/document processing
                return (
                    <div className="relative">
                        <div 
                            className={`${sizeClasses[size]} border-2 ${colorClasses[color].border} rounded-full animate-spin`}
                            style={{ 
                                borderRadius: 'var(--border-radius-upzella)',
                                borderTopColor: 'transparent',
                                borderRightColor: 'transparent'
                            }}
                        ></div>
                        <div 
                            className={`absolute inset-2 ${colorClasses[color].primary} rounded-full animate-pulse`}
                            style={{ borderRadius: 'var(--border-radius-upzella)' }}
                        ></div>
                    </div>
                );

            default:
                return (
                    <div 
                        className={`${sizeClasses[size]} border-2 border-t-transparent ${colorClasses[color].border} rounded-full animate-spin`}
                        style={{ borderRadius: 'var(--border-radius-upzella)' }}
                    ></div>
                );
        }
    };

    return (
        <div className={`inline-flex items-center gap-3 ${className}`}>
            <style jsx>{`
                @keyframes processing-wave {
                    0%, 100% { transform: translateY(0) scaleY(1); }
                    50% { transform: translateY(-2px) scaleY(1.2); }
                }
            `}</style>
            {renderAnimation()}
            {text && (
                <span 
                    className={`
                        ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'} 
                        font-medium text-slate-600 font-body
                    `}
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    {text}
                </span>
            )}
        </div>
    );
};

export const CustomSpinLoader = ({ 
    size = 'md',
    variant = 'recruitment',
    className = '',
    text
}: {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'recruitment' | 'ai-matching' | 'data-sync' | 'document';
    className?: string;
    text?: string;
}) => {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    const renderSpinner = () => {
        switch (variant) {
            case 'recruitment':
                return (
                    <div className="relative">
                        <style jsx>{`
                            @keyframes recruitmentSpin {
                                0% { 
                                    transform: rotate(0deg) scale(1);
                                    border-color: var(--color-purple-600) transparent var(--color-pink-500) transparent;
                                }
                                25% { 
                                    transform: rotate(90deg) scale(1.05);
                                    border-color: var(--color-pink-500) transparent var(--color-blue-500) transparent;
                                }
                                50% { 
                                    transform: rotate(180deg) scale(1);
                                    border-color: var(--color-blue-500) transparent var(--color-emerald-500) transparent;
                                }
                                75% { 
                                    transform: rotate(270deg) scale(1.05);
                                    border-color: var(--color-emerald-500) transparent var(--color-purple-600) transparent;
                                }
                                100% { 
                                    transform: rotate(360deg) scale(1);
                                    border-color: var(--color-purple-600) transparent var(--color-pink-500) transparent;
                                }
                            }
                            
                            .recruitment-spinner {
                                animation: recruitmentSpin 2.5s ease-in-out infinite;
                            }
                        `}</style>
                        
                        <div 
                            className={`${sizeClasses[size]} border-3 recruitment-spinner shadow-lg`}
                            style={{ 
                                borderWidth: size === 'sm' ? '2px' : size === 'md' ? '3px' : '4px',
                                borderRadius: 'var(--border-radius-upzella)',
                                background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))'
                            }}
                        ></div>
                        
                        {/* Inner talent icon representation */}
                        <div 
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse"
                            style={{
                                width: size === 'sm' ? '6px' : size === 'md' ? '8px' : '12px',
                                height: size === 'sm' ? '6px' : size === 'md' ? '8px' : '12px',
                                borderRadius: 'var(--border-radius-upzella)'
                            }}
                        ></div>
                    </div>
                );

            case 'ai-matching':
                return (
                    <div className="relative">
                        <style jsx>{`
                            @keyframes aiMatching {
                                0% { 
                                    transform: rotate(0deg);
                                    border-color: var(--color-purple-600) var(--color-blue-500) var(--color-emerald-500) var(--color-pink-500);
                                }
                                33% { 
                                    transform: rotate(120deg);
                                    border-color: var(--color-blue-500) var(--color-emerald-500) var(--color-pink-500) var(--color-purple-600);
                                }
                                66% { 
                                    transform: rotate(240deg);
                                    border-color: var(--color-emerald-500) var(--color-pink-500) var(--color-purple-600) var(--color-blue-500);
                                }
                                100% { 
                                    transform: rotate(360deg);
                                    border-color: var(--color-purple-600) var(--color-blue-500) var(--color-emerald-500) var(--color-pink-500);
                                }
                            }
                            
                            @keyframes aiPulse {
                                0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
                                50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
                            }
                            
                            .ai-matching-spinner {
                                animation: aiMatching 3s linear infinite;
                            }
                            
                            .ai-core {
                                animation: aiPulse 2s ease-in-out infinite;
                            }
                        `}</style>
                        
                        <div 
                            className={`${sizeClasses[size]} border-3 ai-matching-spinner shadow-lg shadow-purple-500/30`}
                            style={{ 
                                borderWidth: size === 'sm' ? '2px' : size === 'md' ? '3px' : '4px',
                                borderRadius: 'var(--border-radius-upzella)'
                            }}
                        ></div>
                        
                        {/* AI brain representation */}
                        <div 
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-violet-500 to-purple-600 ai-core"
                            style={{
                                width: size === 'sm' ? '8px' : size === 'md' ? '10px' : '14px',
                                height: size === 'sm' ? '8px' : size === 'md' ? '10px' : '14px',
                                borderRadius: 'var(--border-radius-upzella)'
                            }}
                        ></div>
                    </div>
                );

            case 'data-sync':
                return (
                    <div className="relative">
                        <style jsx>{`
                            @keyframes dataSync {
                                0% { 
                                    transform: rotate(0deg);
                                    border-color: var(--color-blue-600) transparent var(--color-cyan-500) transparent;
                                }
                                50% { 
                                    transform: rotate(180deg);
                                    border-color: var(--color-cyan-500) transparent var(--color-blue-600) transparent;
                                }
                                100% { 
                                    transform: rotate(360deg);
                                    border-color: var(--color-blue-600) transparent var(--color-cyan-500) transparent;
                                }
                            }
                            
                            @keyframes dataFlow {
                                0%, 100% { opacity: 0.3; transform: translateY(0); }
                                50% { opacity: 1; transform: translateY(-1px); }
                            }
                            
                            .data-sync-spinner {
                                animation: dataSync 1.8s linear infinite;
                            }
                            
                            .data-flow {
                                animation: dataFlow 1.5s ease-in-out infinite;
                            }
                        `}</style>
                        
                        <div 
                            className={`${sizeClasses[size]} border-3 data-sync-spinner shadow-lg shadow-blue-500/25`}
                            style={{ 
                                borderWidth: size === 'sm' ? '2px' : size === 'md' ? '3px' : '4px',
                                borderRadius: 'var(--border-radius-upzella)'
                            }}
                        ></div>
                        
                        {/* Data flow indicator */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex gap-0.5">
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="w-0.5 bg-gradient-to-t from-blue-600 to-cyan-500 data-flow"
                                        style={{
                                            height: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px',
                                            animationDelay: `${i * 0.2}s`,
                                            borderRadius: 'var(--border-radius-upzella)'
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'document':
                return (
                    <div className="relative">
                        <style jsx>{`
                            @keyframes documentScan {
                                0% { 
                                    transform: rotate(0deg);
                                    border-color: var(--color-emerald-600) transparent var(--color-teal-500) transparent;
                                }
                                100% { 
                                    transform: rotate(360deg);
                                    border-color: var(--color-emerald-600) transparent var(--color-teal-500) transparent;
                                }
                            }
                            
                            @keyframes documentProgress {
                                0% { height: 0%; }
                                100% { height: 70%; }
                            }
                            
                            .document-spinner {
                                animation: documentScan 2s linear infinite;
                            }
                            
                            .document-progress {
                                animation: documentProgress 3s ease-in-out infinite;
                            }
                        `}</style>
                        
                        <div 
                            className={`${sizeClasses[size]} border-3 document-spinner shadow-lg shadow-emerald-500/25`}
                            style={{ 
                                borderWidth: size === 'sm' ? '2px' : size === 'md' ? '3px' : '4px',
                                borderRadius: 'var(--border-radius-upzella)'
                            }}
                        ></div>
                        
                        {/* Document processing indicator */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div 
                                className="bg-gradient-to-t from-emerald-600 to-teal-500 document-progress"
                                style={{
                                    width: size === 'sm' ? '2px' : size === 'md' ? '3px' : '4px',
                                    borderRadius: 'var(--border-radius-upzella)'
                                }}
                            ></div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="relative">
                        <style jsx>{`
                            @keyframes defaultUpzellaSpin {
                                0% { 
                                    transform: rotate(0deg) scale(1);
                                    border-color: var(--color-purple-600) transparent var(--color-pink-500) transparent;
                                }
                                50% { 
                                    transform: rotate(180deg) scale(1.05);
                                    border-color: var(--color-pink-500) transparent var(--color-purple-600) transparent;
                                }
                                100% { 
                                    transform: rotate(360deg) scale(1);
                                    border-color: var(--color-purple-600) transparent var(--color-pink-500) transparent;
                                }
                            }
                            
                            .default-spinner {
                                animation: defaultUpzellaSpin 2s ease-in-out infinite;
                            }
                        `}</style>
                        
                        <div 
                            className={`${sizeClasses[size]} border-3 default-spinner shadow-lg`}
                            style={{ 
                                borderWidth: size === 'sm' ? '2px' : size === 'md' ? '3px' : '4px',
                                borderRadius: 'var(--border-radius-upzella)'
                            }}
                        ></div>
                        
                        <div 
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse"
                            style={{
                                width: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px',
                                height: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px',
                                borderRadius: 'var(--border-radius-upzella)'
                            }}
                        ></div>
                    </div>
                );
        }
    };

    return (
        <div className={`inline-flex items-center gap-3 ${className}`}>
            {renderSpinner()}
            
            {text && (
                <span 
                    className={`
                        ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'} 
                        font-medium text-slate-600 font-body
                    `}
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    {text}
                </span>
            )}
        </div>
    );
};

