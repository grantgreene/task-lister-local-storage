import Storage from './Storage';
import Ui from './Ui';

class Tasklist {
  constructor() {
    this.taskBoard = document.querySelector('.tasks');
    this.editTaskId;
    this.eventListeners();
  }

  deleteTask(e) {
    if (e.target.classList.contains('fa-trash-can')) {
      const deleteId = parseInt(e.target.parentElement.parentElement.dataset.id);
      Storage.tasks.splice(Storage.tasks.map(task => task.taskId).indexOf(deleteId), 1);
      Storage.saveTasksToLocalStorage();
      Ui.addTasksToUi();
    }
  }

  editTaskStatus(e) {
    if (e.target.classList.contains('task-card__status')) {
      this.editTaskId = parseInt(e.target.parentElement.dataset.id);
      document.dispatchEvent(new Event('openOverlayEvent'));
    }
    document.querySelectorAll('.update-status-box__option').forEach(option => {
      option.addEventListener('click', e => {
        let newStatus = e.target.textContent;
        let taskToEdit = Storage.tasks.filter(task => task.taskId === this.editTaskId)[0];
        taskToEdit.taskStatus = newStatus;
        Storage.tasks.splice(Storage.tasks.map(task => task.taskId).indexOf(this.editTaskId), 1, taskToEdit);
        Storage.saveTasksToLocalStorage();
        Ui.addTasksToUi();
        document.dispatchEvent(new Event('closeOverlayEvent'));
      });
    });
  }

  eventListeners() {
    this.taskBoard.addEventListener('click', this.deleteTask);
    this.taskBoard.addEventListener('click', this.editTaskStatus);
  }
}

export default Tasklist;
