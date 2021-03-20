import { NULL_IMAGE } from 'helpers';
import React, { useState, useEffect } from 'react';
import { CameraSVG, Timer, EditImage } from '../../assets/icons';
import handleFileUpload from './picUpload';
const date = new Date();
const weekday = new Array(7);
weekday[0] = 'Sun';
weekday[1] = 'Mon';
weekday[2] = 'Tues';
weekday[3] = 'Wed';
weekday[4] = 'Thurs';
weekday[5] = 'Fri';
weekday[6] = 'Sat';

var currentDay = weekday[date.getDay()];

const ProgressBar = ({ uploadProgress }) => (
  <div className="relative w-full sm:w-1/2 bg-gray-200 rounded">
    <div
      style={{ width: `${uploadProgress}%` }}
      className="absolute top-0 h-4 rounded shim-green"
    ></div>
  </div>
);

const Avatar = ({ data = {}, remote_leave_days, type }) => {
  const { profilePic, fullName, department, designation, email } = data;
  const [showProgressBar, setProgressBarVisiblity] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [time, setTime] = useState(
    new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  );

  useEffect(() => {
    let interval = setInterval(
      () =>
        setTime(
          new Date().toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })
        ),
      1000
    );
    return () => {
      clearTimeout(interval);
    };
  }, []);

  return (
    <div className="text-primary px-5 std-box-shadow  w-full h-full min-w-vs relative rounded-lg">
      {showProgressBar && type === 'staff' && (
        <ProgressBar uploadProgress={uploadProgress} />
      )}

      <div className="mx-auto h-full">
        <div className="p-3 rounded-full mx-auto inline-block bg-white relative">
          <div className="mx-auto inline-block h-56 w-56 rounded-full p-2 transform -rotate-45 img-avatar-container border-8 border-secondary">
            <img
              alt="staff passport"
              className="transform rotate-45 rounded-full w-full h-full bg-white object-contain"
              src={profilePic ? profilePic : NULL_IMAGE}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = NULL_IMAGE;
              }}
            ></img>
          </div>

          <div className="rounded-full bg-white w-20 h-20 absolute flex-center right-2 -bottom-5 transform -translate-y-1/2 p-2.5">
            <label className="img-uploader flex-center m-shadow w-full h-full">
              <input
                accept=".png, .jpg, .jpeg"
                onChange={(e) =>
                  handleFileUpload(e, [
                    email,
                    setProgressBarVisiblity,
                    setUploadProgress,
                  ])
                }
                type="file"
                name="fileToUpload"
                id="fileToUpload"
                size="1"
              />

              {type === 'dashboard' && <CameraSVG />}
              {type === 'staff' && <EditImage />}
            </label>
          </div>
        </div>

        {type === 'dashboard' && (
          <>
            <div className="p-3 pt-0">
              <div className="flex justify-between">
                <div className="flex  text-gray-400 text-2xl	 font-normal">
                  HELLO !
                </div>
                <div className="flex justify-between font-normal">
                  <div className="flex justify-between">
                    <div className="flex mr-1">
                      <Timer />
                    </div>
                    <div className="">
                      <div className="h-1/2 ">
                        <p className="font-medium text-xs text-txt">{time}</p>
                      </div>
                      <div className="h-1/2 ">
                        <p className="font-medium text-xs text-txt">
                          {date.getDate()} {currentDay} {date.getFullYear()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex mt-2 text-txt truncate text-2xl font-light">
                {fullName}
              </div>

              <div className="text-green-600 uppercase mt-2 pb-0 text-xs font-bold">
                {department}
              </div>
            </div>
          </>
        )}

        {type === 'staff' && (
          <>
            <div className="flex  p-5 pt-0 pb-0 h-10 truncate text-black text-2xl font-light">
              {fullName}
            </div>

            <div className="flex mt-3 p-5 pt-0 pb-0 text-black font-light">
              <p>{designation}</p>
            </div>
          </>
        )}

        {type === 'staff' && (
          <div className="pt-2 pb-2 flex text-white">
            {[
              {
                day_of_week: 'Monday',
                type: 'at_work',
              },
              {
                day_of_week: 'Tuesday',
                type: 'at_work',
              },
              {
                day_of_week: 'Wednesday',
                type: 'at_work',
              },
              {
                day_of_week: 'Thursday',
                type: 'at_work',
              },
              {
                day_of_week: 'Friday',
                type: 'at_work',
              },
            ]
              .map(
                (item) =>
                  remote_leave_days.find(
                    (item2) => item.day_of_week === item2.day_of_week
                  ) || item
              )
              .map(({ day_of_week, type }) => {
                return {
                  day_of_week: day_of_week.substring(0, 1),
                  type,
                };
              })
              .map(({ day_of_week, type }, index) =>
                type === 'at_work' ? (
                  <div
                    key={index}
                    className="rounded-full mx-auto h-10 w-10 flex items-center text-center bg-green-600 justify-center "
                  >
                    {day_of_week}
                  </div>
                ) : type === 'remote' ? (
                  <div
                    key={index}
                    className="rounded-full mx-auto h-10 w-10 flex items-center text-center bg-yellow-600 justify-center"
                  >
                    {day_of_week}
                  </div>
                ) : type === 'leave' ? (
                  <div
                    key={index}
                    className="rounded-full mx-auto h-10 w-10 flex items-center text-center bg-yellow-600 justify-center"
                  >
                    {day_of_week}
                  </div>
                ) : (
                  <div
                    key={index}
                    className="rounded-full mx-auto h-10 w-10 flex items-center text-center bg-green-600 justify-center "
                  >
                    {day_of_week}
                  </div>
                )
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Avatar;
