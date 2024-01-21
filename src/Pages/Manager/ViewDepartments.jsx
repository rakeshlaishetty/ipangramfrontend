import React, { useState, useEffect } from "react";
import Table from "../../utils/Table";
import Paginate from "../../utils/Paginate";
import DepartmentApi from "../../axios/Department";
import DepTable from "./DeptTable";
 

const ViewDepartments = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedData, SetSelectedData] = useState(null);
  const [isView, SetView] = useState(false);
  const [isEdit, SetEdit] = useState(false);

  const ToggleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const fetchData = async () => {
    try {
      let newdata = {
        page: currentPage,
        pageSize: 5,
      };
      // sortBy, order = "asc", page = 1, pageSize = 5, email

      const response = await DepartmentApi.ViewAllDepts(newdata);
      const data = response.data;
      setEmployees(data.departments);
      setTotalPages(data.totalDocuments);
    } catch (error) {
      console.error("Error fetching employee data", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const itemsPerPage = 5;

console.log(employees,'employees')
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full container">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              DepartMents
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              {employees.length ? (
                <DepTable
                  data={employees}
                  columns={["DepartMent Name","Action"]}
                  ToggleModal={ToggleModal}
                  SetSelectedData={SetSelectedData}
                  SetEdit={SetEdit}
                  SetView={SetView}
                />
              ) : (
                <div className="text-center">
                  <p>No data available</p>
                </div>
              )}
              <div className="flex justify-center p-3">
                <Paginate
                  activePage={currentPage}
                  SetActivePage={handlePageChange}
                  pageCount={totalPages}
                  PerPage={itemsPerPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDepartments;
