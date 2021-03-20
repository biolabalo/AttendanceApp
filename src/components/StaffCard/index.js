import React from 'react';
import { Link } from 'react-router-dom';
import { NULL_IMAGE } from 'helpers';
import {
  AbsentSVG,
  PresentSVG,
  RemoteSVG,
  LeaveSVG,
  LateComerSVG,
} from 'assets/icons';

const StaffCard = ({ data }) => (
  <Link
    to={{ pathname: `/employees/${data.email}`, query: { id: data.email } }}
  >
    <div className="flex h-16 cursor-pointer sm-shadow overflow-hidden my-3 rounded-md justify-between">
      <div className="flex w-16">
        <img
          alt="user"
          className="object-contain w-full h-full sm-shadow"
          src={data.profilePic || NULL_IMAGE}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = NULL_IMAGE;
          }}
        ></img>
      </div>
      <div className="p-1 px-2 flex flex-col justify-between items-start flex-grow">
        <div
          className="w-full text-xs font-normal text-txt clipped-text"
          style={{ '--number': 1 }}
        >
          {data.fullName}
        </div>
        <div>
          <div className="block font-extralight" style={{ fontSize: '10px' }}>
            {data.designation}
          </div>
          <div
            className="text-primary-medium text-xs font-bold clipped-text"
            style={{ '--number': 1, fontSize: '10px' }}
          >
            {data.department}
          </div>
        </div>
      </div>

      <div
        style={{ background: 'rgb(247,248,248)' }}
        className="w-auto text-center text-primary font-semibold"
      >
        {data.avalability === 'early' ? (
          <PresentSVG className="w-16" />
        ) : data.avalability === 'absent' ? (
          <AbsentSVG className="w-16" />
        ) : data.avalability === 'remote' ? (
          <RemoteSVG className="w-16" />
        ) : data.avalability === 'late' ? (
          <LateComerSVG className="w-16" />
        ) : data.avalability === 'leave' ? (
          <LeaveSVG className="w-16" />
        ) : (
          <PresentSVG className="w-16" />
        )}
      </div>
    </div>
  </Link>
);

export default StaffCard;
