// Libs
import Observer from './Observer';

/**
 * @module ScrollTracker
 */
class ScrollTracker {
    /**
     * Class constructor
     */
    constructor() {
        if (typeof window !== 'undefined') {
            this.load();
        }
    }

    state = {
        isTicking: false
    };

    /**
     * Handle on scroll event
     * @private
     */
    _onScroll() {
        if (!this.state.isTicking) {
            window.requestAnimationFrame(() => {
                Observer.publish(this, 'scrollUpdate', window.scrollY || window.pageYOffset);

                this.state.isTicking = false;
            });
        }

        this.state.isTicking = true;
    }

    /**
     * Bind event listeners
     * @private
     */
    _addEventListeners() {
        window.addEventListener('scroll', () => this._onScroll());
    }

    /**
     * Initialize
     */
    load() {
        this._addEventListeners();
    }
}

export default new ScrollTracker();
