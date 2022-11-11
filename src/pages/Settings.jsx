import React from "react";
import Layout from "../components/Layout";
import Private from "../components/Private";
import SettingsSection from "../features/auth/SettingsSection";

const Settings = () => {
  return (
    <Layout>
      <Private>
        <div className="min-h-screen">
          <SettingsSection />
        </div>
      </Private>
    </Layout>
  );
};

export default Settings;
