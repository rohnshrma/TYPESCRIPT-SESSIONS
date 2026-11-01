// Talks to the Express API. Every response looks like { success, data, message? }
class TodoService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(path = "", options = {}) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    const json = await res.json();

    if (!json.success) {
      throw new Error(json.message || "Request failed");
    }
    return json.data;
  }

  getAll(status) {
    const query = status ? `?status=${status}` : "";
    return this.request(query);
  }

  getById(id) {
    return this.request(`/${id}`);
  }

  create(todo) {
    return this.request("", { method: "POST", body: JSON.stringify(todo) });
  }

  update(id, changes) {
    return this.request(`/${id}`, { method: "PUT", body: JSON.stringify(changes) });
  }

  remove(id) {
    return this.request(`/${id}`, { method: "DELETE" });
  }
}

export const todoService = new TodoService("/api/todos");
