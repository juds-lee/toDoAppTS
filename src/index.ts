import { v4 as uuidV4} from "uuid"

type Task = {
  id: string, 
  title: string, 
  completed: boolean, 
  createdOn: Date 
}

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("newTaskForm") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#newTaskTitle");

const tasks: Task [] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
  e.preventDefault()
  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdOn: new Date()
  }
  tasks.push(newTask)
  addListItem(newTask)
  input.value = ""
})

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks();
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title);
  item.append(label)
  list?.append(item)

}

function saveTasks () {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks() : Task[] {
  const taskJson = localStorage.getItem("TASKS")
  if (taskJson == null) return [] 
 return JSON.parse(taskJson)
}