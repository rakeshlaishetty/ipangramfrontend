import { FaEye } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EmployeesApi from "../axios/Employee";
import useToast from "../customHook/useToast";

const Table = ({ data, columns }) => {
  const navigate = useNavigate();

  const { showToast } = useToast();

  const DeleteEmployee = async (id) => {
    const newdata = { id: id };
    try {
      const response = await EmployeesApi.DeleteEmployees(newdata);
      if (response.status || response.success) {
        console.log(response.data, "response data");
        showToast("success", "Updated Successfully.");
        navigate(0);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      showToast("error", error.message || "Failed to Update");
    }
  };
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
              key={column}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => {
          return (
            <tr key={idx}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                <div className="flex justify-center">
                  <div className="flex-shrink-0 w-10 h-10">
                    <p>{`${row.firstName} ${row.lastName}`}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                <div className="flex justify-center">
                  <div className="flex-shrink-0 w-10 h-10">
                    <p>{`${row.email}`}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                <div className="flex justify-center">
                  <div className="flex-shrink-0 w-10 h-10">
                    <p>{`${row.location}`}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                <div className="flex justify-center">
                  <div className="flex-shrink-0  h-10 flex flex-row gap-1">
                    <p
                      className="p-1"
                      onClick={() => {
                        navigate(`./viewemployee`, {
                          state: { employeeData: row },
                        });
                      }}
                    >
                      <FaEye />
                    </p>
                    <p
                      className="p-1"
                      onClick={() => {
                        navigate(`./editemployee`, {
                          state: { employeeData: row },
                        });
                      }}
                    >
                      <TiPencil />
                    </p>
                    <p
                      className="p-1"
                      onClick={() => {
                        DeleteEmployee(row._id);
                      }}
                    >
                      <MdDeleteForever />
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
