import Link from 'next/link';

export default function ColorsTestPage() {
  const blueShades = [
    { name: 'blue-50', hex: '#eff6ff', value: 'var(--blue-50)' },
    { name: 'blue-100', hex: '#dbeafe', value: 'var(--blue-100)' },
    { name: 'blue-200', hex: '#bfdbfe', value: 'var(--blue-200)' },
    { name: 'blue-300', hex: '#93c5fd', value: 'var(--blue-300)' },
    { name: 'blue-400', hex: '#60a5fa', value: 'var(--blue-400)' },
    { name: 'blue-500', hex: '#3b82f6', value: 'var(--blue-500)' },
    { name: 'blue-600', hex: '#2563eb', value: 'var(--blue-600)' },
    { name: 'blue-700', hex: '#1d4ed8', value: 'var(--blue-700)' },
    { name: 'blue-800', hex: '#1e40af', value: 'var(--blue-800)' },
    { name: 'blue-900', hex: '#1e3a8a', value: 'var(--blue-900)' },
    { name: 'blue-950', hex: '#172554', value: 'var(--blue-950)' },
  ];

  const purpleShades = [
    { name: 'purple-50', hex: '#faf5ff', value: 'var(--purple-50)' },
    { name: 'purple-100', hex: '#f3e8ff', value: 'var(--purple-100)' },
    { name: 'purple-200', hex: '#e9d5ff', value: 'var(--purple-200)' },
    { name: 'purple-300', hex: '#d8b4fe', value: 'var(--purple-300)' },
    { name: 'purple-400', hex: '#c084fc', value: 'var(--purple-400)' },
    { name: 'purple-500', hex: '#a855f7', value: 'var(--purple-500)' },
    { name: 'purple-600', hex: '#9333ea', value: 'var(--purple-600)' },
    { name: 'purple-700', hex: '#7c3aed', value: 'var(--purple-700)' },
    { name: 'purple-800', hex: '#6b21a8', value: 'var(--purple-800)' },
    { name: 'purple-900', hex: '#581c87', value: 'var(--purple-900)' },
    { name: 'purple-950', hex: '#3b0764', value: 'var(--purple-950)' },
  ];

  const pinkShades = [
    { name: 'pink-50', hex: '#fdf2f8', value: 'var(--pink-50)' },
    { name: 'pink-100', hex: '#fce7f3', value: 'var(--pink-100)' },
    { name: 'pink-200', hex: '#fbcfe8', value: 'var(--pink-200)' },
    { name: 'pink-300', hex: '#f9a8d4', value: 'var(--pink-300)' },
    { name: 'pink-400', hex: '#f472b6', value: 'var(--pink-400)' },
    { name: 'pink-500', hex: '#ec4899', value: 'var(--pink-500)' },
    { name: 'pink-600', hex: '#db2777', value: 'var(--pink-600)' },
    { name: 'pink-700', hex: '#be185d', value: 'var(--pink-700)' },
    { name: 'pink-800', hex: '#9d174d', value: 'var(--pink-800)' },
    { name: 'pink-900', hex: '#831843', value: 'var(--pink-900)' },
    { name: 'pink-950', hex: '#500724', value: 'var(--pink-950)' },
  ];

  const gradients = [
    {
      name: 'Primary Gradient',
      css: 'bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500',
      value: 'linear-gradient(135deg, var(--blue-500) 0%, var(--purple-600) 50%, var(--pink-500) 100%)'
    },
    {
      name: 'Secondary Gradient',
      css: 'bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100',
      value: 'linear-gradient(135deg, var(--blue-100) 0%, var(--purple-100) 50%, var(--pink-100) 100%)'
    },
    {
      name: 'Upzella Primary',
      css: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600',
      value: 'var(--upzella-gradient-primary)'
    },
    {
      name: 'Upzella Secondary',
      css: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
      value: 'var(--upzella-gradient-secondary)'
    },
    {
      name: 'Blue to Purple',
      css: 'bg-gradient-to-r from-blue-600 to-purple-600',
      value: 'linear-gradient(135deg, var(--blue-600), var(--purple-600))'
    },
    {
      name: 'Purple to Pink',
      css: 'bg-gradient-to-r from-purple-600 to-pink-600',
      value: 'linear-gradient(135deg, var(--purple-600), var(--pink-600))'
    },
  ];

  const ColorSwatch = ({ color, textClass = 'text-gray-800' }: { color: any, textClass?: string }) => (
    <div className="group cursor-pointer">
      <div 
        className="w-full h-20 rounded-lg mb-3 border border-gray-200 transition-transform group-hover:scale-105"
        style={{ backgroundColor: color.hex }}
      ></div>
      <div className={`font-accent text-sm font-medium ${textClass}`}>
        {color.name}
      </div>
      <div className="font-body text-xs text-gray-500">
        {color.hex}
      </div>
    </div>
  );

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
            Color System
          </h1>
          <p className="font-body text-xl text-gray-700">
            Blue, purple, and pink color palettes with gradients and usage examples
          </p>
        </div>

        {/* Brand Colors Overview */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Brand Colors
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-2xl mx-auto mb-4"></div>
              <h3 className="font-title text-lg font-semibold text-blue-800">Primary Blue</h3>
              <p className="font-body text-sm text-gray-600">#2563eb</p>
              <p className="font-accent text-xs text-gray-500">Trust & Reliability</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-600 rounded-2xl mx-auto mb-4"></div>
              <h3 className="font-title text-lg font-semibold text-purple-800">Secondary Purple</h3>
              <p className="font-body text-sm text-gray-600">#9333ea</p>
              <p className="font-accent text-xs text-gray-500">Innovation & Tech</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-pink-500 rounded-2xl mx-auto mb-4"></div>
              <h3 className="font-title text-lg font-semibold text-pink-800">Accent Pink</h3>
              <p className="font-body text-sm text-gray-600">#ec4899</p>
              <p className="font-accent text-xs text-gray-500">Energy & Action</p>
            </div>
          </div>
        </div>

        {/* Blue Shades */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-blue-800 mb-6">
            Blue Shades
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-4">
            {blueShades.map((color) => (
              <ColorSwatch 
                key={color.name} 
                color={color} 
                textClass={color.name.includes('50') || color.name.includes('100') || color.name.includes('200') ? 'text-gray-800' : 'text-blue-800'}
              />
            ))}
          </div>
        </div>

        {/* Purple Shades */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-purple-800 mb-6">
            Purple Shades
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-4">
            {purpleShades.map((color) => (
              <ColorSwatch 
                key={color.name} 
                color={color} 
                textClass={color.name.includes('50') || color.name.includes('100') || color.name.includes('200') ? 'text-gray-800' : 'text-purple-800'}
              />
            ))}
          </div>
        </div>

        {/* Pink Shades */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-pink-800 mb-6">
            Pink Shades
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-4">
            {pinkShades.map((color) => (
              <ColorSwatch 
                key={color.name} 
                color={color} 
                textClass={color.name.includes('50') || color.name.includes('100') || color.name.includes('200') ? 'text-gray-800' : 'text-pink-800'}
              />
            ))}
          </div>
        </div>

        {/* Gradients */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Gradient Combinations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gradients.map((gradient, index) => (
              <div key={index} className="group">
                <div className={`w-full h-32 rounded-xl mb-4 ${gradient.css} transition-transform group-hover:scale-105`}></div>
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-2">
                  {gradient.name}
                </h3>
                <code className="font-body text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded block">
                  {gradient.css}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Examples */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Text on Colored Backgrounds */}
          <div className="card">
            <h3 className="font-title text-xl font-semibold text-gray-800 mb-6">
              Text on Colored Backgrounds
            </h3>
            <div className="space-y-4">
              <div className="bg-blue-600 text-white p-4 rounded-lg">
                <div className="font-title text-lg font-semibold">White text on Blue 600</div>
                <div className="font-body text-sm opacity-90">Perfect contrast for readability</div>
              </div>
              <div className="bg-purple-600 text-white p-4 rounded-lg">
                <div className="font-title text-lg font-semibold">White text on Purple 600</div>
                <div className="font-body text-sm opacity-90">High contrast for accessibility</div>
              </div>
              <div className="bg-pink-100 text-pink-800 p-4 rounded-lg">
                <div className="font-title text-lg font-semibold">Dark text on Pink 100</div>
                <div className="font-body text-sm opacity-90">Light background with dark text</div>
              </div>
            </div>
          </div>

          {/* Component Examples */}
          <div className="card">
            <h3 className="font-title text-xl font-semibold text-gray-800 mb-6">
              Component Examples
            </h3>
            <div className="space-y-4">
              <button className="w-full btn-primary font-accent">
                Primary Button
              </button>
              <button className="w-full btn-secondary font-accent">
                Secondary Button
              </button>
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg border border-purple-200">
                <div className="font-title text-purple-800 font-semibold">Gradient Card</div>
                <div className="font-body text-purple-600 text-sm">Subtle gradient background</div>
              </div>
            </div>
          </div>
        </div>

        {/* Color Usage Guidelines */}
        <div className="card bg-gradient-to-br from-gray-50 to-gray-100">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Usage Guidelines
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-4">Color Meanings</h3>
              <ul className="space-y-3 font-body text-gray-700">
                <li><span className="w-4 h-4 bg-blue-600 rounded inline-block mr-3"></span><strong>Blue:</strong> Trust, reliability, professionalism</li>
                <li><span className="w-4 h-4 bg-purple-600 rounded inline-block mr-3"></span><strong>Purple:</strong> Innovation, creativity, technology</li>
                <li><span className="w-4 h-4 bg-pink-500 rounded inline-block mr-3"></span><strong>Pink:</strong> Energy, action, engagement</li>
                <li><span className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded inline-block mr-3"></span><strong>Gradients:</strong> Premium, modern, dynamic</li>
              </ul>
            </div>
            <div>
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-4">Best Practices</h3>
              <ul className="space-y-3 font-body text-gray-700">
                <li>• Use lighter shades (50-200) for backgrounds</li>
                <li>• Use medium shades (400-600) for interactive elements</li>
                <li>• Use darker shades (700-950) for text and borders</li>
                <li>• Ensure sufficient contrast for accessibility (WCAG AA)</li>
                <li>• Apply gradients sparingly for emphasis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
