# MERN Todo (JavaScript starter)

A full-stack Todo app (MongoDB, Express, React, Node) with complete CRUD.
It is written in **plain JavaScript on purpose**. Your job is to convert it to
TypeScript. See [ASSIGNMENT.md](./ASSIGNMENT.md).

## Structure

```
mern-todo-typescript/
├── server/                 Express + Mongoose API (ESM)
│   └── src/
│       ├── index.js
│       ├── config/db.js
│       ├── models/Todo.js
│       ├── controllers/todoController.js
│       ├── routes/todoRoutes.js
│       ├── middleware/errorHandler.js
│       └── utils/{AppError.js, response.js}
└── client/                 React (Vite)
    └── src/
        ├── main.jsx, App.jsx, App.css
        ├── api/todoApi.js
        ├── components/{TodoForm, TodoList, TodoItem}.jsx
        └── utils/helpers.js
```

## Run it

You need Node 18+ and MongoDB running locally (or an Atlas URI).

```bash
# terminal 1 - API on http://localhost:5000
cd server
cp .env.example .env        # edit MONGO_URI if needed
npm install
npm run dev

# terminal 2 - UI on http://localhost:5173
cd client
npm install
npm run dev
```

## API

Every response has the shape `{ success: boolean, data: T, message?: string }`.

| Method | Route             | Description                         |
| ------ | ----------------- | ----------------------------------- |
| GET    | `/api/todos`      | List todos, optional `?status=`     |
| GET    | `/api/todos/:id`  | Get one todo                        |
| POST   | `/api/todos`      | Create a todo (`title` is required) |
| PUT    | `/api/todos/:id`  | Update a todo                       |
| DELETE | `/api/todos/:id`  | Delete a todo                       |

## Todo shape

| Field         | Values                                   |
| ------------- | ---------------------------------------- |
| `_id`         | string (set by MongoDB)                  |
| `title`       | string, required                         |
| `description` | string, optional                         |
| `status`      | `"pending"` / `"in-progress"` / `"completed"` |
| `priority`    | `0` Low, `1` Medium, `2` High            |
| `dueDate`     | ISO date string, optional                |
| `createdAt`   | ISO date string, set by MongoDB          |
| `updatedAt`   | ISO date string, set by MongoDB          |
