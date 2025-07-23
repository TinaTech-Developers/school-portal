"use client";
import { useState } from "react";
import AdminLayout from "../components/AdminLayout";

export default function SettingsPage() {
  const [tab, setTab] = useState("General");
  const tabs = ["General", "Grading", "Access Control", "UI & Branding"];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">System Settings</h1>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-300">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-2 px-4 -mb-px border-b-2 font-medium ${
                tab === t
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-blue-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Render Tab Content */}
        {tab === "General" && <GeneralSettings />}
        {tab === "Grading" && <GradingSettings />}
        {tab === "Access Control" && <AccessControl />}
        {tab === "UI & Branding" && <BrandingSettings />}
      </div>
    </AdminLayout>
  );
}

function GeneralSettings() {
  const [school, setSchool] = useState("Bright Future Academy");
  const [term, setTerm] = useState("Term 2");
  const [year, setYear] = useState("2025");

  return (
    <div className="bg-white p-6 rounded shadow space-y-4 text-gray-700">
      <div>
        <label>School Name</label>
        <input
          className="block w-full border border-gray-200 p-2 rounded mt-1"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Current Term</label>
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="block w-full border border-gray-200 p-2 rounded mt-1"
          >
            <option>Term 1</option>
            <option>Term 2</option>
            <option>Term 3</option>
          </select>
        </div>

        <div>
          <label>Academic Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="block w-full border border-gray-200 p-2 rounded mt-1"
          />
        </div>
      </div>
    </div>
  );
}

function GradingSettings() {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Grading Thresholds
      </h2>
      <p className="text-sm text-gray-500">
        You can define grade ranges here. Feature under development.
      </p>
    </div>
  );
}

function AccessControl() {
  return (
    <div className="bg-white p-6 rounded shadow space-y-4 text-gray-600">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Access Control Settings
      </h2>

      <div className="flex justify-between items-center">
        <span>Allow teachers to view all results</span>
        <input type="checkbox" className="w-5 h-5 text-blue-600" />
      </div>

      <div className="flex justify-between items-center">
        <span>Allow students to view past results</span>
        <input type="checkbox" className="w-5 h-5 text-blue-600" />
      </div>

      <div className="flex justify-between items-center">
        <span>Allow teachers to edit uploaded results</span>
        <input type="checkbox" className="w-5 h-5 text-blue-600" />
      </div>
    </div>
  );
}

function BrandingSettings() {
  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);

  return (
    <div className="bg-white p-6 rounded shadow space-y-6 text-gray-500">
      <div>
        <label>Upload School Logo</label>
        <input
          type="file"
          onChange={(e) => setLogo(URL.createObjectURL(e.target.files[0]))}
          className="mt-1"
        />
        {logo && <img src={logo} alt="Logo" className="h-16 mt-2" />}
      </div>

      <div>
        <label>Upload Favicon</label>
        <input
          type="file"
          onChange={(e) => setFavicon(URL.createObjectURL(e.target.files[0]))}
          className="mt-1"
        />
        {favicon && <img src={favicon} alt="Favicon" className="h-10 mt-2" />}
      </div>
    </div>
  );
}
