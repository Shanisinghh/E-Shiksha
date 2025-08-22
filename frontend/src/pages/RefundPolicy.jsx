import React from "react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen mt-5 bg-gray-50 px-3 sm:px-6 lg:px-12 py-12 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-2xl p-3 sm:p-10">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
          Refund Policy – <span className="text-blue-600">E-Shiksha</span>
        </h1>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
          At <span className="font-semibold">E-Shiksha</span>, we value our
          learners and strive to provide the best learning experience. If for
          any reason you are not satisfied with a course, our refund policy
          ensures fairness and transparency.
        </p>

        {/* Sections */}
        <div className="space-y-6">
          {/* 1. Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              1. Eligibility for Refund
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Refunds are applicable only if requested within{" "}
              <span className="font-semibold">7 days</span> of purchase and if
              less than 20% of the course content has been completed. Refunds
              are not available for completed courses or certificates.
            </p>
          </section>

          {/* 2. Non-Refundable Cases */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              2. Non-Refundable Cases
            </h2>
            <ul className="list-disc pl-6 text-gray-700 text-sm sm:text-base space-y-1">
              <li>Course fully accessed or completed.</li>
              <li>Refund request made after 7 days of purchase.</li>
              <li>Payments made for promotional or discounted offers.</li>
              <li>Technical issues not reported to support within 48 hours.</li>
            </ul>
          </section>

          {/* 3. Process */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              3. Refund Process
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              To request a refund, please contact our support team at{" "}
              <span className="font-semibold">support@eshiksha.com</span> with
              your order details. Refunds will be processed to your original
              payment method within{" "}
              <span className="font-semibold">7–10 business days</span>.
            </p>
          </section>

          {/* 4. Policy Updates */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              4. Policy Updates
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              E-Shiksha reserves the right to modify this refund policy at any
              time. Updates will be published on this page, and continued use of
              our platform indicates acceptance of the revised policy.
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
