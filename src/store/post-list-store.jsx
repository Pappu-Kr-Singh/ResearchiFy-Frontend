import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  addInitialPosts: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD__INITIAL_POSTS") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }

  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    // DEFAULT_POST_LIST
    []
  );

  const addPost = (userId, todoName, date) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        // id: Date.now(),
        todoName: todoName,
        date: date,
        owner: userId,
      },
    });
    // console.log(postImg);
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD__INITIAL_POSTS",
      payload: {
        posts,
      },
    });
    // console.log(posts);
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider
      value={{ postList, addPost, deletePost, addInitialPosts }}
    >
      {children}
    </PostList.Provider>
  );
};

// const DEFAULT_POST_LIST = [
//   {
//     id: "1",
//     title: "NEw POST FRom WeB DUdE",
//     body: "Hii freinds I am practicing react js context api and use reducer",
//     reactions: 20,
//     userID: "user-10",
//     img: "https://img.freepik.com/free-photo/social-media-marketing-concept-marketing-with-applications_23-2150063134.jpg?t=st=1718570014~exp=1718573614~hmac=beadb2bf36398fe9aea71308eac586dfd9fc7e329483234e5978102bcffe5a37&w=900",
//     tags: ["vacation", "Learning", "REact"],
//   },
//   {
//     id: "2",
//     title: "Btech Khatam ho gyi ",
//     body: "the golden time is now at the end ",
//     reactions: 60,
//     userID: "user-20",
//     img: "https://img.freepik.com/free-photo/front-view-woman-holding-smartphone_23-2150208244.jpg?t=st=1718570057~exp=1718573657~hmac=3454cf7484d30423a98eb73aeba518c7200a46ed7de28b94903fa8cf8589bfd3&w=740",
//     tags: ["graduation", "btech", "goldenTime"],
//   },
// ];
export default PostListProvider;
