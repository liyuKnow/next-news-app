import Toolbar from '../components/Toolbar'
import styles from '../styles/EOM.module.css'

const EOM = ({ employee }) => {
    return (
        <div className="page-container">
            <Toolbar />
            <div className={styles.main}>
                <h1>Employee Of The Month</h1>

                <div className={styles.employeeOfTheMonth}>
                    <h3>{employee.name}</h3>
                    <h6>{employee.position}</h6>
                    <img src={employee.image} alt="" />
                    <p>{employee.description}</p>
                </div>
            </div>
        </div>
    )
}

export default EOM

export const getServerSideProps = async (pageContext) => {
    const res = await fetch(
        'https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth',
    );

    const employee = await res.json();

    return {
        props: {
            employee,
        }
    }
}