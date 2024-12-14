import Storage from './Storage';

class Ui {
  static buildTaskHtml(taskToBuild) {
    const div = document.createElement('div');
    div.classList = 'task-card';
    for (const property in taskToBuild) {
      if (property === 'taskId') {
        div.dataset.id = taskToBuild[property];
      } else if (property === 'taskDate') {
        const dateP = document.createElement('p');
        dateP.classList = 'task-card__date';
        const date = new Date(taskToBuild[property]).toLocaleDateString('en-Us', { timeZone: 'UTC' });
        dateP.textContent = `${date}`;
        if (new Date(date) < new Date()) dateP.classList.add('past-due');
        div.appendChild(dateP);
      } else if (property === 'taskDelete') {
        const deleteSpan = document.createElement('span');
        deleteSpan.classList = 'task-card__delete';
        const deleteI = document.createElement('i');
        deleteI.classList = 'fa-solid fa-trash-can';
        deleteSpan.appendChild(deleteI);
        div.appendChild(deleteSpan);
      } else if (property === 'taskName') {
        const nameH1 = document.createElement('h1');
        nameH1.classList = 'task-card__name';
        nameH1.textContent = `${taskToBuild[property]}`;
        div.appendChild(nameH1);
      } else if (property === 'taskStatus') {
        const statusP = document.createElement('p');
        statusP.classList = 'task-card__status';
        const statusSpan = document.createElement('span');
        statusSpan.textContent = 'Status: ';
        const statusText = document.createTextNode(`${taskToBuild[property]} `);
        const statusI = document.createElement('i');
        statusI.classList = 'fa-solid fa-caret-down';
        statusP.appendChild(statusSpan);
        statusP.appendChild(statusText);
        statusP.appendChild(statusI);
        div.appendChild(statusP);
      }
    }
    return div;
  }

  static addTasksToUi() {
    document.querySelector('.tasks').innerHTML = '';
    Storage.getTasksFromLocalStorage();
    if (Storage.tasks.length === 0) {
      document.querySelector('.no-tasks').classList.add('show');
    } else {
      document.querySelector('.no-tasks').classList.remove('show');
      Storage.tasks.forEach(task => {
        const buildTask = this.buildTaskHtml(task);
        document.querySelector('.tasks').appendChild(buildTask);
      });
    }
    document.querySelector('.filter-category').value = 'show all';
  }
}

export default Ui;
