import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const nameColumn = $resizer.$el.dataset.column;
      const listCellColumn = document.querySelectorAll(
          `[data-name-column="${nameColumn}"]`
      );

      document.onmousemove = (e) => {
        const delta = e.pageX - coords.right;
        const value = `${coords.width + delta}px`;

        $parent.$el.style.width = value;

        listCellColumn.forEach((cell) => {
          cell.style.width = value;
          cell.style.borderRight = '2px solid #3c74ff';
        });
      }

      document.onmouseup = () => {
        document.onmousemove = null;

        listCellColumn.forEach((cell) => {
          cell.style.borderRight = null;
        });
      }
    }
  }
}
