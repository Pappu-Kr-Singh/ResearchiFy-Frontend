const Todo = ({ todo }) => {
  // console.log(todo);
  return (
    <div
      className="card post-card"
      style={{ width: "20rem", margin: "2rem 0rem" }}
    >
      <div className="card-body ">
        <h5 className="card-title text-white bg-transparent">
          {todo.todoName}
        </h5>
        <p className="card-text text-white bg-transparent">{todo.date}</p>
      </div>
    </div>
  );
};

export default Todo;
