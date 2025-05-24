import React, { useEffect, useState } from "react";
import axios from "axios";

import LiveMatchTable from "../components/LiveMatchTable.jsx";
import PastMatchTable from "../components/PastMatchTable.jsx";

export default function MatchesPage() {
  const currentYear = Math.min(new Date().getFullYear(), 2024);

  // UI state
  const [showLive, setShowLive] = useState(true);

  // Live match data + status
  const [liveMatch, setLiveMatch] = useState(null);
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveError, setLiveError] = useState(null);

  // Past matches data + pagination + status
  const [pastMatches, setPastMatches] = useState([]);
  const [pastLoading, setPastLoading] = useState(false);
  const [pastError, setPastError] = useState(null);
  const [seasonYear, setSeasonYear] = useState(currentYear);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch live match ONLY when showLive === true
  useEffect(() => {
    if (!showLive) return;

    setLiveLoading(true);
    setLiveError(null);

    axios
      .get(import.meta.env.BACKEND_URL + "/match-info/live")
      .then((res) => {
        setLiveMatch(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching live match:", err);
        setLiveError("Failed to load live match data.");
      })
      .finally(() => setLiveLoading(false));
  }, [showLive]);

  // Fetch past matches ONLY when showLive === false
  useEffect(() => {
    if (showLive) return;

    setPastLoading(true);
    setPastError(null);

    axios
      .get(import.meta.env.BACKEND_URL + "/match-info", {
        params: { seasonYear, page, limit },
      })
      .then((res) => {
        const response = res.data.data;
        setPastMatches(response.data);
        setTotalPages(response.totalPages);
        setPage(response.page);
      })
      .catch((err) => {
        console.error("Error fetching past matches:", err);
        setPastError("Failed to load past matches.");
      })
      .finally(() => setPastLoading(false));
  }, [showLive, seasonYear, page, limit]);

  // Reset page to 1 when seasonYear or limit changes to avoid invalid page numbers
  useEffect(() => {
    setPage(1);
  }, [seasonYear, limit]);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Cricket Match Info
      </h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowLive((prev) => !prev)}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition transform hover:scale-105"
        >
          {showLive ? "Show Past Matches" : "Show Live Match"}
        </button>
      </div>

      {showLive ? (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Live Match
          </h2>

          {liveLoading ? (
            <p className="text-center">Loading live match data...</p>
          ) : liveError ? (
            <p className="text-center text-red-500">{liveError}</p>
          ) : liveMatch ? (
            <LiveMatchTable match={liveMatch} />
          ) : (
            <p className="text-center">No live matches currently.</p>
          )}
        </section>
      ) : (
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Past Matches
          </h2>

          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 mb-6">
            <div className="flex flex-col items-start">
              <label className="mb-1 text-sm font-medium">Season Year</label>
              <input
                type="number"
                min={2008}
                max={currentYear}
                value={seasonYear}
                onChange={(e) => {
                  let val = Number(e.target.value);
                  if (val >= 2008 && val <= currentYear) {
                    setSeasonYear(val);
                  }
                }}
                className="bg-gray-700 text-white rounded px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col items-start">
              <label className="mb-1 text-sm font-medium">Items per page</label>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="bg-gray-700 text-white rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[5, 10, 20, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-start">
              <span className="mb-1 text-sm font-medium">Pagination</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page <= 1}
                  className="px-3 py-2 bg-blue-600 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition"
                >
                  Prev
                </button>
                <span className="px-2">
                  Page <span className="font-semibold">{page}</span> of{" "}
                  <span className="font-semibold">{totalPages}</span>
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page >= totalPages}
                  className="px-3 py-2 bg-blue-600 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {pastLoading ? (
            <p className="text-center">Loading past match data...</p>
          ) : pastError ? (
            <p className="text-center text-red-500">{pastError}</p>
          ) : pastMatches.length > 0 ? (
            <PastMatchTable matches={pastMatches} />
          ) : (
            <p className="text-center">No past matches found.</p>
          )}
        </section>
      )}
    </div>
  );
}
