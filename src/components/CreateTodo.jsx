import React, { useContext, useState } from "react";
import { PostList } from "../store/post-list-store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const CreateTodo = () => {
  const { currentUser } = useContext(AuthContext);
  const { addPost } = useContext(PostList);
  const [formData, setFormData] = useState({
    userId: "",
    todoName: "",
    date: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a JSON object instead of FormData
    const data = {
      owner: formData.userId,
      todoName: formData.todoName,
      date: formData.date,
    };

    try {
      const response = await axios.post(
        "https://researchify-todo-backend-6fzs.onrender.com/api/v1/todos",
        data,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data);
      alert("Todo Created Successfully");

      navigate("/profile");
    } catch (error) {
      console.log(currentUser.data.user._id);
      if (!currentUser) {
        alert("You need to login first to create any todo");
      } else {
        console.error("Error during creating todo:", error.response.data);
        alert("Error creating todo, please try again.");
      }
    }

    addPost(formData.userId, formData.todoName, formData.date);
  };

  return (
    <div className="create__post">
      <form className="form create_post__form" onSubmit={handleSubmit}>
        <p className="text-center bg-transparent">
          {!currentUser
            ? " you need to be logged in first before adding any todo "
            : ""}
        </p>

        <h1 className="text-center text-white bg-transparent">Create Todo</h1>

        <div className="mb-3 bg-transparent">
          <label
            htmlFor="todoName"
            className="form-label  bg-transparent text-white"
          >
            Todo Name
          </label>
          <input
            type="text"
            className="form-control"
            id="todoName"
            name="todoName"
            value={formData.todoName}
            onChange={handleChange}
            placeholder="Your Todo..."
          />
        </div>
        <div className="mb-3 bg-transparent">
          <label
            htmlFor="date"
            className="form-label bg-transparent text-white"
          >
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-info">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
