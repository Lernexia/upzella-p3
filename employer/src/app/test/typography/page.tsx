import Link from 'next/link';

export default function TypographyTestPage() {
  const headingExamples = [
    { tag: 'h1', text: 'Heading 1 - Hero Text', classes: 'font-heading text-6xl md:text-7xl font-bold' },
    { tag: 'h2', text: 'Heading 2 - Section Title', classes: 'font-heading text-4xl md:text-5xl font-bold' },
    { tag: 'h3', text: 'Heading 3 - Subsection', classes: 'font-heading text-3xl md:text-4xl font-bold' },
    { tag: 'h4', text: 'Heading 4 - Card Title', classes: 'font-heading text-2xl md:text-3xl font-bold' },
    { tag: 'h5', text: 'Heading 5 - Component Title', classes: 'font-heading text-xl md:text-2xl font-bold' },
    { tag: 'h6', text: 'Heading 6 - Small Title', classes: 'font-heading text-lg md:text-xl font-bold' },
  ];

  const titleExamples = [
    { text: 'Page Title - Outfit Extra Bold', classes: 'font-title text-4xl font-extrabold' },
    { text: 'Section Title - Outfit Bold', classes: 'font-title text-3xl font-bold' },
    { text: 'Card Title - Outfit Semibold', classes: 'font-title text-2xl font-semibold' },
    { text: 'Component Title - Outfit Medium', classes: 'font-title text-xl font-medium' },
    { text: 'Small Title - Outfit Regular', classes: 'font-title text-lg font-normal' },
  ];

  const bodyExamples = [
    { text: 'Large body text for introductions and important content. Inter is optimized for reading.', classes: 'font-body text-lg' },
    { text: 'Regular body text for general content, paragraphs, and descriptions. Excellent readability.', classes: 'font-body text-base' },
    { text: 'Small body text for captions, metadata, and secondary information.', classes: 'font-body text-sm' },
    { text: 'Extra small text for fine print, disclaimers, and minimal details.', classes: 'font-body text-xs' },
  ];

  const accentExamples = [
    { text: 'Button Text - Bold', classes: 'font-accent text-base font-bold' },
    { text: 'Label Text - Semibold', classes: 'font-accent text-sm font-semibold' },
    { text: 'Badge Text - Medium', classes: 'font-accent text-xs font-medium' },
    { text: 'Navigation Text - Regular', classes: 'font-accent text-sm font-normal' },
  ];

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
            Typography System
          </h1>
          <p className="font-body text-xl text-gray-700">
            Font families, weights, sizes, and text styling examples
          </p>
        </div>

        {/* Font Families Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="card">
            <h3 className="font-heading text-xl font-bold text-gray-800 mb-3">Montserrat</h3>
            <p className="font-body text-sm text-gray-600 mb-3">Used for main headings and hero text</p>
            <div className="font-heading text-2xl text-blue-700">Aa Bb Cc</div>
            <div className="font-heading text-sm text-gray-500">Headings & Heroes</div>
          </div>
          
          <div className="card">
            <h3 className="font-title text-xl font-semibold text-gray-800 mb-3">Outfit</h3>
            <p className="font-body text-sm text-gray-600 mb-3">Perfect for titles and component headers</p>
            <div className="font-title text-2xl text-purple-700">Aa Bb Cc</div>
            <div className="font-title text-sm text-gray-500">Titles & Headers</div>
          </div>
          
          <div className="card">
            <h3 className="font-body text-xl font-medium text-gray-800 mb-3">Inter</h3>
            <p className="font-body text-sm text-gray-600 mb-3">Optimized for body text and readability</p>
            <div className="font-body text-2xl text-pink-700">Aa Bb Cc</div>
            <div className="font-body text-sm text-gray-500">Body & Content</div>
          </div>
          
          <div className="card">
            <h3 className="font-accent text-xl font-medium text-gray-800 mb-3">Poppins</h3>
            <p className="font-body text-sm text-gray-600 mb-3">Used for buttons and accent elements</p>
            <div className="font-accent text-2xl text-blue-700">Aa Bb Cc</div>
            <div className="font-accent text-sm text-gray-500">Buttons & Accents</div>
          </div>
        </div>

        {/* Headings */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Headings (Montserrat)
          </h2>
          <div className="space-y-6">
            {headingExamples.map((heading, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className={`${heading.classes} text-gray-800 mb-2`}>
                  {heading.text}
                </div>
                <code className="font-body text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {heading.classes}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Titles */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Titles (Outfit)
          </h2>
          <div className="space-y-6">
            {titleExamples.map((title, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className={`${title.classes} text-purple-800 mb-2`}>
                  {title.text}
                </div>
                <code className="font-body text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {title.classes}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Body Text */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Body Text (Inter)
          </h2>
          <div className="space-y-6">
            {bodyExamples.map((body, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className={`${body.classes} text-gray-700 mb-2`}>
                  {body.text}
                </div>
                <code className="font-body text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {body.classes}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Accent Text */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Accent Text (Poppins)
          </h2>
          <div className="space-y-6">
            {accentExamples.map((accent, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className={`${accent.classes} text-blue-700 mb-2`}>
                  {accent.text}
                </div>
                <code className="font-body text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {accent.classes}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Text Colors */}
        <div className="card mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Text Colors & Gradients
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-title text-xl font-semibold mb-4">Standard Colors</h3>
              <div className="space-y-3">
                <div className="font-body text-lg text-gray-900">Primary Text (gray-900)</div>
                <div className="font-body text-lg text-gray-700">Secondary Text (gray-700)</div>
                <div className="font-body text-lg text-gray-600">Muted Text (gray-600)</div>
                <div className="font-body text-lg text-gray-500">Subtle Text (gray-500)</div>
                <div className="font-body text-lg text-blue-600">Brand Primary (blue-600)</div>
                <div className="font-body text-lg text-purple-600">Brand Secondary (purple-600)</div>
                <div className="font-body text-lg text-pink-600">Brand Accent (pink-600)</div>
              </div>
            </div>
            <div>
              <h3 className="font-title text-xl font-semibold mb-4">Gradient Text</h3>
              <div className="space-y-3">
                <div className="font-heading text-2xl font-bold text-gradient">
                  Primary Gradient
                </div>
                <div className="font-title text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Blue to Purple
                </div>
                <div className="font-title text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Purple to Pink
                </div>
                <div className="font-title text-xl font-semibold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
                  Blue to Pink
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="card bg-gradient-to-br from-blue-50 to-purple-50">
          <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">
            Usage Guidelines
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-4">When to Use Each Font</h3>
              <ul className="space-y-3 font-body text-gray-700">
                <li><strong>Montserrat:</strong> Main headings, hero text, page titles</li>
                <li><strong>Outfit:</strong> Section titles, card headers, component titles</li>
                <li><strong>Inter:</strong> Body text, paragraphs, descriptions, content</li>
                <li><strong>Poppins:</strong> Buttons, labels, badges, navigation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-title text-xl font-semibold text-gray-800 mb-4">Best Practices</h3>
              <ul className="space-y-3 font-body text-gray-700">
                <li>• Use consistent font weights within the same hierarchy level</li>
                <li>• Maintain proper contrast ratios for accessibility</li>
                <li>• Apply gradient text sparingly for emphasis</li>
                <li>• Ensure text remains readable on all background colors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
