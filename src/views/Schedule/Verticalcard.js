import React from 'react';

const Verticalcard = () => {
  return (
    <li
      key={`team_list_${i}`}
      className="mb-3 rounded-md overflow-hidden h-14 relative shadow-green team-card transition-all duration-200 cursor-pointer"
    >
      <div className="flex h-full w-full">
        <div className="bg-primary-fade w-14 flex-center font-bold text-2xl text-primary mr-3">
          <p>{team.code[0]}</p>
        </div>
        <div className="w-full flex flex-col justify-between p-1 text-sm text-txt">
          <p className="font-semibold">{team.code}</p>
          <p className="text-primary text-xs">
            Members <strong className="text-txt">{team.members.length}</strong>
          </p>
        </div>
        <div className="bg-white p-2 top-1 right-1 absolute flex icon-sec opacity-0 transition-all duration-200">
          <span
            className="cursor-pointer"
            // onClick={() => setAddTeam(team)}
          >
            <Edit className="w-4 h-4 mr-3" />
          </span>
          <span className="cursor-pointer">
            <Delete className="w-4 h-4" />
          </span>
        </div>
      </div>
    </li>
  );
};

export default Verticalcard;
