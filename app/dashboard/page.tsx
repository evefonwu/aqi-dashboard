"use client";

import { useState } from "react";

export default function AirQualityPage() {
  const [zipCode, setZipCode] = useState("10001");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);
      // call API endpoint /app/air-quality
      const url = `/api/air-quality?zip=${encodeURIComponent(zipCode)}`;
      const response = await fetch(url);
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch data: ${response.status} ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Received data:", result);
      setData(result);
    } catch (err: any) {
      console.error("Error in fetchData:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Air Quality Data</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Enter zip code"
        />
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Data"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {data && (
        <div className="border p-4 rounded">
          <h2 className="font-semibold mb-2">Results:</h2>
          <pre className="bg-gray-100 p-2 overflow-auto text-xs">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
