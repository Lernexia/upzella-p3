'use client'

import React, { ReactNode } from 'react'

interface TabItem {
  id: string
  name: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
  count?: number
  content?: ReactNode
}

interface EnhancedTabsProps {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (tabId: string) => void
  children?: ReactNode
  className?: string
  variant?: 'default' | 'enhanced'
}

export function EnhancedTabs({
  tabs,
  activeTab,
  onTabChange,
  children,
  className = '',
  variant = 'enhanced'
}: EnhancedTabsProps) {
  if (variant === 'enhanced') {
    return (
      <div className={`space-y-1 ${className}`}>
        {/* Enhanced Tabs Container */}
        <div
          className="flex items-center bg-gradient-to-r from-slate-100/80 to-slate-50/80 backdrop-blur-sm p-1.5 shadow-inner w-fit"
          style={{ borderRadius: "var(--border-radius-upzella)" }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-5 py-3 text-sm cursor-pointer font-semibold transition-all duration-300 relative font-body flex items-center gap-2 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform hover:scale-105"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
                style={{ 
                  borderRadius: "var(--border-radius-upzella)", 
                  fontFamily: 'var(--font-accent)' 
                }}
              >
                {Icon && <Icon size={16} className="w-4 h-4" />}
                <span>{tab.name}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Enhanced Tab Content */}
        <div
          className="mt-4"
          style={{ borderRadius: "var(--border-radius-upzella)" }}
        >
          {children}
        </div>
      </div>
    )
  }

  // Default variant (navigation style)
  return (
    <div className={`space-y-0 ${className}`}>
      <div 
        className="border-b border-purple-200/30 bg-white/80 backdrop-blur-xl shadow-lg"
        style={{ borderRadius: "var(--border-radius-upzella) var(--border-radius-upzella) 0 0" }}
      >
        <div className="flex items-center gap-0 px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all relative font-body ${
                  isActive
                    ? 'text-indigo-600 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 border-b-2 border-indigo-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-slate-50/80 hover:to-gray-50/80'
                }`}
                style={isActive ? { borderRadius: "var(--border-radius-upzella) var(--border-radius-upzella) 0 0" } : {}}
              >
                {Icon && <Icon size={16} className="w-4 h-4" />}
                {tab.name}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-600 ml-2 shadow-sm">
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
      
      {children && (
        <div className="mt-0">
          {children}
        </div>
      )}
    </div>
  )
}
