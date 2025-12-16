import { useState, useEffect } from "react";
import styles from "../../styles/admin/RegisterEmployee.module.css";
import facade from "../../utils/apiFacade";

function RegisterEmployee() {
  const blankEmployee = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [employee, setEmployee] = useState(blankEmployee);
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const protectedEndpointPromise = facade.fetchData(
      "/admin/employees",
      "GET"
    );
    protectedEndpointPromise.then((data) => setEmployees(data));
  }, []);

  function mutateEmployee(e) {
    if (isEditing) {
      updateEmployee(e);
    } else {
      createEmployee(e);
    }
  }

  function createEmployee(e) {
    const postEndpointPromise = facade.fetchData(
      "admin/employee/register",
      "POST",
      e
    );
    postEndpointPromise
      .then((createdEmployee) => setEmployees([...employees, createdEmployee]))
      .catch((err) => console.error(err));
  }

  function updateEmployee(e) {
    const putEndpointPromise = facade.fetchData(
      `admin/employee/${e.username}`,
      "PUT",
      e
    );
    putEndpointPromise
      .then((updateEmployee) => {
        setEmployees(
          employees.map((e) =>
            e.username === updateEmployee.username ? updateEmployee : e
          )
        );
      })
      .catch((err) => console.error(err));
  }

  function deleteEmployeeByUsername(username) {
    const deleteEndpointPromise = facade.fetchData(
      `admin/employee/${username}`,
      "DELETE"
    );
    deleteEndpointPromise
      .then(() =>
        setEmployees(employees.filter((e) => e.username !== username))
      )
      .catch((err) => console.error(err));
  }

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.id;
    setEmployee({ ...employee, [name]: value });
  }

  function handleReset(event) {
    event.preventDefault();
    setEmployee(blankEmployee);
    setIsEditing(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    mutateEmployee(employee);
    setEmployee({ ...blankEmployee });
    setIsEditing(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1>Register New Employee</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter Username"
            onChange={handleChange}
            value={employee.username}
          />

          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            placeholder="Enter First Name"
            onChange={handleChange}
            value={employee.firstName}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            placeholder="Enter Last Name"
            onChange={handleChange}
            value={employee.lastName}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Enter Phone"
            onChange={handleChange}
            value={employee.email}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            placeholder="Enter Password"
            onChange={handleChange}
            value={employee.password}
          />

          <button type="submit">Submit</button>
          <button onClick={handleReset}>Reset</button>
        </form>
      </div>
      <div className={styles.rightSide}>
        <h2>Existing Employees</h2>
        <ul>
          {employees.map((e) => (
            <li key={e.username}>
              {e.firstName}
              <button
                onClick={() => {
                  setEmployee({
                    ...blankEmployee,
                    ...e,
                    password: "", // never populate password from backend
                  });
                  setIsEditing(true);
                }}
              >
                Edit
              </button>

              <button
                className={styles.deleteButton}
                onClick={() => deleteEmployeeByUsername(e.username)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RegisterEmployee;
