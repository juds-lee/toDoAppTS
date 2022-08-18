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

const tasks: Task [] = []

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
    console.log(tasks)
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title);
  item.append(label)
  list?.append(item)
  
}