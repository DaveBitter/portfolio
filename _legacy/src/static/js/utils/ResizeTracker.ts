// Libs
import Observer from './Observer';

/**
 * @module ResizeTracker
 */
class ResizeTracker {
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
     * Handle on resize event
     * @private
     */
    _onResize() {
        if (!this.state.isTicking) {
            window.requestAnimationFrame(() => {
                Observer.publish(this, 'resizeUpdate', window.innerWidth);

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
        window.addEventListener('resize', () => this._onResize());
    }

    /**
     * Initialize
     */
    load() {
        this._addEventListeners();
    }
}

export default new ResizeTracker();
