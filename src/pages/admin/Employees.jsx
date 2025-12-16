import { useEffect, useState } from "react";
import facade from "../../utils/apiFacade";

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const protectedEndpointPromise = facade.fetchData(
      "/admin/employees",
      "GET"
    );
    protectedEndpointPromise.then((data) => setEmployees(data));
  }, []);

  return (
    <div>
      <h3>Employees</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.username}>
              <td>{e.username}</td>
              <td>{e.firstName}</td>
              <td>{e.lastName}</td>
              <td>{e.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
