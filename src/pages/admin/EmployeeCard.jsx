import { useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "../../styles/admin/EmployeeCard.module.css";
import facade from "../../utils/apiFacade";

function EmployeeCard() {
  const { id } = useParams();
  const [timeLogs, setTimeLogs] = useState([]);

  useEffect(() => {
    const protectedEndpointPromise = facade.fetchData(
      "timelogs/employee/" + id,
      "GET"
    );
    protectedEndpointPromise
      .then((data) => setTimeLogs(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!id) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div>
      <h3>Time Logs for {id}</h3>
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

export default EmployeeCard;
