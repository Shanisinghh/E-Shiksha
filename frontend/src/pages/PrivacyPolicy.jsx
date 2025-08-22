import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen mt-5 bg-gray-50 px-3 sm:px-6 lg:px-12 py-12 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-2xl p-3 sm:p-10">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
          Privacy Policy – <span className="text-blue-600">E-Shiksha</span>
        </h1>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
          At <span className="font-semibold">E-Shiksha</span>, we value your
          trust and are committed to protecting your personal information. This
          Privacy Policy explains how we collect, use, and safeguard your data
          when you use our platform.
        </p>

        {/* Sections */}
        <div className="space-y-6">
          {/* Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              We may collect personal details such as your name, email address,
              phone number, payment details, and course activity. We also gather
              non-personal information like device type, browser, and usage
              patterns to improve our services.
            </p>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              The information we collect is used to provide access to courses,
              enhance user experience, process payments, communicate updates,
              and ensure platform security.
            </p>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              3. Data Protection
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              We implement strict security measures to safeguard your personal
              data from unauthorized access, alteration, or disclosure. However,
              no online system can be 100% secure, and we encourage safe
              practices by our users.
            </p>
          </section>

          {/* Sharing of Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              4. Sharing of Information
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              We do not sell or rent your personal information to third parties.
              We may share limited data with trusted partners for payment
              processing, analytics, or legal compliance purposes.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              5. Your Rights
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              You have the right to access, update, or request deletion of your
              personal data. You can also opt out of promotional emails at any
              time by using the unsubscribe link or contacting us directly.
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              6. Updates to This Policy
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with the updated date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              7. Contact Us
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              If you have questions about this Privacy Policy or how your data
              is handled, please reach out to us at{" "}
              <span className="font-semibold">support@eshiksha.com</span>.
            </p>
          </section>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-sm text-gray-500 text-center">
          Last updated: August 2025
        </p>
      </div>
    </div>
  );
}
