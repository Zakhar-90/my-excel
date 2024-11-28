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
    const type = event.target.dataset.resize;

    if (type) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const cells = type === 'col' ? this.$root.findAll(
          `[data-col="${$parent.data.col}"]`
      ) : null;

      document.onmousemove = (e) => {
        if (type === 'col') {
          const delta = e.pageX - coords.right;
          const value = coords.width + delta;

          $parent.$el.style.width = `${value}px`;

          cells.forEach((cell) => {
            cell.style.width = `${value}px`;
            cell.style.borderRight = '2px solid #3c74ff';
          });
        } else {
          const delta = e.pageY - coords.bottom;
          const value = coords.height + delta;

          $parent.$el.style.height = `${value}px`
          $parent.css = {
            height: `${value}px`
          }
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null;

        cells && cells.forEach((cell) => {
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
