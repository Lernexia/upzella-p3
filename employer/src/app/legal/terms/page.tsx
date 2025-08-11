'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@/components/svg-icons';

export default function TermsOfServicePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="sizer">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Terms of Service
            </h1>
            <p className="text-gray-600">
              Last updated: January 2025
            </p>
          </div>

          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Upzella's platform and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Upzella provides an AI-powered recruitment and talent acquisition platform that helps employers:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Post job openings and manage applications</li>
                <li>Screen and evaluate candidates using AI-driven tools</li>
                <li>Conduct interviews and assessments</li>
                <li>Manage the complete hiring workflow</li>
                <li>Access analytics and reporting features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts and Registration</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To use our services, you must:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>Use a valid business email address for verification</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Acceptable Use Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to use the service to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Post discriminatory or offensive job descriptions</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Upload malicious code or content</li>
                <li>Spam or send unsolicited communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                We take your privacy seriously. Our collection, use, and disclosure of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our services, you consent to our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Payment Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you choose a paid subscription plan:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Fees are billed in advance on a recurring basis</li>
                <li>All fees are non-refundable unless otherwise stated</li>
                <li>We may change pricing with 30 days notice</li>
                <li>You are responsible for all taxes and fees</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                The platform, including all content, features, and functionality, is owned by Upzella and protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the maximum extent permitted by law, Upzella shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your account and access to the service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the platform. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
                <br />
                Email: legal@upzella.com
                <br />
                Address: [Company Address]
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
