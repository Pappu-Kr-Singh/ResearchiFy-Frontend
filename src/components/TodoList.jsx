import React, { useContext, useEffect, useState } from "react";
import Todo from "./Todo";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import { AuthContext } from "../context/authContext";

function TodoList() {
  const { postList, addInitialPosts } = useContext(PostListData);
  const [fetching, setFetching] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // console.log(postList);

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const response = await axios.get(
          `https://researchify-todo-backend-6fzs.onrender.com/api/v1/todos/${currentUser.data.user._id}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.data.accessToken}`, // Use access token
            },
          }
        );

        const jsonData = response.data;
        // console.log(jsonData);
        addInitialPosts(jsonData.data);

        setFetching(false);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [currentUser]);

  return (
    <div className="post__List ">
      {fetching && <LoadingSpinner />}
      {!fetching && postList.length === 0 && <WelcomeMessage />}
      {!fetching && postList.map((todo) => <Todo key={todo._id} todo={todo} />)}
    </div>
  );
}

export default TodoList;
