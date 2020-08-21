import initStickyBits from './sticky-bits/StickyBits';
import initPerformers from './performers/Performers';

/**
 * Initialize the Week overarching container and all its possible components
 */
export default function init() {
  initStickyBits();
  initPerformers();
}
