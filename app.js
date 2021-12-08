function deleteTask(event){
    console.log(event.target);
    element = document.getElementById("div_"+event.target.id);
    fetch('http://127.0.0.1:3000/api/task/remove/'+event.target.id, {
        method:"DELETE"
    })
    .then(response => {
        return response.json();
    })
    .then(tasks => {
        refreshDivTasks();
    })
}

function refreshDivTasks(){
    var taskContainer = document.getElementById("taskContainer");
    divHtml = "";
    fetch('http://127.0.0.1:3000/api/task').then(response => {
    return response.json();
    }).then(projects => {
        
        projects.forEach(element => {
            divHtml += "<div class='container mb-3' id='div_" + element._id + "'><div class='col-md-12 col-12 col-sm-12'> <div class='card'> <div class='card-header' > <h4> <button class='btn btn-info' id='" + element._id + "' onclick ='deleteTask(event)' > <i id='" + element._id + "' class='fa fa-trash' aria-hidden='true'> </i></button> " + element.title + " </h4></div > <div class='card-body'>" + element.title + "</div></div> </div> </div>"
            taskContainer.innerHTML = divHtml; 
        });
    });
}