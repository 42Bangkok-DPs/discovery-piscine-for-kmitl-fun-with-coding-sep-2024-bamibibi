$(document).ready(function() {
    var $listContainer = $('#ft_list');
    var $newButton = $('#newButton');
    
    loadTasks();

    $newButton.on('click', function() {
        var taskText = prompt('Enter new task:');
        if (taskText && taskText.trim() !== '') {
            addTask(taskText);
        }
    });

    function addTask(taskText) {
        var $taskDiv = $('<div>').text(taskText);

        $taskDiv.on('click', function() {
            if (confirm('Do you want to remove this task?')) {
                $taskDiv.remove();
                saveTasks();
            }
        });

        $listContainer.prepend($taskDiv);
        saveTasks();
    }

    function saveTasks() {
        var tasks = [];
        $listContainer.children('div').each(function() {
            tasks.push($(this).text());
        });
        localStorage.setItem('tasks', tasks.join('|'));
    }

    function loadTasks() {
        var tasks = localStorage.getItem('tasks');
        if (tasks) {
            tasks = tasks.split('|');
            $.each(tasks.reverse(), function(index, task) {
                addTask(task);
            });
        }
    }
});
