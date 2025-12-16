import styles from '../styles/Body.module.css';

function Body() {
    return ( 
        <div className={styles.container}>
            This website allows company administrators to efficiently manage employees by creating, updating, and deleting employee profiles. Employees can log their work hours and provide detailed descriptions of their tasks, enabling administrators to track productivity and monitor total hours worked with ease.
        </div>
     );
}

export default Body;