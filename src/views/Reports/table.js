import {  useState } from 'react';
import Select from "components/Select";
import { CSVLink, CSVDownload } from "react-csv";
import { requests } from "helpers";
import { useToasts } from "react-toast-notifications";
import Loader from 'components/Spinner';

const DownLoadUser = ({ email }) => {
  const [loading, setLoading] = useState(false);
  const [isShow, setIshow] = useState(false);
  const [data, setData] = useState([]);
  const { addToast } = useToasts();


  return (
    <div
      onClick={async () => {
        try {
          const { data } = await requests.get(
            `/events/staff-events?email=${email}`
          );
          setData(data.map(e => [e.title]));
          setLoading(false);
          setIshow(true);
        } catch (error) {
          addToast("Failed to download staff", {
            appearance: "error",
            autoDismiss: true
          });
          setLoading(false);
        }
      }}
      className="h-5 w-5 m-auto bg-primary cursor-pointer d-user"
    >
      👁
      {!loading && isShow && (
        <CSVDownload data={data} target="_blank" />
      )}
    </div>
  );
};

const Table = ({
  dropDownValues,
  selectHandler,
  loading,
  header,
  body,
  downloadTitle
}) => {
  return (
    <div className="table-container  p-5 mt-10">
      <div className="flex justify-between">
        <div className="w-1/4">
          <Select
            name="events"
            placeHolder="Events"
            inputs={dropDownValues}
            handleSelect={selectHandler}
          />
        </div>

        {body.length > 1 && (
          <CSVLink
            data={body}
            className="w-28 h-12 text-white text-center bg-secondary cursor-pointer pt-3 rounded-lg"
            filename={`${downloadTitle}.xls`}
          >
            Download
          </CSVLink>
        )}
      </div>

      {loading ? (
        <Loader/>
      ) : (
        <div className="overflow-scroll h-96">
          {body.length > 0 && (
            <table className="table-auto mt-5  report-table p-5">
              <thead>
                <tr className="p-15">
                  {header.map((e, index) => (
                    <th
                      key={index}
                      className={`p-3 px-5 text-left ${
                        index === 1
                          ? " w-1/3"
                          : " w-1/2"
                      }`}
                    >
                      {e}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((eachArray, index) => (
                  <tr key={index} className="">
                    {eachArray.map((e, index) =>
                      index !== 3 ? (
                        <td
                          key={index}
                          className="w-96 px-5 py-2 text-left"
                        >
                          {e}
                        </td>
                      ) : (
                        <td key={index}>
                          <DownLoadUser email={e} />
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Table;
