export default function WorkingWithArrays(app) {
  let todos = [
    { id: 1, title: "Task 1", completed: false, description: "Sample Task 1" },
    { id: 2, title: "Task 2", completed: true, description: "Sample Task 2" },
    { id: 3, title: "Task 3", completed: false, description: "Sample Task 3" },
    { id: 4, title: "Task 4", completed: true, description: "Sample Task 4" },
  ];


  app.get("/api/lab5/todos", (req, res) => {
    res.json(todos);
  });

  // app.post("/lab5/todos", (req, res) => {
  //   const newTodo = {
  //     id: new Date().getTime(),
  //     title: req.body.title || "New Task",
  //     completed: false,
  //   };
  //   todos.push(newTodo);
  //   res.json(todos);
  // });

  // New POST route for creating a todo
  app.post("/api/lab5/todos", (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  });

  // Create todo
  app.get("/api/lab5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });

  // Retrieve a todo by ID
  app.get("/api/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  });

  // Delete a todo by ID
  // app.get("/lab5/todos/:id/delete", (req, res) => {
  //   const { id } = req.params;
  //   const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
  //   if (todoIndex >= 0) {
  //     todos.splice(todoIndex, 1);
  //   }
  //   res.json(todos);
  // });

  // New DELETE route for deleting a todo
  app.delete("/api/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
    }
    res.sendStatus(200);
  });

  // Update a todo's title by ID
  app.get("/api/lab5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.title = title;
    }
    res.json(todos);
  });

  // Update completed property
  app.get("/api/lab5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.completed = completed === "true";
    }
    res.json(todos);
  });

  // Update description property
  app.get("/api/lab5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.description = description;
    }
    res.json(todos);
  });

  // Add PUT route for updating todos
  app.put("/api/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    todos = todos.map((t) =>
      t.id === parseInt(id) ? { ...t, ...req.body } : t
    );
    res.sendStatus(200); // Respond with status code 200
  });
}