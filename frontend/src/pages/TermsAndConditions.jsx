import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen mt-5 bg-gray-50 px-3 sm:px-6 lg:px-12 py-12 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-2xl p-3 sm:p-10">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
          Terms & Conditions – <span className="text-blue-600">E-Shiksha</span>
        </h1>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
          Welcome to <span className="font-semibold">E-Shiksha</span>. By
          accessing or using our platform, you agree to comply with the
          following Terms & Conditions. Please read them carefully before using
          our services.
        </p>

        {/* Sections */}
        <div className="space-y-6">
          {/* 1. Use of Platform */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              1. Use of Platform
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              E-Shiksha provides online learning resources for personal and
              educational use. You agree not to misuse the platform, engage in
              unlawful activities, or attempt to disrupt our services.
            </p>
          </section>

          {/* 2. User Accounts */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              2. User Accounts
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              To access certain features, you may need to create an account. You
              are responsible for maintaining the confidentiality of your
              account information and any activity that occurs under your
              account.
            </p>
          </section>

          {/* 3. Payments and Refunds */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              3. Payments and Refunds
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Payments for courses must be completed before access is granted.
              Refunds may be provided in accordance with our refund policy. All
              transactions are securely processed through trusted payment
              gateways.
            </p>
          </section>

          {/* 4. Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              4. Intellectual Property
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              All content, materials, and resources provided on E-Shiksha are
              owned by us or our partners. You may not copy, distribute, or use
              content for commercial purposes without prior permission.
            </p>
          </section>

          {/* 5. Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              5. Limitation of Liability
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              E-Shiksha is not liable for any direct, indirect, or incidental
              damages resulting from the use of our platform, including but not
              limited to data loss, service interruptions, or unauthorized
              access.
            </p>
          </section>

          {/* 6. Termination */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              6. Termination
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              We reserve the right to suspend or terminate your account at any
              time if you violate these Terms & Conditions or misuse the
              platform in any way.
            </p>
          </section>

          {/* 7. Changes to Terms */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              7. Changes to Terms
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              E-Shiksha may update these Terms & Conditions at any time. Users
              will be notified of major changes, and continued use of the
              platform after updates indicates acceptance of the revised terms.
            </p>
          </section>

          {/* 8. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              8. Contact Us
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              For questions regarding these Terms & Conditions, please contact
              us at{" "}
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
