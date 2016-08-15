var _tasks = [
  {
    id: 1,
    name: "my first task",
    completed: false,
    timeDateCreation: new Date("01/01/2000"),
    timeDateCompletion: undefined
  },
  {
    id: 2,
    name: "another task",
    completed: false,
    timeDateCreation: new Date("01/01/2001"),
    timeDateCompletion: undefined
  },
  {
    id: 3,
    name: "and another task one more time",
    completed: false,
    timeDateCreation: new Date("01/01/2002"),
    timeDateCompletion: undefined
  }
];
var counter = 100;

exports.push = function( param ){
  _tasks.push( param );
};

function taskLog (){
  console.log('-------------------------\n');
  console.log(_tasks);
}

exports.delTask = function( id ){
  console.log("delTask: " + id );
  taskLog();
  _tasks = _tasks.filter(function ( el ){
    return parseInt(el.id,10) !== parseInt(id, 10);
  } );
  taskLog();
};

exports.markCompleted = function( id ){
  console.log( Date.now() );
  for (let item in _tasks){
    if (parseInt(_tasks[item].id,10) === parseInt(id,10) ) {
      _tasks[item].completed = true;
      _tasks[item].timeDateCompletion = new Date(Date.now());
    }
  }
  taskLog();
};

exports.markAllCompleted = function( ){
  for (let item in _tasks){
    _tasks[item].completed = true;
    _tasks[item].timeDateCompletion = Date.now();
  }
  taskLog();
};

exports.getIncompleted = function(){
  console.log("getAllCompleted: " + _tasks);
  var tasksCompleted = _tasks.filter(function ( el ){
    return el.completed === false;
  });
  return tasksCompleted;
};

exports.getAllCompleted = function(){
  console.log("getAllCompleted: " + _tasks);
  var tasksCompleted = _tasks.filter(function ( el ){
    return el.completed;
  });
  return tasksCompleted;
};


exports.tasks = _tasks;
exports.counter = counter;

