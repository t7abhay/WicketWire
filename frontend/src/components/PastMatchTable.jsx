import React from "react";
export default function PastMatchTable({ matches }) {
  return (
    <div className="overflow-x-auto bg-gray-800 p-4 rounded-xl shadow-md">
      <table className="min-w-full text-left text-sm text-gray-300">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-4 py-2">Match</th>
            <th className="px-4 py-2">Date</th>
            {/* <th className="px-4 py-2">Venue</th> */}
            <th className="px-4 py-2">Score</th>
            <th className="px-4 py-2">Result</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Player of Match</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match._id} className="border-b border-gray-700">
              <td className="px-4 py-2">
                {match.team1} vs {match.team2}
              </td>
              <td className="px-4 py-2">{match.date}</td>
              {/* <td className="px-4 py-2">{match.venue}</td> */}
              <td className="px-4 py-2">
                {match.score1}/{match.wicket1} ({match.overs1} ov){" "}
                {match.score2}/{match.wicket2} ({match.overs2} ov)
              </td>
              <td className="px-4 py-2">
                {match.winner} won by {match.result_margin} {match.result}
              </td>
              <td className="px-4 py-2">{match.match_type}</td>
              <td className="px-4 py-2">{match.player_of_match}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
