import Ui from './components/Ui';
import Header from './components/Header';
import Filter from './components/Filter';
import Tasklist from './components/TaskList';
import Overlay from './components/Overlay';

new Ui();
Ui.addTasksToUi();
new Header();
new Filter();
new Tasklist();
new Overlay();
