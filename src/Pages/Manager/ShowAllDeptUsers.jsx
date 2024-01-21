import React, { useState, useEffect } from "react";
import DepartmentApi from "../../axios/Department";
import DepartmentUsertable from "../Manager/DepartmentUsertable";
import Paginate from "../../utils/Paginate";
import { useNavigate, useLocation } from "react-router-dom";

const ShowAllDeptUsers = () => {
  const [Departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  
  const location = useLocation();

  console.log(location);
  const { state } = location;

  if(!state.locationState) {
    navigate(-1)
  }

  const ToggleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const fetchData = async () => {
    try {
      let newdata = {
        page: currentPage,
        pageSize: 5,
        DeptdId:state.locationState._id
      };
      // sortBy, order = "asc", page = 1, pageSize = 5, email

      const response = await DepartmentApi.GetALLdeptUsers(newdata);
      const data = response.data;
      setDepartments(data.usersForDept);
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



  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full container">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              All Departments user Data
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              {Departments.length ? (
                <DepartmentUsertable
                  data={Departments}
                  columns={["name", "email", "location", "Action"]}
                  DeptdId={state.locationState._id}
                />
              ) : (
                <div className="text-center">
                  <p>No data available</p>
                </div>
              )} 
              {
                Departments.length &&
              <div className="flex justify-center p-3">
                <Paginate
                  activePage={currentPage}
                  SetActivePage={handlePageChange}
                  pageCount={totalPages}
                  PerPage={itemsPerPage}
                />
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowAllDeptUsers;
