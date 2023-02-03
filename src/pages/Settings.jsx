import React from "react";
import Layout from "../components/Layout";
import Private from "../components/Private";
import SettingsSection from "../features/auth/SettingsSection";

const Settings = () => {
  return (
    <Private>
      <Layout>
        <div className="min-h-screen">
          <SettingsSection />
        </div>
      </Layout>
    </Private>
  );
};

export default Settings;
