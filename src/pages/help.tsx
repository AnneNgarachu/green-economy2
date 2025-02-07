import React from "react";

const HelpPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
      <p className="text-gray-600 mb-6">
        Need assistance? Explore our resources or reach out for support.
      </p>

      {/* Frequently Asked Questions */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold mb-2">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">
              How do I add new metrics?
            </h4>
            <p className="text-sm text-gray-500">
              Navigate to the "Input Data" section, fill in the required fields,
              and click "Save Metrics."
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">
              How do I set goals for my organization?
            </h4>
            <p className="text-sm text-gray-500">
              Go to the "Goals" page and create or update your sustainability
              objectives.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">
              How can I generate a report?
            </h4>
            <p className="text-sm text-gray-500">
              Visit the "Reports" page to view, analyze, and export data reports
              for your sustainability efforts.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
        <p className="text-sm text-gray-500 mb-4">
          If you need additional help, reach out to our support team. We’re here
          to assist you.
        </p>
        <div className="space-y-2">
          <p className="text-sm">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@ecotrack.com"
              className="text-blue-600 hover:underline"
            >
              support@ecotrack.com
            </a>
          </p>
          <p className="text-sm">
            <strong>Phone:</strong> +1 800-123-4567
          </p>
          <p className="text-sm">
            <strong>Live Chat:</strong> Available Mon-Fri, 9:00 AM - 5:00 PM
            (GMT)
          </p>
        </div>
      </section>

      {/* Documentation */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold mb-2">Documentation</h3>
        <p className="text-sm text-gray-500 mb-4">
          Explore our guides and tutorials to learn how to make the most out of
          EcoTrack.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Getting Started with EcoTrack
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Understanding Sustainability Metrics
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              How to Set and Achieve Goals
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Generating Reports and Insights
            </a>
          </li>
        </ul>
      </section>

      {/* System Status */}
      <section>
        <h3 className="text-lg font-semibold mb-2">System Status</h3>
        <p className="text-sm text-gray-500">
          Check the current status of the EcoTrack platform and stay updated on
          maintenance schedules.
        </p>
        <div className="mt-4 bg-gray-100 p-4 rounded border text-sm text-gray-600">
          <p>
            <strong>Status:</strong> All systems operational
          </p>
          <p>
            <strong>Last Updated:</strong> {new Date().toLocaleString()}
          </p>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
