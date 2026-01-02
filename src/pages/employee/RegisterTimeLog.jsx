import { useState, useEffect } from "react";
import facade from "../../utils/apiFacade";
import styles from "../../styles/employee/RegisterTimeLog.module.css";

function RegisterTimeLog() {
  const username = facade.getUserNameAndRoles()[0];
  const blankTimeLog = {
    id: "",
    user: username,
    dateTime: "",
    hours: "",
    description: "",
  };

  const [timeLog, setTimeLog] = useState(blankTimeLog);
  const [timeLogs, setTimeLogs] = useState([]);

    useEffect(() => {
    const protectedEndpointPromise = facade.fetchData(
      "timelogs/employee/" + username,
      "GET"
    );
    protectedEndpointPromise.then((data) => setTimeLogs(data));
  }, []);


  function mutateTimeLog(timeLog) {
    if (timeLog.id != "") {
      updateTimeLog(timeLog);
    } else {
      createTimeLog(timeLog);
    }
  }

  function createTimeLog(timeLog) {
    const postEndpointPromise = facade.fetchData("timelogs", "POST", timeLog);
    postEndpointPromise.then((createdTimeLog) =>
      setTimeLogs((prevTimeLogs) => [...prevTimeLogs, createdTimeLog])
    )
    .then(facade.fetchData("timelogs/employee/" + username, "GET")
    .then(data => setTimeLogs(data))
    )
  }

  function updateTimeLog(timeLog) {
    const putEndpointPromise = facade.fetchData(
      `timelogs/${timeLog.id}`,
      "PUT",
      timeLog
    );
    putEndpointPromise
      .then((updateTimeLog) => {
        setTimeLogs(
          timeLogs.map((timeLog) =>
            timeLog.id === updateTimeLog.id ? updateTimeLog : timeLog
          )
        );
      })
      .catch((err) => console.error(err));
  }

  function deleteTimeLogById(id) {
    const deleteEndpointPromise = facade.fetchData(`timelogs/${id}`, "DELETE");
    deleteEndpointPromise
      .then(() => setTimeLogs(timeLogs.filter((timeLog) => timeLog.id !== id)))
      .catch((err) => console.error(err));
  }

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.id;
    setTimeLog({ ...timeLog, [name]: value });
  }

  function handleReset(event) {
    event.preventDefault();
    setTimeLog(blankTimeLog);
  }

  function handleSubmit(event) {
    event.preventDefault();
    mutateTimeLog(timeLog);
    setTimeLog({ ...blankTimeLog });
  }

  return (
    <div>
      <div className={styles.leftSide}>
        <h1>Register New Time log</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="id">Id</label>
          <input id="id" type="number" readOnly value={timeLog.id} />



          <label htmlFor="dateTime">Date Time</label>
          <input
            id="dateTime"
            type="text"
            placeholder="Enter Date Time"
            onChange={handleChange}
            value={timeLog.dateTime}
          />

          <label htmlFor="hours">Hours</label>
          <input
            id="hours"
            type="number"
            placeholder="Enter Hours"
            onChange={handleChange}
            value={timeLog.hours}
          />

          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            placeholder="Enter Description"
            onChange={handleChange}
            value={timeLog.description}
          />

          <button type="submit">Submit</button>
          <button onClick={handleReset}>Reset</button>
        </form>
      </div>
      <div className={styles.rightSide}>
        <h2>Existing Time Logs</h2>
        <ul>
          {timeLogs.map((timeLog) => (
            <li key={timeLog.id}>
              {timeLog.description}
              <button
                onClick={() => {
                  setTimeLog({
                    ...blankTimeLog,
                    ...timeLog,
                  });
                }}
              >
                Edit
              </button>

              <button
                className={styles.deleteButton}
                onClick={() => deleteTimeLogById(timeLog.id)}
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

export default RegisterTimeLog;
