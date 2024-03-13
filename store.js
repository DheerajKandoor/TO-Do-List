const store={
todos:[
{
"id":"1",
"title":"Solve Linked list problems",
"completed":false

},
{
  "id":"2",
"title":"Computer Networks theory ",
"completed":true
},

],
};

const storeHandler = {
  get(target, property){
    // console.log("trying get", property);
    return target[property];
  },
  set(target, property, value){
    // console.log(target,property,value);
    // console.log("Trying to set",property);
    target[property]=value;

if(property=="todos"){
  window.dispatchEvent(new Event("todoschange"));
  

}
localStorage.setItem("store",JSON.stringify(store));
    return true;
  },

};


const storeProxy = new Proxy(store, storeHandler)

function addTodo(newTodo){
  storeProxy.todos=[...storeProxy.todos,newTodo]
}

function deleteTodo(id){
  storeProxy.todos=storeProxy.todos.filter(todo =>todo.id !==id)
}

function toggleCompleted(id, completed) {
  storeProxy.todos=storeProxy.todos.map(todo =>{
    if(todo.id ===id){
      return {...todo, completed: completed}
    }else{
      return todo;
    }
  })
  }

export{addTodo, deleteTodo, toggleCompleted};
export default storeProxy;
