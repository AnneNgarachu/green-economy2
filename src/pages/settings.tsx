import React from "react";

const SettingsPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <p className="text-gray-600 mb-6">
        Customize your dashboard preferences and account settings.
      </p>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Account Settings</h3>
          <p className="text-sm text-gray-500">
            Update your email, password, and profile details.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Notification Preferences</h3>
          <p className="text-sm text-gray-500">
            Manage your email and push notification settings.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Theme</h3>
          <p className="text-sm text-gray-500">
            Switch between light and dark mode.
          </p>
        </div>
      </div>
      <p className="text-gray-500 mt-6">
        Placeholder: Add settings functionality here.
      </p>
    </div>
  );
};

export default SettingsPage;
