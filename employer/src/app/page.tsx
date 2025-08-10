export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="font-heading text-6xl md:text-7xl font-bold text-gradient mb-6">
            Upzella
          </h1>
          <p className="font-title text-2xl md:text-3xl text-gray-700 mb-4">
            AI-Powered HR Assistant Platform
          </p>
          <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
            Secure employer authentication and company setup for HR professionals. 
            Streamline your hiring process with our intelligent platform.
          </p>
        </div>

        {/* Typography Showcase */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="card">
            <h3 className="font-heading text-2xl font-bold text-blue-800 mb-4">
              Montserrat Headings
            </h3>
            <p className="font-body text-gray-600">
              Used for main headings and hero text. Bold and impactful for brand presence.
            </p>
          </div>

          <div className="card">
            <h3 className="font-title text-2xl font-semibold text-purple-800 mb-4">
              Outfit Titles
            </h3>
            <p className="font-body text-gray-600">
              Perfect for section titles and component headers. Clean and modern.
            </p>
          </div>

          <div className="card">
            <h3 className="font-body text-2xl font-medium text-pink-800 mb-4">
              Inter Body Text
            </h3>
            <p className="font-body text-gray-600">
              Optimized for readability in paragraphs, forms, and content areas.
            </p>
          </div>

          <div className="card">
            <h3 className="font-accent text-2xl font-medium text-blue-800 mb-4">
              Poppins Accent
            </h3>
            <p className="font-body text-gray-600">
              Used for buttons, labels, and special emphasis elements.
            </p>
          </div>
        </div>

        {/* Color Palette */}
        <div className="mb-16">
          <h2 className="font-heading text-4xl font-bold text-center mb-12 text-gray-800">
            Color Palette
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Blue Shades */}
            <div className="card">
              <h3 className="font-title text-xl font-semibold text-blue-800 mb-6">
                Blue Shades
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-100 border-2 border-blue-200"></div>
                  <span className="font-body text-sm">blue-100</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-300 border-2 border-blue-400"></div>
                  <span className="font-body text-sm">blue-300</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-500 border-2 border-blue-600"></div>
                  <span className="font-body text-sm text-white">blue-500</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-700 border-2 border-blue-800"></div>
                  <span className="font-body text-sm text-white">blue-700</span>
                </div>
              </div>
            </div>

            {/* Purple Shades */}
            <div className="card">
              <h3 className="font-title text-xl font-semibold text-purple-800 mb-6">
                Purple Shades
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-purple-100 border-2 border-purple-200"></div>
                  <span className="font-body text-sm">purple-100</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-purple-300 border-2 border-purple-400"></div>
                  <span className="font-body text-sm">purple-300</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-purple-500 border-2 border-purple-600"></div>
                  <span className="font-body text-sm text-white">purple-500</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-purple-700 border-2 border-purple-800"></div>
                  <span className="font-body text-sm text-white">purple-700</span>
                </div>
              </div>
            </div>

            {/* Pink Shades */}
            <div className="card">
              <h3 className="font-title text-xl font-semibold text-pink-800 mb-6">
                Pink Shades
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-pink-100 border-2 border-pink-200"></div>
                  <span className="font-body text-sm">pink-100</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-pink-300 border-2 border-pink-400"></div>
                  <span className="font-body text-sm">pink-300</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-pink-500 border-2 border-pink-600"></div>
                  <span className="font-body text-sm text-white">pink-500</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-pink-700 border-2 border-pink-800"></div>
                  <span className="font-body text-sm text-white">pink-700</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Button Showcase */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold mb-8 text-gray-800">
            Button Components
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary font-accent">
              Primary Button
            </button>
            <button className="btn-secondary font-accent">
              Secondary Button
            </button>
            <button className="btn-primary opacity-50 cursor-not-allowed">
              <span className="spinner mr-2"></span>
              Loading...
            </button>
          </div>
        </div>

        {/* Form Example */}
        <div className="max-w-md mx-auto">
          <div className="card">
            <h3 className="font-title text-2xl font-semibold text-gray-800 mb-6 text-center">
              Example Form
            </h3>
            <div className="space-y-4">
              <div>
                <label className="font-accent text-sm font-medium text-gray-700 mb-2 block">
                  Full Name
                </label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="font-accent text-sm font-medium text-gray-700 mb-2 block">
                  Business Email
                </label>
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="you@company.com"
                />
              </div>
              <button className="btn-primary w-full font-accent">
                Sign Up Now
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="font-body text-gray-600">
            Built with Next.js 15, TypeScript, and Tailwind CSS
          </p>
          <p className="font-accent text-sm text-gray-500 mt-2">
            Ready for Upzella Phase 1 – Module 1 Development
          </p>
        </div>
      </div>
    </div>
  );
}
