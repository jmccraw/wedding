/**
 * Table TS
 */
const _tableContainers: NodeListOf<Element> = document.querySelectorAll( '.fpi-table__container' );

/**
 * Create the Table class and attach various functionality to each
 */
class Table {
  _el: Element;
  _tables: NodeListOf<Element>;
  index: number;
  timeline: any;

  /**
   * Construct the Table
   * @param {Element} _el The selector for this Table
   * @param {Number} index The index of the Table
   */
  constructor( _el: Element, index: number ) {
    this._el = _el;
    this._tables = _el.querySelectorAll( '.fpi-table' );
    this.index = index;
    this.timeline = window.gsap.timeline( { repeat: 0 } );
  }

  /**
   * Registers the Table animations for each table element
   */
  registerTableAnimation() {
    const self = this;

    self._tables.forEach( ( _table: Element ) => {
      self.timeline.from( _table, 0.25, {
        opacity: 0,
        y: 15
      } );
    } );

    window.ScrollTrigger.create( {
      animation: self.timeline,
      trigger: self._el,
      start: 'top bottom-=100',
      end: 'bottom bottom',
      once: true,
      scrub: false,
      pin: false,
      markers: false,
    } );
  }

  /**
   * Initialize the Table
   */
  init() {
    this.registerTableAnimation();
  }
}

/**
 * Generates all the Table objects
 */
function constructTables() {
  _tableContainers.forEach( ( _table: Element, index: number ) => {
    const table: Table = new Table( _table, index );
    table.init();
  } );
}

/**
 * Initialize the Table functionality
 */
export default function init() {
  constructTables();
}
