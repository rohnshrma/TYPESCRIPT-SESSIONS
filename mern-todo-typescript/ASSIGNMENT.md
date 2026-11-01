# Assignment: Convert the MERN Todo App to TypeScript

## Goal

Take the working JavaScript Todo app in this folder and convert **both the
server and the client** to TypeScript, using **only the topics we covered in
class**. The app must behave exactly as before. Only the types are new.

Run the app first and click through every feature (add, edit, toggle, filter,
delete) so you know what "working" looks like.

---

## Allowed topics (nothing else)

These are the only TypeScript features you may use. Each one comes from a file
in the `class/` folder.

| Topic | Where we covered it |
| ----- | ------------------- |
| Basic types: `string`, `number`, `boolean`, type annotations, inference | `hello.ts` |
| Arrays (`Todo[]`) | `hello.ts`, `objects.ts` |
| Enums | `hello.ts` |
| Union types and literal types | `hello.ts` |
| `unknown` (and why it is safer than `any`) | `hello.ts` |
| Object types, `type` aliases, `interface` | `objects.ts` |
| Optional (`?`) and `readonly` properties | `objects.ts` |
| Function parameter and return types, arrow functions | `function.ts` |
| Optional and default parameters | `function.ts` |
| `void` and `never` | `function.ts` |
| Classes: `constructor`, `public`/`private`, `extends`, `super` | `classes.ts` |
| Type narrowing with `typeof` and `in` | `adv.ts` |
| Generics: generic functions and generic interfaces (`ApiResponse<T>`) | `adv.ts` |
| Utility types: `Partial`, `Pick`, `Omit`, `Readonly` | `ut.ts` |
| `export` / `import` of types and values | `math.ts`, `app.ts` |

### Not allowed

Do not use anything outside the table above. For example: `instanceof`, `protected`, `any`, `as` type
assertions with `!` or `as unknown as`, `@ts-ignore`, `@ts-expect-error`,
`Record`, mapped types, conditional types, `keyof`, `typeof` as a type operator,
decorators, namespaces, `declare module`, and validation libraries such as Zod.

The only packages you may install are `typescript`, `tsx` and `@types/*`.

---

## Rules

1. `"strict": true` must be on in both `tsconfig.json` files.
2. **No `any`** anywhere. Use `unknown` plus narrowing where you do not know the type.
3. Every function declares its **return type** (including `void` where it applies).
4. Every `.js` / `.jsx` file becomes `.ts` / `.tsx`. No JavaScript is left behind.
5. `tsc --noEmit` reports **0 errors** in both `server` and `client`.
6. Do not change what the app does. If you find a bug, note it in your submission instead of silently fixing it.

---

## Setup

### Server

```bash
cd server
npm install -D typescript tsx @types/node @types/express @types/cors
```

Create `server/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "rootDir": "./src",
    "outDir": "./dist",
    "types": ["node"],
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

Update the scripts in `server/package.json`:

```json
"dev": "tsx watch src/index.ts",
"build": "tsc",
"start": "node dist/index.js",
"typecheck": "tsc --noEmit"
```

Imports between your own files keep the `.js` ending, as in the
`student-manager` project (`import { printList } from "./utils.js"`).

### Client

```bash
cd client
npm install -D typescript @types/react @types/react-dom
```

Create `client/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "noEmit": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src", "vite.config.js"]
}
```

Add `"typecheck": "tsc --noEmit"` to the scripts in `client/package.json` and
change the script tag in `index.html` to `/src/main.tsx`.

---

## Part 1: Shared types (about 20 marks)

Create `server/src/types/todo.ts` and `client/src/types/todo.ts` (the same
types in both places is fine for this assignment).

1. `TodoStatus`: a **union of literal types** for `"pending" | "in-progress" | "completed"`.
2. `Priority`: an **enum** with `Low`, `Medium`, `High` (numeric: 0, 1, 2).
3. `Todo`: an **interface** with every field from the table in the README.
   - `_id`, `createdAt` and `updatedAt` are `readonly`.
   - `description` and `dueDate` are optional.
4. `ApiResponse<T>`: a **generic interface** with `success: boolean`, `data: T`
   and an optional `message`.
5. Build these with **utility types** from `Todo`. Do not retype the fields.
   - `CreateTodoInput`: everything except `_id`, `createdAt`, `updatedAt` (`Omit`).
   - `UpdateTodoInput`: any subset of `CreateTodoInput` (`Partial`).
   - `TodoPreview`: only `_id`, `title` and `status` (`Pick`).
6. Use `Readonly<Todo>` somewhere that makes sense (for example the `todo`
   prop passed to `TodoItem`).

## Part 2: Server (about 30 marks)

Rename every file in `server/src` to `.ts` and fix all the errors.

1. **Model:** pass your Todo type as the generic to the Mongoose schema and model
   (`new mongoose.Schema<...>`, `mongoose.model<...>`). Do not add `_id` or the
   timestamp fields yourself; Mongoose provides them.
2. **`AppError`:** give `statusCode` a type. Use `public statusCode: number` in the
   constructor, like `Teacher` in `classes.ts`. Keep `extends Error` and `super(message)`.
3. **`sendResponse`:** make it **generic** (`<T>`). Type `res` as `Response`. It returns `void`.
   The body it sends must match `ApiResponse<T>`.
4. **Controllers:** type `req` and `res` with `Request` and `Response` from
   `express`, and give every handler a return type (`Promise<void>`).
   - Type the request body as `CreateTodoInput` / `UpdateTodoInput`.
   - `req.query.status` is not guaranteed to be a valid status. **Narrow it** with
     `typeof` and a check against the allowed values before building the filter.
5. **`errorHandler`:** type all four parameters (`Request`, `Response`, `NextFunction`,
   and the error as `unknown`). Use **narrowing** (`typeof` and `in`) to work out the status code and message. Return type `void`.
6. **`connectDB`:** give it a `string` parameter. In `index.ts`, handle the
   `MONGO_URI` that may be `undefined` by calling a helper that returns `never`
   when the variable is missing (like `throwError` in `function.ts`).
7. **`catch (error)` blocks:** the error is `unknown`. Narrow it before reading `.message`.

## Part 3: Client (about 35 marks)

Rename every file in `client/src` to `.ts` / `.tsx` and fix all the errors.

1. **`helpers.ts`:**
   - Type every function's parameters and return type.
   - `STATUSES` is an array of `TodoStatus`. `PRIORITY_LABELS` is a `string[]`.
   - `formatDate(date, withTime)` accepts `string | Date`. Keep the default parameter.
   - `getErrorMessage(error)` takes `unknown` and returns `string`, using `typeof` / `in` narrowing.
   - `fail(message)` returns `never`.
2. **`todoApi.ts`:**
   - Type the class property with `private baseUrl: string` in the constructor.
   - Make `request` **generic**: `request<T>(...)` returns `Promise<T>` by reading an
     `ApiResponse<T>`.
   - Give each method its parameter types and a `Promise<...>` return type
     (`getAll` takes an optional status; `create` takes `CreateTodoInput`;
     `update` takes `UpdateTodoInput`; `remove` returns the deleted `Todo`).
3. **Components:** write an `interface` for the props of `TodoForm`, `TodoList`
   and `TodoItem`. Callback props need function types, for example
   `onToggle: (todo: Todo) => void`. `TodoForm`'s `initialTodo` is optional (or `null`).
4. **`App.tsx`:**
   - `useState<Todo[]>([])`, `useState<TodoStatus | "">("")` and
     `useState<Todo | null>(null)`.
   - Type every handler (`handleSubmit`, `handleToggle`, `handleDelete`, `loadTodos`).
     Use `Promise<void>` for the async ones.
   - In `catch`, pass the `unknown` error to `getErrorMessage`.
5. **Event handlers:** type the events (`React.ChangeEvent<HTMLInputElement>`,
   `React.ChangeEvent<HTMLSelectElement>`, `React.FormEvent<HTMLFormElement>`).
   The `<select>` for status gives you a plain `string`; **narrow** it to
   `TodoStatus` instead of forcing it with a type assertion.
6. **Priority:** use your `Priority` enum when the form creates a todo, and when
   `TodoItem` shows the label (hint: numeric enums can be looked up by number).

## Part 4: Stretch goal (optional, about 5 bonus marks)

Using only the allowed topics, create an `abstract class BaseService` with an
`abstract` method and a `private` helper, then make `TodoService`
extend it (see `Shape` and `Rectangle` in `classes.ts`).

---

## Hints

- Fix errors from the bottom of the dependency chain up: types, then utils, then
  API, then components, then `App`.
- Run `npm run typecheck` often. Read the first error, fix it, run again.
- If you are tempted to write `any`, ask: is it a union? Is it `unknown` that I
  should narrow? Is it a generic?
- Hover over variables in VS Code to see the inferred type. Do not annotate what
  TypeScript already infers correctly (for example `const x = 5`).

---

## Submission checklist

- [ ] `npm run typecheck` passes with 0 errors in `server` and `client`
- [ ] `server`: `npm run build` succeeds and `npm start` serves the API
- [ ] `client`: `npm run build` succeeds
- [ ] No `any`, no `@ts-ignore`, no `.js` / `.jsx` files left in `src`
- [ ] The app still does everything it did before
- [ ] A short `NOTES.md` listing: (a) which allowed topic you used in each file,
      (b) one place where you used narrowing, (c) one place where you used a generic,
      (d) any bugs you found in the starter code

## Marking

| Part | Marks |
| ---- | ----- |
| 1. Shared types | 20 |
| 2. Server | 30 |
| 3. Client | 35 |
| Rules, tidy code, `NOTES.md` | 15 |
| **Total** | **100** |
| 4. Stretch (bonus) | +5 |

Marks are deducted for using features outside the allowed topics, even if the
code works.
