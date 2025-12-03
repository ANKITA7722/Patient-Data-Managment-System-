import MessageForm from "./MessageForm";
import UsersTable from "./UsersTable";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/visitors")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-cards"> ... </div>
        <MessageForm users={users} />  {/* <--- Messaging Feature here */}
        <UsersTable users={users} />
      </div>
    </div>
  );
};
