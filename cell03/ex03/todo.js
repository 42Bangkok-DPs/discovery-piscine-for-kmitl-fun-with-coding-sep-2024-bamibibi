document.addEventListener('DOMContentLoaded', function() {
    var listContainer = document.getElementById('ft_list');
    var newButton = document.getElementById('newButton');
    
    // Load tasks from localStorage
    loadTasks();

    // Add event listener for the New button
    newButton.addEventListener('click', function() {
        var taskText = prompt('Enter new task:');
        if (taskText && taskText.trim() !== '') {
            addTask(taskText);
        }
    });

    function addTask(taskText) {
        // Create a new task div
        var taskDiv = document.createElement('div');
        taskDiv.textContent = taskText;
        
        // Add click event to remove the task
        taskDiv.addEventListener('click', function() {
            if (confirm('Do you want to remove this task?')) {
                taskDiv.remove();
                saveTasks();
            }
        });

        // Insert new task at the top
        listContainer.insertBefore(taskDiv, listContainer.firstChild);

        // Save tasks to localStorage
        saveTasks();
    }

    function saveTasks() {
        var tasks = [];
        var taskDivs = listContainer.getElementsByTagName('div');
        for (var i = taskDivs.length-1; i >= 0; i--) {
            tasks.push(taskDivs[i].textContent);
        }
        localStorage.setItem('tasks', tasks.join('|'));
    }

    function loadTasks() {
        var tasks = localStorage.getItem('tasks');
        if (tasks) {
            tasks = tasks.split('|');
            for (var i = 0; i < tasks.length; i++) {
                addTask(tasks[i]);
            }
        }
    }
});
