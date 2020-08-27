/**
 * Weeks TS
 * Injests all of the subcomponent JS here
 */
import initOpener from './opener/Opener';
import initStickyBits from './sticky-bits/StickyBits';
import initPerformers from './performers/Performers';
import initTable from './table/Table';

/**
 * Initialize the Week overarching container and all its possible components
 */
export default function init() {
  initOpener();
  initStickyBits();
  initPerformers();
  initTable();
}
