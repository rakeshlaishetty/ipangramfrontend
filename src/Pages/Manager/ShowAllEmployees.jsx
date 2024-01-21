import React, { useState, useEffect } from "react";
import Employee from "../../axios/Employee";
import Table from "../../utils/Table";
import Paginate from "../../utils/Paginate";

const ShowAllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedData, SetSelectedData] = useState(null);
  const [isView, SetView] = useState(false);
  const [isEdit, SetEdit] = useState(false);
  const [orderType, setOrderType] = useState("asc"); // Default order type is ascending
  const [sortBy, setSortBy] = useState("name"); // Default sort by name

  const ToggleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const fetchData = async () => {
    try {
      let newdata = {
        page: currentPage,
        pageSize: 5,
        order: orderType,
        sortBy: sortBy, // Include sortBy in the request
      };

      const response = await Employee.getAllEmployees(newdata);
      const data = response.data;
      setEmployees(data.employees);
      setTotalPages(data.totalDocuments);
    } catch (error) {
      console.error("Error fetching employee data", error);
    }
  };

  useEffect(() => {
    setEmployees([]);
    setTotalPages(0);
    fetchData();
  }, [currentPage, orderType, sortBy]); // Fetch data when currentPage, orderType, or sortBy changes

  const itemsPerPage = 5;

  const paginatedEmployees = employees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOrderChange = (e) => {
    setOrderType(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="w-full container">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-end mb-4">
            <label className="mr-2">Sort By:</label>
            <select
              value={sortBy}
              onChange={handleSortByChange}
              className="border rounded p-1"
            >
              <option value="name">Name</option>
              <option value="location">Location</option>
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
            </select>
            <label className="ml-4 mr-2">Order:</label>
            <select
              value={orderType}
              onChange={handleOrderChange}
              className="border rounded p-1"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              All Employees Data
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              {employees.length ? (
                <Table
                  data={paginatedEmployees}
                  columns={["name", "email", "location", "Action"]}
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

export default ShowAllEmployees;
