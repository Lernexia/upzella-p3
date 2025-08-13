import Link from 'next/link';

export default function TestIndexPage() {
    const testRoutes = [
        { name: 'Typography', href: '/test/typography', description: 'Font families, sizes, weights, and text styles' },
        { name: 'Colors', href: '/test/colors', description: 'Blue, purple, pink color palettes and gradients' },
        { name: 'Buttons', href: '/test/buttons', description: 'All button variants, sizes, and states' },
        { name: 'Inputs', href: '/test/inputs', description: 'Input fields, validation states, and variants' },
        { name: 'Modals', href: '/test/modals', description: 'Modal dialogs with different sizes and animations' },
        { name: 'Cards', href: '/test/cards', description: 'Card components and layouts' },
        { name: 'Forms', href: '/test/forms', description: 'Complete form examples and validation' },
        { name: 'SVG Icons', href: '/test/svg', description: 'Complete icon library with interactive preview' },
        { name: 'Navigation', href: '/test/navigation', description: 'Tabs, breadcrumbs, pagination, and menus' },
        { name: 'Feedback', href: '/test/feedback-alt', description: 'Alerts, notifications, and status indicators' },
        { name: 'Data Display', href: '/test/data-display', description: 'Tables, lists, stats, and data visualization' },
        { name: 'Extended UI', href: '/test/extended-ui', description: 'Toggles, tooltips, checkboxes, and advanced components' },
    ];

    return (
        <div className="min-h-screen ">
            <div className="sizer space-y-8">
                <div className="text-center mb-16 pt-16">
                    {/* Header */}
                    <div className="text-center mb-16 w-full">
                        <h1 className="font-heading text-5xl font-bold text-gradient mb-4">
                            Upzella Design System
                        </h1>
                        <p className="font-title text-xl text-gray-700 mb-2">
                            Component Testing & Style Guide
                        </p>
                        <p className="font-body text-gray-600 max-w-2xl mx-auto">
                            Explore all UI components, design tokens, and patterns used in the Upzella platform.
                            Each section demonstrates different variations, states, and usage examples.
                        </p>
                    </div>
                </div>

                <div className="">
                    {/* Test Routes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {testRoutes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className="group block"
                            >
                                <div className="card hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                                    <h3 className="font-title text-xl font-semibold text-gray-800 mb-3 group-hover:text-gradient transition-colors duration-300">
                                        {route.name}
                                    </h3>
                                    <p className="font-body text-gray-600 text-sm leading-relaxed">
                                        {route.description}
                                    </p>
                                    <div className="mt-4 flex items-center text-blue-600 font-accent text-sm">
                                        View Examples
                                        <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="card text-center bg-gradient-to-br from-blue-50 to-blue-100">
                        <div className="text-3xl font-bold text-blue-700 mb-2">28+</div>
                        <div className="font-accent text-blue-600">UI Components</div>
                    </div>
                    <div className="card text-center bg-gradient-to-br from-purple-50 to-purple-100">
                        <div className="text-3xl font-bold text-purple-700 mb-2">4</div>
                        <div className="font-accent text-purple-600">Font Families</div>
                    </div>
                    <div className="card text-center bg-gradient-to-br from-pink-50 to-pink-100">
                        <div className="text-3xl font-bold text-pink-700 mb-2">50+</div>
                        <div className="font-accent text-pink-600">Color Tokens</div>
                    </div>
                    <div className="card text-center bg-gradient-to-br from-gray-50 to-gray-100">
                        <div className="text-3xl font-bold text-gray-700 mb-2">100%</div>
                        <div className="font-accent text-gray-600">Responsive</div>
                    </div>
                </div>

                {/* Design Principles */}
                <div className="card-gradient">
                    <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6 text-center">
                        Design Principles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-title text-lg font-semibold text-gray-800 mb-2">Performance First</h3>
                            <p className="font-body text-gray-600 text-sm">Optimized components with minimal bundle size and maximum performance.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-title text-lg font-semibold text-gray-800 mb-2">Mobile Ready</h3>
                            <p className="font-body text-gray-600 text-sm">Responsive design that works seamlessly across all device sizes.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-title text-lg font-semibold text-gray-800 mb-2">Accessibility</h3>
                            <p className="font-body text-gray-600 text-sm">Built with ARIA standards and keyboard navigation support.</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-8 border-t border-gray-200">
                    <div className="text-center">
                        <p className="font-body text-gray-600">
                            Upzella Design System - Built with Next.js 15, TypeScript, and Tailwind CSS
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
