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
    const vector = event.target.dataset.resize;
    console.log(vector);
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const cells = this.$root.findAll(
          `[data-col="${$parent.data.col}"]`
      );

      document.onmousemove = (e) => {
        const delta = e.pageX - coords.right;
        const value = coords.width + delta;

        $parent.$el.style.width = `${value}px`;

        cells.forEach((cell) => {
          cell.style.width = `${value}px`;
          cell.style.borderRight = '2px solid #3c74ff';
        });
      }

      document.onmouseup = () => {
        document.onmousemove = null;

        cells.forEach((cell) => {
          cell.style.borderRight = null;
        });
      }
    }
  }
}

// 53 ms  Scripting
// 678 ms  Rendering
// 315 ms  Painting
// 196 ms  System
// 4149 ms  Idle
// 5392 ms  Total
