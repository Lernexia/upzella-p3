'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Modal } from '@/components/ui-components/Modal';
import { Input } from '@/components/ui-components/Input';
import { Textarea } from '@/components/ui-components/Textarea';
import CheckIcon from '@/components/svg-icons/CheckIcon';
import WarningIcon from '@/components/svg-icons/WarningIcon';
import XIcon from '@/components/svg-icons/XIcon';

export default function ModalsTestPage() {
  const [showBasicModal, setShowBasicModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showLargeModal, setShowLargeModal] = useState(false);

  return (
    <div className="min-h-screen ">
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
          <h1 className="font-heading text-4xl font-bold text-gradient mb-4">
            Modal Components
          </h1>
          <p className="font-title text-xl text-gray-700 mb-6">
            Modal dialogs with different sizes, animations, and interaction patterns
          </p>
        </div>

        <div className="pb-16">
          {/* Modal Triggers */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Modal Types</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card text-center">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Basic Modal</h3>
                <p className="font-body text-gray-600 mb-6 text-sm">
                  Simple modal with title, content, and close button
                </p>
                <button 
                  onClick={() => setShowBasicModal(true)}
                  className="btn-primary w-full"
                >
                  Open Basic Modal
                </button>
              </div>

              <div className="card text-center">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Confirmation Modal</h3>
                <p className="font-body text-gray-600 mb-6 text-sm">
                  Modal with action buttons for confirmations
                </p>
                <button 
                  onClick={() => setShowConfirmModal(true)}
                  className="btn-secondary w-full"
                >
                  Open Confirm Modal
                </button>
              </div>

              <div className="card text-center">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Form Modal</h3>
                <p className="font-body text-gray-600 mb-6 text-sm">
                  Modal containing a form with inputs
                </p>
                <button 
                  onClick={() => setShowFormModal(true)}
                  className="btn-primary w-full"
                >
                  Open Form Modal
                </button>
              </div>

              <div className="card text-center">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Notification Modal</h3>
                <p className="font-body text-gray-600 mb-6 text-sm">
                  Success, warning, or error notifications
                </p>
                <button 
                  onClick={() => setShowNotificationModal(true)}
                  className="btn-success w-full"
                >
                  Show Notification
                </button>
              </div>

              <div className="card text-center">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Large Modal</h3>
                <p className="font-body text-gray-600 mb-6 text-sm">
                  Full-size modal for complex content
                </p>
                <button 
                  onClick={() => setShowLargeModal(true)}
                  className="btn-secondary w-full"
                >
                  Open Large Modal
                </button>
              </div>

              <div className="card text-center">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Stacked Modals</h3>
                <p className="font-body text-gray-600 mb-6 text-sm">
                  Modals that can open on top of other modals
                </p>
                <button 
                  disabled
                  className="btn-primary w-full opacity-50 cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </section>

          {/* Modal Examples */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Modal Patterns</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Modal Sizes</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-accent text-sm font-semibold text-gray-700">Small Modal</div>
                    <div className="font-body text-xs text-gray-600">max-width: 400px - For simple confirmations</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-accent text-sm font-semibold text-gray-700">Medium Modal</div>
                    <div className="font-body text-xs text-gray-600">max-width: 600px - For forms and content</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-accent text-sm font-semibold text-gray-700">Large Modal</div>
                    <div className="font-body text-xs text-gray-600">max-width: 800px - For complex interfaces</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-accent text-sm font-semibold text-gray-700">Full Screen</div>
                    <div className="font-body text-xs text-gray-600">100% - For mobile or immersive experiences</div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="font-title text-lg font-semibold text-gray-800 mb-4">Animation Types</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <div className="font-accent text-sm font-semibold text-blue-700">Fade In</div>
                    <div className="font-body text-xs text-blue-600 mb-2">Smooth opacity transition</div>
                    <button 
                      onClick={() => setShowBasicModal(true)}
                      className="btn-primary text-xs px-3 py-1"
                    >
                      Demo Fade
                    </button>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <div className="font-accent text-sm font-semibold text-purple-700">Scale Up</div>
                    <div className="font-body text-xs text-purple-600 mb-2">Zoom in from center</div>
                    <button 
                      onClick={() => setShowFormModal(true)}
                      className="btn-secondary text-xs px-3 py-1"
                    >
                      Demo Scale
                    </button>
                  </div>
                  <div className="p-3 bg-pink-50 rounded-lg border-l-4 border-pink-500">
                    <div className="font-accent text-sm font-semibold text-pink-700">Slide Down</div>
                    <div className="font-body text-xs text-pink-600 mb-2">Enter from top of screen</div>
                    <button 
                      onClick={() => setShowLargeModal(true)}
                      className="btn-warning text-xs px-3 py-1"
                    >
                      Demo Slide
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Usage Guidelines */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Modal Best Practices</h2>
            
            <div className="card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-accent text-lg font-semibold text-gray-800 mb-3">Do&apos;s</h3>
                  <ul className="space-y-2 font-body text-gray-600">
                    <li>• Use modals for focused tasks</li>
                    <li>• Provide clear close mechanisms</li>
                    <li>• Include a backdrop overlay</li>
                    <li>• Focus management for accessibility</li>
                    <li>• Escape key closes modal</li>
                    <li>• Prevent body scroll when open</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-accent text-lg font-semibold text-gray-800 mb-3">Don&apos;ts</h3>
                  <ul className="space-y-2 font-body text-gray-600">
                    <li>• Don&apos;t use for complex workflows</li>
                    <li>• Don&apos;t stack too many modals</li>
                    <li>• Don&apos;t make modals too small</li>
                    <li>• Don&apos;t auto-open modals on page load</li>
                    <li>• Don&apos;t use for critical information</li>
                    <li>• Don&apos;t disable underlying page interaction permanently</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Modal Components */}
        <Modal 
          isOpen={showBasicModal} 
          onClose={() => setShowBasicModal(false)}
          title="Basic Modal Example"
        >
          <div className="space-y-4">
            <p className="font-body text-gray-600">
              This is a basic modal with a title, content area, and close button. 
              You can close it by clicking the X button, pressing Escape, or clicking outside the modal.
            </p>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="font-accent text-sm text-blue-800">
                💡 This modal demonstrates the standard pattern for simple content display.
              </p>
            </div>
          </div>
        </Modal>

        <Modal 
          isOpen={showConfirmModal} 
          onClose={() => setShowConfirmModal(false)}
          title="Confirm Action"
        >
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <WarningIcon size={24} className="text-yellow-500 mt-1" />
              <div>
                <p className="font-body text-gray-800 mb-2">
                  Are you sure you want to delete this item?
                </p>
                <p className="font-body text-sm text-gray-600">
                  This action cannot be undone. The item will be permanently removed from your account.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="btn-secondary px-6"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowConfirmModal(false);
                  alert('Item deleted!');
                }}
                className="btn-danger px-6"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>

        <Modal 
          isOpen={showFormModal} 
          onClose={() => setShowFormModal(false)}
          title="Quick Contact Form"
        >
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            setShowFormModal(false);
            alert('Message sent!');
          }}>
            <Input 
              label="Your Name"
              placeholder="Enter your full name"
              required
            />
            <Input 
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              required
            />
            <Textarea 
              label="Message"
              placeholder="How can we help you?"
              rows={4}
              required
            />
            <div className="flex gap-3 justify-end pt-4">
              <button 
                type="button"
                onClick={() => setShowFormModal(false)}
                className="btn-secondary px-6"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="btn-primary px-6"
              >
                Send Message
              </button>
            </div>
          </form>
        </Modal>

        <Modal 
          isOpen={showNotificationModal} 
          onClose={() => setShowNotificationModal(false)}
          title="Success!"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckIcon size={24} className="text-green-500 mt-1" />
              <div>
                <p className="font-body text-gray-800 mb-2">
                  Your application has been submitted successfully!
                </p>
                <p className="font-body text-sm text-gray-600">
                  We'll review it and get back to you within 2-3 business days.
                </p>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button 
                onClick={() => setShowNotificationModal(false)}
                className="btn-primary px-6"
              >
                Got it
              </button>
            </div>
          </div>
        </Modal>

        <Modal 
          isOpen={showLargeModal} 
          onClose={() => setShowLargeModal(false)}
          title="Large Modal with Complex Content"
          size="lg"
        >
          <div className="space-y-6">
            <p className="font-body text-gray-600">
              This is a large modal that can contain more complex content like tables, forms, or detailed information.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-title text-lg font-semibold text-gray-800">Features</h3>
                <ul className="space-y-2 font-body text-gray-600">
                  <li>• Responsive design</li>
                  <li>• Scrollable content</li>
                  <li>• Keyboard navigation</li>
                  <li>• Screen reader support</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-title text-lg font-semibold text-gray-800">Use Cases</h3>
                <ul className="space-y-2 font-body text-gray-600">
                  <li>• Data tables</li>
                  <li>• Multi-step forms</li>
                  <li>• Image galleries</li>
                  <li>• Settings panels</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-accent text-sm font-semibold text-gray-800 mb-2">Sample Table</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-accent text-gray-700">Name</th>
                      <th className="text-left py-2 font-accent text-gray-700">Position</th>
                      <th className="text-left py-2 font-accent text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="font-body text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-2">John Smith</td>
                      <td className="py-2">Frontend Developer</td>
                      <td className="py-2">Active</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">Sarah Johnson</td>
                      <td className="py-2">Designer</td>
                      <td className="py-2">Interview</td>
                    </tr>
                    <tr>
                      <td className="py-2">Mike Wilson</td>
                      <td className="py-2">Backend Developer</td>
                      <td className="py-2">Pending</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
