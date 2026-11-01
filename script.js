const STORAGE_KEY = "hello-github-tasks-v1";
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const progress = document.querySelector("#progress");
const remaining = document.querySelector("#remaining");
const clearCompleted = document.querySelector("#clear-completed");
const filterButtons = [...document.querySelectorAll(".filter")];

let tasks = loadTasks();
let currentFilter = "all";

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter(task => task && typeof task.id === "string" && typeof task.text === "string" && typeof task.done === "boolean");
  } catch {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // 浏览器禁用本地存储时，清单仍可在当前页面使用。
  }
}

function render() {
  const visible = tasks.filter(task =>
    currentFilter === "all" || (currentFilter === "active" ? !task.done : task.done)
  );
  list.replaceChildren();

  for (const task of visible) {
    const item = document.createElement("li");
    item.className = `task-item${task.done ? " is-complete" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", `完成：${task.text}`);
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      render();
    });

    const label = document.createElement("span");
    label.className = "task-text";
    label.textContent = task.text;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete-button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `删除：${task.text}`);
    remove.addEventListener("click", () => {
      tasks = tasks.filter(entry => entry.id !== task.id);
      saveTasks();
      render();
    });

    item.append(checkbox, label, remove);
    list.append(item);
  }

  const completedCount = tasks.filter(task => task.done).length;
  progress.textContent = `${completedCount} / ${tasks.length} 已完成`;
  remaining.textContent = `还剩 ${tasks.length - completedCount} 件待办`;
  clearCompleted.disabled = completedCount === 0;
  emptyState.hidden = visible.length > 0;
  if (visible.length === 0) {
    emptyState.textContent = tasks.length === 0
      ? "这里还没有待办。添加第一件小事吧！"
      : "当前筛选下没有待办。";
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.unshift({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text, done: false });
  input.value = "";
  currentFilter = "all";
  filterButtons.forEach(button => {
    const active = button.dataset.filter === currentFilter;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  saveTasks();
  render();
  input.focus();
});

filterButtons.forEach(button => button.addEventListener("click", () => {
  currentFilter = button.dataset.filter;
  filterButtons.forEach(other => {
    const active = other === button;
    other.classList.toggle("is-active", active);
    other.setAttribute("aria-pressed", String(active));
  });
  render();
}));

clearCompleted.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.done);
  saveTasks();
  render();
});

render();
