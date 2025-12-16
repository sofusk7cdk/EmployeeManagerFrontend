import { useState, useEffect } from "react";
import facade from "../../utils/apiFacade";

function TimeLogs() {
  const [timeLogs, setTimeLogs] = useState([]);

 useEffect(() => {
  const username = facade.getUserNameAndRoles()[0];
  const protectedEndpointPromise = facade.fetchData(
    "timelogs/employee/" + username,
    "GET"
  );
  protectedEndpointPromise
    .then((data) => setTimeLogs(data))
    .catch(err => console.log(err));
}, []);

  return (
    <div>
      <h3>Time Logs for Employee</h3>
      <table>
        <thead>
          <tr>
            <th>Date Time</th>
            <th>Hours</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {timeLogs.map((t) => (
            <tr key={t.id}>
              <td>{t.dateTime}</td>
              <td>{t.hours}</td>
              <td>{t.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimeLogs;
