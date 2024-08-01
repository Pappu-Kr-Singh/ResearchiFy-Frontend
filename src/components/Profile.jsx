import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import WelcomeMessage from "./WelcomeMessage";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [fetching, setFetching] = useState(false);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const response = await axios.get(
          `https://researchify-todo-backend-6fzs.onrender.com/api/v1/todos/${currentUser.data.user._id}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.data.accessToken}`,
            },
          }
        );

        const jsonData = response.data.data;
        setTodos(jsonData);
        setFetching(false);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleDelete = async (todoId) => {
    try {
      await axios.delete(
        `https://researchify-todo-backend-6fzs.onrender.com/api/v1/todos/${todoId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data.accessToken}`,
          },
        }
      );
      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleStatusChange = async (todoId, newStatus) => {
    try {
      await axios.patch(
        `https://researchify-todo-backend-6fzs.onrender.com/api/v1/todos/${todoId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data.accessToken}`,
          },
        }
      );
      setTodos(
        todos.map((todo) =>
          todo._id === todoId ? { ...todo, status: newStatus } : todo
        )
      );
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    return todo.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "in-progress":
        return "yellow";
      case "Postponed":
        return "red";
      default:
        return "white";
    }
  };

  return (
    <>
      <main id="profile">
        <div className="card">
          <center>
            <div className="profileimage">
              <img
                className="profile__img"
                src={currentUser.data.user.avatar}
                alt=""
              />
            </div>
            <div className="Name text-black">
              <p>{currentUser.data.user.userName}</p>
            </div>
            <span className="text-black">
              id:
              <p className="text-secondary">{currentUser.data.user._id}</p>
            </span>
          </center>
        </div>
      </main>

      <hr />

      <h1 className="text-center text-black">Your Todo</h1>

      <div className="filter">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All tasks</option>
          <option value="Completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="Postponed">Postponed</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>

      <div className="your__post">
        {fetching ? (
          <p>Loading...</p>
        ) : (
          filteredTodos.map((todo) => (
            <div
              className="card post-card"
              style={{
                width: "35rem",
                margin: "2rem 0rem",
                backgroundColor: getStatusColor(todo.status),
              }}
              key={todo._id}
            >
              <div className="card-body ">
                <h5 className="card-title text-white bg-transparent ">
                  {todo.todoName}
                </h5>
                <p className="card-text text-white bg-transparent ">
                  {todo.date}
                </p>

                <div className="deleteNupdata_btn bg-transparent">
                  <button
                    className="btn-danger text-white bg-danger rounded"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>

                  <button
                    className="btn-danger text-white bg-success rounded"
                    onClick={() => handleStatusChange(todo._id, "Completed")}
                  >
                    Mark as Completed
                  </button>

                  <button
                    className="btn-danger text-white bg-dark rounded"
                    onClick={() => handleStatusChange(todo._id, "Postponed")}
                  >
                    Mark as Postponed
                  </button>

                  <button
                    className="btn-danger text-white bg-info rounded"
                    onClick={() => handleStatusChange(todo._id, "in-progress")}
                  >
                    Mark as In Progress
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Profile;
