import React from 'react';

// search filter works with an array of objects
const SearchBar = ({ placeholder, dataForFilter = [], filterHandler }) => {
  const data = [...dataForFilter];
  return (
    <div className="flex min-w-0 h-10 rounded-lg search-box-shadow	border-2 border-gray-300 p-1">
      <input
        onChange={(e) => {
          if (!Array.isArray(dataForFilter) || !dataForFilter.length) return;

          if (e.target.value.length === 0) return filterHandler(dataForFilter);

          if (e.target.value.length > 0) {
            return filterHandler(
              data.filter((eachStaff) => {
                return eachStaff['fullName']
                  ? eachStaff['fullName']
                      .toLowerCase()
                      .match(e.target.value.toLowerCase())
                  : null  || eachStaff['department']
                  ? eachStaff['department']
                      .toLowerCase()
                      .match(e.target.value.toLowerCase())
                  : null;
              })
            );
          }
        }}
        type="text"
        placeholder={placeholder}
        size="30"
        className="h-8 w-full px-2 bg-transparent  outline-none"
      />
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        className="pt-2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.3304 19.9594L15.1291 13.7581C16.3053 12.306 17.0133 10.46 17.0133 8.45004C17.0133 3.79071 13.2226 0 8.56328 0C3.90395 0 0.113281 3.79071 0.113281 8.45004C0.113281 13.1094 3.904 16.9001 8.56333 16.9001C10.5732 16.9001 12.4193 16.192 13.8714 15.0159L20.0726 21.2172C20.2464 21.3908 20.5279 21.3908 20.7016 21.2172L21.3304 20.5883C21.5041 20.4146 21.5041 20.133 21.3304 19.9594ZM8.56333 15.1211C4.88469 15.1211 1.89225 12.1287 1.89225 8.45004C1.89225 4.7714 4.88469 1.77897 8.56333 1.77897C12.242 1.77897 15.2344 4.7714 15.2344 8.45004C15.2344 12.1287 12.242 15.1211 8.56333 15.1211Z"
          fill="#C0C0C0"
        />
      </svg>
    </div>
  );
};

export default SearchBar;
