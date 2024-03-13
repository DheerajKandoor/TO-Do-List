// console.log("Jai Siya Raam");
import render from "./render.js";
import store from "./store.js";
import { addTodo,deleteTodo,toggleCompleted } from "./store.js";

window.addEventListener("todoschange",()=>{
  // console.log("todoschanged fired!!!");
  render();
});

// store.todos.push("item3");
// store.todos=[];

const storeFromLocalStorage =JSON.parse( localStorage.getItem("store"));
// console.log(storeFromLocalStorage);
if( storeFromLocalStorage?.todos.length>0){
 store.todos=storeFromLocalStorage.todos;
}else{
  localStorage.setItem("store",JSON.stringify(store));
  render();
}

// render();
// get form

const form=document.querySelector("#form");
// console.log(form);
const todoTitleInput=document.querySelector(".todo-title-input");

form.addEventListener("submit",(e) => {
  e.preventDefault();
  const todotitle=todoTitleInput.value;
  // console.log(todotitle);
  const newTodo ={id: crypto.randomUUID(), title: todotitle, completed: false}
  // console.log(newTodo);
  addTodo(newTodo);
});
 

const todos=document.querySelector(".todos");
todos.addEventListener("click",(e)=>{
  const target=e.target
  if(target.classList.contains("delete-todo-button")){
    // console.log("clicked cross but");
    const id= target.closest(".todo").dataset.id;
    // console.log(id);
    deleteTodo(id);
  }
//  console.log(e.target); 
});


todos.addEventListener("change",(e)=>{
  // console.log(e.target);
  const target=e.target;
  if(target.classList.contains("todo-checkbox")){
    const id= target.closest(".todo").dataset.id;
    const completed=target.checked;
    toggleCompleted(id,completed)
    // console.log(target.checked);
    // console.log(id);
  }
});