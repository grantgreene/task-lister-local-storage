import Storage from './Storage';
import Ui from './Ui';

class Header {
  constructor() {
    this.addNewMobileBtn = document.querySelector('.top-pane__btn');
    this.addTaskPane = document.querySelector('.add-task-pane');
    this.addNewTaskBtn = document.querySelector('.add-task-pane__btn');
    this.addTaskNameInput = document.querySelector('.add-task-pane__name-input');
    this.addTaskDateInput = document.querySelector('.add-task-pane__date-input');
    this.alertNotification = document.querySelector('.alert');
    this.addEventListeners();
  }

  toggleMobileDropdown() {
    this.addTaskPane.classList.toggle('open');
    this.addTaskPane.classList.contains('open') ? (this.addNewMobileBtn.textContent = 'x') && (this.addNewMobileBtn.style.backgroundColor = 'var(--c-red)') : (this.addNewMobileBtn.textContent = '+') && (this.addNewMobileBtn.style.backgroundColor = 'var(--c-green');
  }

  showAlert(alertText) {
    this.alertNotification.classList.add('show');
    this.alertNotification.children[0].textContent = `${alertText}`;
    setTimeout(() => {
      this.alertNotification.classList.remove('show');
    }, 3000);
  }

  addNewTask() {
    let taskName = this.addTaskNameInput.value;
    let taskDate = this.addTaskDateInput.value;
    let taskId;
    if (taskName === '' && taskDate === '') {
      this.showAlert('Please enter a task name and task date');
      return;
    } else if (taskName === '') {
      this.showAlert('Please enter a task name');
      return;
    } else if (taskDate === '') {
      this.showAlert('Please enter a task date');
      return;
    }
    Storage.tasks.length === 0 ? (taskId = 1) : (taskId = Storage.tasks[Storage.tasks.length - 1].taskId + 1);
    const newTask = { taskId, taskDate, taskName, taskStatus: 'To-Do', taskDelete: false };
    Storage.tasks.push(newTask);
    Storage.saveTasksToLocalStorage();
    Ui.addTasksToUi();
    this.addTaskNameInput.value = '';
    this.addTaskDateInput.value = '';
    this.toggleMobileDropdown();
  }

  addEventListeners() {
    this.addNewMobileBtn.addEventListener('click', this.toggleMobileDropdown.bind(this));
    this.addNewTaskBtn.addEventListener('click', this.addNewTask.bind(this));
  }
}

export default Header;
