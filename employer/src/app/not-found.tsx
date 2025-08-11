'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui-components/Button'
import { Badge } from '@/components/ui-components/Badge'
import { WarningIcon, ArrowLeftIcon, NavigationIcon } from '@/components/svg-icons'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="sizer text-center">
    
        {/* Main Error Display */}
        <h1 className="text-6xl font-bold text-gray-300 mb-4">
          4<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">0</span>4
        </h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
          <Button 
            variant="outline" 
            size="md"
            leftIcon={<ArrowLeftIcon size={16} />}
            onClick={() => window.history.back()}
            className="flex-1"
          >
            Go Back
          </Button>
          
          <Link href="/" className="flex-1">
            <Button 
              variant="primary" 
              size="md"
              leftIcon={<NavigationIcon size={16} />}
              className="w-full"
            >
              Home Page
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-gray-500 text-sm mt-12">
          Need help? <Link href="/contact" className="text-blue-600 hover:underline">Contact support</Link>
        </p>
      </div>
    </div>
  )
}
