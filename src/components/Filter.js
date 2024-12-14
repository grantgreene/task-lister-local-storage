import Storage from './Storage';
import Ui from './Ui';

class Filter {
  constructor() {
    this.searchTasksInput = document.querySelector('.search-tasks-input');
    this.dateSortBtn = document.querySelectorAll('.date-sort');
    this.filterCategorySelect = document.querySelector('.filter-category');
    this.eventListeners();
  }

  searchTasks(e) {
    let searchQuery = this.searchTasksInput.value.toLowerCase();
    this.filterCategorySelect.value = 'show all';
    const taskCards = document.querySelectorAll('.task-card');
    taskCards.forEach(taskCard => {
      if (taskCard.children[1].textContent.toLowerCase().indexOf(searchQuery) === -1 && taskCard.children[0].textContent.toLowerCase().indexOf(searchQuery) === -1) {
        taskCard.style.display = 'none';
      } else {
        taskCard.style.display = 'block';
      }
    });
  }

  sortByDate(e) {
    e.target.classList.contains('date-asc') ? Storage.tasks.sort((a, b) => a.taskDate.localeCompare(b.taskDate)) : Storage.tasks.sort((a, b) => b.taskDate.localeCompare(a.taskDate));
    Storage.saveTasksToLocalStorage();
    Ui.addTasksToUi();
  }

  filterCategories(e) {
    const filterStatus = e.target.value;
    const taskCards = document.querySelectorAll('.task-card');
    taskCards.forEach(taskCard => {
      if (filterStatus === 'show all') {
        taskCard.style.display = 'block';
      } else if (taskCard.children[2].textContent.replace('Status: ', '').trim().toLowerCase() === filterStatus) {
        taskCard.style.display = 'block';
      } else {
        taskCard.style.display = 'none';
      }
    });
  }

  eventListeners() {
    this.searchTasksInput.addEventListener('keyup', this.searchTasks.bind(this));
    this.dateSortBtn.forEach(btn => {
      btn.addEventListener('click', this.sortByDate.bind(this));
    });
    this.filterCategorySelect.addEventListener('change', this.filterCategories.bind(this));
  }
}

export default Filter;
