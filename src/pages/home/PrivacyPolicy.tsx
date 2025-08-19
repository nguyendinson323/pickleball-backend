import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">1. Information We Collect</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700">
              We collect information you provide directly to us, such as when you create an account, 
              complete your profile, or communicate with us. This may include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Personal identification information (name, email address, phone number)</li>
              <li>Profile information (skill level, location, bio)</li>
              <li>Verification documents (INE, passport) for identity verification</li>
              <li>Profile photos and other media you choose to upload</li>
              <li>Communication preferences and settings</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">2. How We Use Your Information</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your registration and manage your account</li>
              <li>Enable player matching and community features</li>
              <li>Send you important updates about your account and our services</li>
              <li>Ensure platform security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">3. Player Finder Feature</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700">
              Our player finder feature allows registered players to discover and connect with other players 
              in their area. When you enable this feature:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Your basic profile information (name, skill level, location) becomes visible to other players</li>
              <li>Other players can contact you through the platform</li>
              <li>You can control your visibility through privacy settings at any time</li>
              <li>You can disable this feature to maintain complete privacy</li>
            </ul>
            <p className="text-gray-700 mt-4">
              <strong>Note:</strong> You have full control over your privacy settings and can change them 
              at any time through your profile settings.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">4. Information Sharing</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              except in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>With your explicit consent</li>
              <li>To comply with legal requirements</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist in operating our platform (under strict confidentiality agreements)</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">5. Data Security</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700">
              We implement appropriate security measures to protect your personal information, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Secure data storage and backup procedures</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">6. Your Rights</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Access and review your personal information</li>
              <li>Update or correct inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of certain communications</li>
              <li>Control your privacy settings</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">7. Contact Us</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@pickleball-federation.com<br />
                <strong>Address:</strong> National Pickleball Federation<br />
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 