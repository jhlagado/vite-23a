import { useEffect, useState } from "react";
import { User } from "../../types/User";

export const SERVER_URL = "https://dummyjson.com/users";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(SERVER_URL);
        const data = (await res.json()) as { users: User[] };
        setUsers(data.users);
      } catch (err) {
        setUsers([]);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div>{user.firstName}</div>
            <div>{user.username}</div>
            <div>{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
