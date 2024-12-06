export class TableSelection {
  constructor() {
    this.group = [];
  }

  select($el) {
    if ($el.isAttribute('data-id')) {
      this.group.forEach(($cell) => {
        $cell.removeClass('selected');
      })
      this.group.splice(0, this.group.length);
      this.group.push($el);
      $el.addClass('selected');
    }
  }

  selectGroup() {

  }
}
