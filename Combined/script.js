
/************************** Local Variables ***************************/

const quadrant1 = document.getElementById('quadrant1');
const quadrant2 = document.getElementById('quadrant2');
const quadrant3 = document.getElementById('quadrant3');
const quadrant4 = document.getElementById('quadrant4');

// Load tasks from LocalStorage
const todaysTasks = JSON.parse(localStorage.getItem('todaysTasks')) || [];
const allTasksQuadrant1 = JSON.parse(localStorage.getItem('allTasksQuadrant1')) || [];
const allTasksQuadrant2 = JSON.parse(localStorage.getItem('allTasksQuadrant2')) || [];
const allTasksQuadrant3 = JSON.parse(localStorage.getItem('allTasksQuadrant3')) || [];
const allTasksQuadrant4 = JSON.parse(localStorage.getItem('allTasksQuadrant4')) || [];
const archivedTasksQuadrant1 = JSON.parse(localStorage.getItem('archivedTasksQuadrant1')) || [];
const archivedTasksQuadrant2 = JSON.parse(localStorage.getItem('archivedTasksQuadrant2')) || [];
const archivedTasksQuadrant3 = JSON.parse(localStorage.getItem('archivedTasksQuadrant3')) || [];
const archivedTasksQuadrant4 = JSON.parse(localStorage.getItem('archivedTasksQuadrant4')) || [];
const colorMode = JSON.parse(localStorage.getItem('colorMode')) || [];

const views = [
    [allTasksQuadrant1, allTasksQuadrant2, allTasksQuadrant3, allTasksQuadrant4],
    [todaysTasks],
    [archivedTasksQuadrant1, archivedTasksQuadrant2, archivedTasksQuadrant3, archivedTasksQuadrant4]
]
var viewController = 0;

/*********************** Initial Function calls ***********************/

displayTasks();
// selectAllLi();

/************************** PreprocessInput ***************************/

function preprocessInput() {

    // Take input
    let newTask = userInput.value;

    // Split Input
    let validateTask = newTask.split(";");

    // Validate Input
    var len = validateTask.length;
    if (len != 4) {
        if (len < 4) {
            len = 4 - len;
            if (len == 1) {
                alert("1 missing semicolon \n\nEnter the Task, Deadline, Schedule and Impact seperated by semicolons ( ; ) \n\n>>> Task ; Deadline ; Schedule ; Impact");
            }
            else {
                alert(len + " missing semicolons \n\nEnter the Task, Deadline, Schedule and Impact seperated by semicolons ( ; ) \n\n>>> Task ; Deadline ; Schedule ; Impact");}
        }
        else {
            len = len - 4;
            if (len == 1) {
                alert("1 extra semicolon \n\nEnter the Task, Deadline, Schedule and Impact seperated by semicolons ( ; ) \n\n>>> Task ; Deadline ; Schedule ; Impact");
            }
            else {
                alert(len + " extra semicolons \n\nEnter the Task, Deadline, Schedule and Impact seperated by semicolons ( ; ) \n\n>>> Task ; Deadline ; Schedule ; Impact");
            }
        }
    }
    else {

        // Trim Whitespace
        var i = 0;
        for (; i < 4; i++) {
            validateTask[i] = validateTask[i].trim();
        }

        // Validate Task
        if (validateTask[0] == "") {
            alert("Can't add an empty task. \nEnter a task.");
        }
        else {

            // Validate Deadline
            // if (validateDate(validateTask[1])) {
            //     alert("Please correct the format of DEADLINE");
            // }
            // else {

                // Validate Schedule
                // if (validateDate(validateTask[2])) {
                //     alert("Please correct the format of SCHEDULE");
                // }
                // else {

                    // Validate Impact
                    if (validateTask[3] != "/" && validateTask[3] != "") {
                        alert("For tasks with Long-term Impact \n>>> Enter / \n\nFor tasks with No Long-term Impact \n>>> Leave it empty");
                    }
                    else {

                        // Concatinate Validated Task
                        let validTask = "";
                        var i = 0;
                        validTask = validTask.concat(" ", validateTask[i]).trim();
                        i++;
                        for (; i < 4; i++) {
                            validTask = validTask.concat(";", validateTask[i]);
                        }

                        // Deadline
                        if (validateTask[1] != "") {
                            // Long-term Impact
                            if (validateTask[3] == "/") {
                                views[viewController][0].push(validTask);
                            }
                            // No Long-term Impact
                            else {
                                views[viewController][2].push(validTask);
                            }
                        }
                        // No Deadline
                        else {
                            // Long-term Impact
                            if (validateTask[3] == "/") {
                                views[viewController][1].push(validTask);
                            }
                            // No Long-term Impact
                            else {
                                views[viewController][3](validTask); 
                            }
                        }

                        saveTasks();
                        displayTasks();
                        userInput.value = '';
                    }

                // }
            // }
        }
    }
}

/*
function validateDate(x) {
    // Month
    let month = x.toLowerCase();
    switch(month) {
        case "":
        case "01":
        case "1":
            alert("uary");
            break;

        case "feb":
        case "02":
        case "2":
            alert("February");
            break;

        case "mar":
        case "03":
        case "3":
            alert("March");
            break;
        
        case "apr":
        case "04":
        case "4":
            alert("April");
            break;

        case "may":
        case "05":
        case "5":
            alert("May");
            break;

        case "jun":
        case "06":
        case "6":
            alert("June");
            break;

        case "jul":
        case "07":
        case "7":
            alert("July");
            break;

        case "aug":
        case "08":
        case "8":
            alert("August");
            break;

        case "sep":
        case "09":
        case "9":
            alert("September");
            break;

        case "oct":
        case "10":
            alert("October");
            break;

        case "nov":
        case "11":
            alert("November");
            break;

        case "dec":
        case "12":
            alert("December");
            break;

        default:
            alert("Not found");
    }
}
*/

/**************************** DisplayAllTasks ****************************/

function displayTasks() {

    // Delete all existing 'li'
    [quadrant1, quadrant2, quadrant3, quadrant4].forEach(q => q.innerHTML = '');

    let quadrants = views[viewController];
    
    for (var i = 0; i < 4; i++) {
        for (var j = 0, len = quadrants[i].length; j < len; j++) {

            // Split input into elements of array
            let splitTask = quadrants[i][j].split(";");

            // Index
            let index = j;

            // Identify quadrant
            let quadrant = i == 0 ? quadrant1 : i == 1 ? quadrant2 : i == 2 ? quadrant3 : quadrant4;

            // CreateElement - li - listitem
            const listItem = document.createElement('li');
            listItem.className = 'taskbox';
            quadrant.appendChild(listItem);
            
            // CreateElement - div - divDeadline
            if (splitTask[1] != "") {
                const divDeadline = document.createElement('div');
                divDeadline.textContent = splitTask[1];
                divDeadline.className = 'deadline-and-schedule';
                listItem.appendChild(divDeadline);
            }
            
            // CreateElement - div - divSchedule
            const divSchedule = document.createElement('div');
            divSchedule.textContent = splitTask[2];
            divSchedule.className = 'deadline-and-schedule';
            listItem.appendChild(divSchedule);
            
            // CreateElement - div - divTask
            const divTask = document.createElement('div');
            divTask.textContent = splitTask[0];
            divTask.className = 'task';
            listItem.appendChild(divTask);

            // CreateElement - div - divUpdate
            const divUpdate = document.createElement('div');
            divUpdate.className = 'update';
            listItem.appendChild(divUpdate);

            // CreateElement - button - todayButton
            const todayButton = document.createElement('button');
            todayButton.textContent = 'T';
            todayButton.className = 'update-buttons';
            todayButton.addEventListener('click', () => {
                var i = quadrant == quadrant1 ? views[viewController][0] : quadrant == quadrant2 ? views[viewController][1] : quadrant == quadrant3 ? views[viewController][2] : views[viewController][3];
                todaysTasks.push(i[index]);
                i.splice(index, 1);
                saveTasks();
                displayTasks();
            })
            divUpdate.appendChild(todayButton);

            // CreateElement - button - archiveButton
            const archiveButton = document.createElement('button');
            archiveButton.textContent = 'A';
            archiveButton.className = 'update-buttons';
            archiveButton.addEventListener('click', () => {
                var i = quadrant == quadrant1 ? views[viewController][0] : quadrant == quadrant2 ? views[viewController][1] : quadrant == quadrant3 ? views[viewController][2] : views[viewController][3];
                if (viewController == 0) {
                    var j = quadrant == quadrant1 ? views[2][0] : quadrant == quadrant2 ? views[2][1] : quadrant == quadrant3 ? views[2][2] : views[2][3];
                }
                else if (viewController == 2) {
                    var j = quadrant == quadrant1 ? views[0][0] : quadrant == quadrant2 ? views[0][1] : quadrant == quadrant3 ? views[0][2] : views[0][3];
                }
                j.push(i[index]);
                i.splice(index, 1);
                saveTasks();
                displayTasks();
            })
            divUpdate.appendChild(archiveButton);

            // CreateElement - button - editButton
            const editButton = document.createElement('button');
            editButton.textContent = 'E';
            editButton.className = 'update-buttons';
            editButton.addEventListener('click', () => {
                var i = quadrant == quadrant1 ? views[viewController][0] : quadrant == quadrant2 ? views[viewController][1] : quadrant == quadrant3 ? views[viewController][2] : views[viewController][3];
                userInput.value = i[index];
                userInput.focus();
                i.splice(index, 1);
                saveTasks();
                displayTasks();
            })
            divUpdate.appendChild(editButton);

            // CreateElement - button - deleteButton
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.className = 'update-buttons';
            deleteButton.addEventListener("click", () => {
                var i = quadrant == quadrant1 ? views[viewController][0] : quadrant == quadrant2 ? views[viewController][1] : quadrant == quadrant3 ? views[viewController][2] : views[viewController][3];
                i.splice(index, 1);
                saveTasks();
                displayTasks();
            });
            divUpdate.appendChild(deleteButton);
        }
    }
}

/**************************** LocalStorage ****************************/

function saveTasks() {
    localStorage.setItem('todaysTasks', JSON.stringify(todaysTasks));
    localStorage.setItem('allTasksQuadrant1', JSON.stringify(allTasksQuadrant1));
    localStorage.setItem('allTasksQuadrant2', JSON.stringify(allTasksQuadrant2));
    localStorage.setItem('allTasksQuadrant3', JSON.stringify(allTasksQuadrant3));
    localStorage.setItem('allTasksQuadrant4', JSON.stringify(allTasksQuadrant4));
    localStorage.setItem('archivedTasksQuadrant1', JSON.stringify(archivedTasksQuadrant1));
    localStorage.setItem('archivedTasksQuadrant2', JSON.stringify(archivedTasksQuadrant2));
    localStorage.setItem('archivedTasksQuadrant3', JSON.stringify(archivedTasksQuadrant3));
    localStorage.setItem('archivedTasksQuadrant4', JSON.stringify(archivedTasksQuadrant4));
}

/**************************** Drag & Drop *****************************/

/*
let draggedItem = null;

function selectAllLi() {

    const allListItems = document.querySelectorAll('li');

    allListItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
    });
}

function handleDragStart(e) {
    draggedItem = this;
    setTimeout(() => this.classList.add('dragging'), 0);
}

function handleDragOver(e) {
    e.preventDefault();
    
    const hoveringItem = this;
    const list = this.parentElement;
    const draggingItem = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(list, e.clientY);
    
    if (afterElement == null) {
        list.appendChild(draggingItem);
    } else {
        list.insertBefore(draggingItem, afterElement);
    }
}

function handleDrop() {
    this.classList.remove('dragging');
}

function handleDragEnd() {
    this.classList.remove('dragging');
    
    // Save tasks after drag ends
    saveTasks();
    displayTasks();
}

function getDragAfterElement(list, y) {
    const draggableElements = [...list.querySelectorAll('li:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    },
    { offset: Number.NEGATIVE_INFINITY }
    ).element;
}

*/

/******************************* Views ********************************/

function viewAll() {
    viewController = 0;
    displayTasks();
}

function viewTdy() {
    alert("Work in progress");
}

function viewArc() {
    viewController = 2;
    displayTasks();
}

/**************************** Color Modes *****************************/

if (colorMode[0]) {
    darkMode();
}
else {
    lightMode();
}

function darkMode() {

    document.getElementById('darkMode').style.display = 'none';
    document.getElementById('lightMode').style.display = 'block';

    document.querySelector(':root').style.setProperty('--color-font', 'hsl(0, 0%, 100%)');
    document.querySelector(':root').style.setProperty('--color-border', 'hsl(0, 0%, 25%)');
    document.querySelector(':root').style.setProperty('--color-background-main', 'hsl(0, 0%, 0%)');
    document.querySelector(':root').style.setProperty('--color-background-list', 'hsl(0, 0%, 10%)');

    colorMode[0] = true;
    localStorage.setItem('colorMode', JSON.stringify(colorMode));

}

function lightMode() {

    document.getElementById('lightMode').style.display = 'none';
    document.getElementById('darkMode').style.display = 'block';

    document.querySelector(':root').style.setProperty('--color-font', 'hsl(0, 0%, 0%)');
    document.querySelector(':root').style.setProperty('--color-border', 'hsl(0, 0%, 85%)');
    document.querySelector(':root').style.setProperty('--color-background-main', 'hsl(0, 0%, 95%)');
    document.querySelector(':root').style.setProperty('--color-background-list', 'hsl(0, 0%, 100%)');

    colorMode[0] = false;
    localStorage.setItem('colorMode', JSON.stringify(colorMode));

}

/******************************* Clock ********************************/

setInterval(() => {

    let today = new Date();

    // let yearRN = today.getFullYear();
    switch(today.getMonth()) {
        case 0:
            monthRN = "JAN";
            break;
        case 1:
            monthRN = "FEB";
            break;
        case 2:
            monthRN = "MAR";
            break;
        case 3:
            monthRN = "APR";
            break;
        case 4:
            monthRN = "MAY";
            break;
        case 5:
            monthRN = "JUN";
            break;
        case 6:
            monthRN = "JUL";
            break;
        case 7:
            monthRN = "AUG";
            break;
        case 8:
            monthRN = "SEP";
            break;
        case 9:
            monthRN = "OCT";
            break;
        case 10:
            monthRN = "NOV";
            break;
        case 11:
            monthRN = "DEC";
            break;
    }
    // let dayRN = today().getDay();
    let dateRN = today.getDate();
    let meridiemRN = "AM";
    let hourRN = today.getHours();
    switch(hourRN) {
        case 0:
            hourRN = "12";
            break;
        case 12:
            meridiemRN = "PM";
            break;
        case 13:
            hourRN = "1";
            meridiemRN = "PM";
            break;
        case 14:
            hourRN = "2";
            meridiemRN = "PM";
            break;
        case 15:
            hourRN = "3";
            meridiemRN = "PM";
            break;
        case 16:
            hourRN = "4";
            meridiemRN = "PM";
            break;
        case 17:
            hourRN = "5";
            meridiemRN = "PM";
            break;
        case 18:
            hourRN = "6";
            meridiemRN = "PM";
            break;
        case 19:
            hourRN = "7";
            meridiemRN = "PM";
            break;
        case 20:
            hourRN = "8";
            meridiemRN = "PM";
            break;
        case 21:
            hourRN = "9";
            meridiemRN = "PM";
            break;
        case 22:
            hourRN = "10";
            meridiemRN = "PM";
            break;
        case 23:
            hourRN = "11";
            meridiemRN = "PM";
            break;
    }
    let minutesRN = today.getMinutes();
    switch (minutesRN) {
        case 0:
            minutesRN = "00";
            break;
        case 1:
            minutesRN = "01";
            break;
        case 2:
            minutesRN = "02";
            break;
        case 3:
            minutesRN = "03";
            break;
        case 4:
            minutesRN = "04";
            break;
        case 5:
            minutesRN = "05";
            break;
        case 6:
            minutesRN = "06";
            break;
        case 7:
            minutesRN = "07";
            break;
        case 8:
            minutesRN = "08";
            break;
        case 9:
            minutesRN = "09";
            break;
    }
    // let secondsRN = today.getSeconds();
    
    document.getElementById('week').textContent = "W?";
    document.getElementById('date').textContent = monthRN + " " + dateRN;
    document.getElementById('time').textContent = hourRN + ":" + minutesRN + " " + meridiemRN;

}, 1000);