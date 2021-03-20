import React from 'react';
import { LateComerSVG, PresentSVG, AbsentSVG, RemoteSVG } from 'assets/icons';
import { NULL_IMAGE } from 'helpers';

const UserCard = ({ imgUrl, type, time, name, department }) => (
  <div className="flex h-16 cursor-pointer sm-shadow overflow-hidden my-3 rounded-md justify-between">
    <div className="flex w-16">
      <img
        alt="user"
        className="object-contain w-full h-full sm-shadow"
        src={imgUrl || NULL_IMAGE}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = NULL_IMAGE;
        }}
      ></img>
    </div>
    <div className="p-1 px-2 flex flex-col justify-between">
      <div
        className="w-full text-xs font-normal text-txt clipped-text"
        style={{
          '--number': 1,
        }}
      >
        {' '}
        {name}{' '}
      </div>
      <div className="block font-extralight text-xs"> {department} </div>
    </div>

    {type === 'late' && (
      <div
        style={{
          background: 'rgb(247,248,248)',
        }}
        className="w-1/4  text-center text-lateComer font-semibold"
      >
        <LateComerSVG className="w-15 mx-auto h-10" />
        <small>{time}</small>
      </div>
    )}

    {type === 'early' && (
      <div
        style={{
          background: 'rgb(247,248,248)',
        }}
        className="w-16 text-center text-primary font-semibold"
      >
        <PresentSVG className="h-10 w-full" />
        <small> {time} </small>
      </div>
    )}

    {type === 'absent' && (
      <div
        style={{
          background: 'rgb(247,248,248)',
        }}
        className="w-16 text-center text-primary font-semibold"
      >
        <AbsentSVG />
      </div>
    )}

    {type === 'remote' && (
      <div
        style={{
          background: 'rgb(247,248,248)',
        }}
        className="w-16 text-center text-primary font-semibold"
      >
        <RemoteSVG />
      </div>
    )}
  </div>
);

export default UserCard;
