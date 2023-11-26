import React, { useEffect, useState } from "react";
import {
  DeleteStudentRequest,
  ReadStudentsRequest,
} from "../../ApiRequest/ApiRequest";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

function StudentList() {
  const [studentList, setStudentList] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    (async () => {
      let res = await ReadStudentsRequest();
      setStudentList(res["data"]);
      console.log(studentList);
    })();
  }, [count]);

  const deleteStudent = async (id) => {
    let res = await DeleteStudentRequest(id);
    if (res) {
      setCount(count + Date.now());
      toast.success(`Data deleted successfully`);
    } else {
      toast.error(`Anything wrong .`);
    }
  };

  if (studentList.length === 0) {
    return (
      <div>
        <h1>Loading.....</h1>
      </div>
    );
  } else {
    return (
      <>
        <div className="student-list overflow-x-auto my-10 px-28 ">
          <table className="table ">
            <thead>
              <tr>
                <th>First name</th>
                <th>lastName</th>
                <th>gender</th>
                <th>dateOfBirth</th>
                <th>nationality</th>
                <th>address</th>
                <th>email</th>
                <th>phone</th>
                <th>admissionDate</th>
                <th>courses</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((student, i) => {
                const {
                  _id,
                  firstName,
                  lastName,
                  gender,
                  dateOfBirth,
                  nationality,
                  address,
                  email,
                  phone,
                  admissionDate,
                  courses,
                } = student;
                return (
                  <tr key={i}>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{gender}</td>
                    <td>{dateOfBirth}</td>
                    <td>{nationality}</td>
                    <td>{address}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>{admissionDate}</td>
                    <td>{courses}</td>
                    <td className="flex gap-0 bg-slate-100">
                      <button
                        onClick={() => deleteStudent(_id)}
                        className="btn  btn-link"
                      >
                        delete
                      </button>
                      <Link
                        className="btn btn-active btn-link"
                        to={"/save-student?id=" + _id}
                      >
                        edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </>
    );
  }
}

export default StudentList;
