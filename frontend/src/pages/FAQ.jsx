import React, { useState } from "react";

const faqs = [
  {
    question: "What is E-Shiksha?",
    answer:
      "E-Shiksha is an online learning platform offering a wide range of courses to help students and professionals upskill and grow.",
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "Simply create an account, browse through our courses, and click the Enroll button to start learning instantly.",
  },
  {
    question: "Do you provide certificates?",
    answer:
      "Yes, upon successful completion of a course, learners receive a verified digital certificate from E-Shiksha.",
  },
  {
    question: "Can I access courses on mobile?",
    answer:
      "Absolutely! E-Shiksha is fully responsive and accessible across desktops, tablets, and mobile devices.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes, we have a student-friendly refund policy. You can request a refund within 7 days of purchase, provided you have not completed the course.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our support team anytime at support@eshiksha.com or through the Contact page on our website.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-50 px-3 sm:px-6 lg:px-12 py-12 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-2xl p-3 sm:p-10">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions –{" "}
          <span className="text-blue-600">E-Shiksha</span>
        </h1>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-sm shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4 text-left text-gray-800 font-medium text-base sm:text-lg hover:bg-gray-100"
              >
                {faq.question}
                <span className="text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 sm:px-6 pb-4 text-gray-600 text-sm sm:text-base leading-relaxed bg-gray-50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-sm text-gray-500 text-center">
          Still have questions? Reach out to us at{" "}
          <span className="font-semibold">support@eshiksha.com</span>.
        </p>
      </div>
    </div>
  );
}
