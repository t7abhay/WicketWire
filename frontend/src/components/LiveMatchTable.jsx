import React from "react";

export default function LiveMatchTable({ match }) {
  const { stadium, stage, teams1, teams2, date } = match;

  return (
    <div className="live-match-table bg-gray-800 p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <h3 className="text-xl font-semibold mb-2 text-center">Live Match</h3>
      <p className="text-center mb-4">{stadium}</p>
      <p className="text-center mb-4 font-semibold">{stage}</p>

      <div className="flex justify-around items-center mb-4">
        {/* Team 1 */}
        <div className="team flex flex-col items-center">
          <img
            src={teams1?.thumbnail}
            alt={`${teams1.name} logo`}
            className="w-20 h-20 mb-2"
          />
          <p className="font-semibold">{(teams1.name, teams1.score)}</p>
        </div>

        <span className="text-2xl font-bold">vs</span>

        {/* Team 2 */}
        <div className="team flex flex-col items-center">
          <img
            src={teams2?.thumbnail}
            alt={`${teams2.name} logo`}
            className="w-20 h-20 mb-2"
          />
          <p className="font-semibold">{(teams2.name, teams2.score)}</p>
        </div>
      </div>

      <p className="text-center text-gray-300">{date}</p>
    </div>
  );
}
