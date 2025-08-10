'use client';

import Link from 'next/link';
import { Card } from '@/components/ui-components/Card';
import { Button } from '@/components/ui-components/Button';

export default function CardsTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="sizer">
        <div className="text-center mb-16 pt-16">
          <Link 
            href="/test" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 font-accent"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Test Index
          </Link>
          <h1 className="font-heading text-5xl font-bold text-gradient mb-4">
            Card Components
          </h1>
          <p className="font-body text-xl text-gray-700">
            Various card styles, layouts, and content patterns
          </p>
        </div>

        {/* Basic Card Variants */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Card Variants
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default" className="p-6">
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-3">Default Card</h3>
              <p className="font-body text-gray-600 mb-4">
                Basic card with default styling and subtle shadow.
              </p>
              <Button variant="outline" size="sm">Learn More</Button>
            </Card>

            <Card variant="elevated" className="p-6">
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-3">Elevated Card</h3>
              <p className="font-body text-gray-600 mb-4">
                Card with more prominent shadow and elevation.
              </p>
              <Button variant="outline" size="sm">Learn More</Button>
            </Card>

            <Card variant="outlined" className="p-6">
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-3">Outlined Card</h3>
              <p className="font-body text-gray-600 mb-4">
                Card with border styling instead of shadow.
              </p>
              <Button variant="outline" size="sm">Learn More</Button>
            </Card>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Feature Cards
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-3">Fast Performance</h3>
              <p className="font-body text-gray-600">
                Lightning-fast processing with optimized algorithms and efficient data handling.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-3">Secure & Reliable</h3>
              <p className="font-body text-gray-600">
                Enterprise-grade security with 99.9% uptime and robust data protection.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-3">User Friendly</h3>
              <p className="font-body text-gray-600">
                Intuitive interface designed for ease of use and optimal user experience.
              </p>
            </Card>
          </div>
        </div>

        {/* Product Cards */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Product Cards
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-accent text-blue-600 bg-blue-100 px-2 py-1 rounded">Starter</span>
                  <span className="font-title text-2xl font-bold text-gray-800">$29<span className="text-sm text-gray-500">/mo</span></span>
                </div>
                <h3 className="font-title text-xl font-semibold text-gray-800 mb-3">Basic Plan</h3>
                <p className="font-body text-gray-600 mb-4">
                  Perfect for small teams getting started with our platform.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 5 team members
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    10GB storage
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Email support
                  </li>
                </ul>
                <Button variant="primary" size="sm" className="w-full">Get Started</Button>
              </div>
            </Card>

            <Card className="overflow-hidden relative">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-accent">
                Popular
              </div>
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-accent text-purple-600 bg-purple-100 px-2 py-1 rounded">Professional</span>
                  <span className="font-title text-2xl font-bold text-gray-800">$99<span className="text-sm text-gray-500">/mo</span></span>
                </div>
                <h3 className="font-title text-xl font-semibold text-gray-800 mb-3">Pro Plan</h3>
                <p className="font-body text-gray-600 mb-4">
                  Advanced features for growing businesses and teams.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 25 team members
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    100GB storage
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced analytics
                  </li>
                </ul>
                <Button variant="primary" size="sm" className="w-full">Upgrade Now</Button>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-pink-400 to-blue-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-accent text-pink-600 bg-pink-100 px-2 py-1 rounded">Enterprise</span>
                  <span className="font-title text-xl font-bold text-gray-800">Custom</span>
                </div>
                <h3 className="font-title text-xl font-semibold text-gray-800 mb-3">Enterprise Plan</h3>
                <p className="font-body text-gray-600 mb-4">
                  Custom solutions for large organizations and enterprises.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited team members
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited storage
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    24/7 dedicated support
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom integrations
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full">Contact Sales</Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Team Cards */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Team Member Cards
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-title text-2xl">JD</span>
              </div>
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-1">John Doe</h3>
              <p className="font-body text-blue-600 text-sm mb-3">CEO & Founder</p>
              <p className="font-body text-gray-600 text-sm mb-4">
                Visionary leader with 15+ years in tech industry.
              </p>
              <div className="flex justify-center space-x-3">
                <button className="text-blue-600 hover:text-blue-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>
                <button className="text-blue-600 hover:text-blue-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
              </div>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-title text-2xl">JS</span>
              </div>
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-1">Jane Smith</h3>
              <p className="font-body text-purple-600 text-sm mb-3">CTO</p>
              <p className="font-body text-gray-600 text-sm mb-4">
                Technical expert specializing in scalable architecture.
              </p>
              <div className="flex justify-center space-x-3">
                <button className="text-purple-600 hover:text-purple-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>
                <button className="text-purple-600 hover:text-purple-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>
              </div>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-title text-2xl">MB</span>
              </div>
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-1">Mike Brown</h3>
              <p className="font-body text-pink-600 text-sm mb-3">Head of Design</p>
              <p className="font-body text-gray-600 text-sm mb-4">
                Creative designer focused on user experience and aesthetics.
              </p>
              <div className="flex justify-center space-x-3">
                <button className="text-pink-600 hover:text-pink-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>
                <button className="text-pink-600 hover:text-pink-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </button>
              </div>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-title text-2xl">SW</span>
              </div>
              <h3 className="font-title text-lg font-semibold text-gray-800 mb-1">Sarah Wilson</h3>
              <p className="font-body text-blue-600 text-sm mb-3">Head of Marketing</p>
              <p className="font-body text-gray-600 text-sm mb-4">
                Strategic marketer driving growth and brand awareness.
              </p>
              <div className="flex justify-center space-x-3">
                <button className="text-blue-600 hover:text-blue-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>
                <button className="text-blue-600 hover:text-blue-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Interactive Cards */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Interactive Cards
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-title text-lg font-semibold text-gray-800">Analytics Dashboard</h3>
                  <p className="font-body text-sm text-gray-600">Real-time insights</p>
                </div>
              </div>
              <p className="font-body text-gray-600 mb-4">
                Monitor your business performance with comprehensive analytics and detailed reports.
              </p>
              <div className="flex items-center text-blue-600 group-hover:text-blue-800">
                <span className="font-accent text-sm mr-2">Learn more</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-title text-lg font-semibold text-gray-800">Team Collaboration</h3>
                  <p className="font-body text-sm text-gray-600">Work together seamlessly</p>
                </div>
              </div>
              <p className="font-body text-gray-600 mb-4">
                Enhance team productivity with powerful collaboration tools and shared workspaces.
              </p>
              <div className="flex items-center text-purple-600 group-hover:text-purple-800">
                <span className="font-accent text-sm mr-2">Explore features</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-blue-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-title text-lg font-semibold text-gray-800">Security & Compliance</h3>
                  <p className="font-body text-sm text-gray-600">Enterprise-grade protection</p>
                </div>
              </div>
              <p className="font-body text-gray-600 mb-4">
                Keep your data secure with advanced encryption and compliance management tools.
              </p>
              <div className="flex items-center text-pink-600 group-hover:text-pink-800">
                <span className="font-accent text-sm mr-2">View security</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="card bg-gradient-to-br from-blue-50 to-purple-50">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Card Usage Guidelines
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-4">Best Practices</h3>
              <ul className="space-y-3 font-body text-gray-700">
                <li>• Use cards to group related content together</li>
                <li>• Maintain consistent padding and spacing</li>
                <li>• Provide clear visual hierarchy within cards</li>
                <li>• Use appropriate variants based on content importance</li>
                <li>• Keep card content scannable and concise</li>
                <li>• Add interactive states for clickable cards</li>
              </ul>
            </div>
            <div>
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-4">Design Principles</h3>
              <ul className="space-y-3 font-body text-gray-700">
                <li>• Use whitespace effectively for breathing room</li>
                <li>• Ensure sufficient color contrast for accessibility</li>
                <li>• Align content consistently across card layouts</li>
                <li>• Use shadows and elevation purposefully</li>
                <li>• Consider responsive behavior on different screen sizes</li>
                <li>• Test hover and focus states for usability</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
