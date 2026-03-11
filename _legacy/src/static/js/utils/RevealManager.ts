// Libs
import Observer from '../utils/Observer';
import ScrollTracker from '../utils/ScrollTracker';
import ResizeTracker from '../utils/ResizeTracker';
import { inViewport } from '../utils/InViewport';

/**
 * @NOTE:
 * The reveal manager gets all elements that have the 'data-in-view' attribute and reveals them
 * with a default animation as soon as they are in the viewport. If the 'data-reveal-animation'
 * attribute is present it will use the provided animation.
*/

/**
* @module RevealManager
*/
class RevealManager {
    /**
     * Class constructor
     */
    constructor() {
        this._resetElemInView = this._resetElemInView.bind(this);
    }

    _defaults = {
        delay: 200
    }

    _constants = {
        DATA_REDUCE_ALL_MOTION: 'data-reduce-all-motion',
        DATA_REVEAL_ANIMATION: 'data-reveal-animation',
        DATA_REVEAL_IN_VIEW: 'data-reveal-in-view',
        DATA_IN_VIEW: 'data-in-view'
    }

    _elementsToReveal = []

    _body: HTMLBodyElement

    /**
     * @private
     */
    _addEventListeners() {
        Observer.subscribe(ScrollTracker, 'scrollUpdate', () => this._revealElementsInViewport());
        Observer.subscribe(ResizeTracker, 'resizeUpdate', () => this._revealElementsInViewport());
    }

    /**
     * @param {Object} e - The animation event
     * @private
     */
    _resetElemInView(e: any) {
        /**
         * @NOTE: Removing CSS properties such as opacity and transform
         * @NOTE: prevent z stacking issues on children elements.
         * @NOTE: Also, keeps the DOM looking clean.
         */
        e.target.removeAttribute(this._constants.DATA_IN_VIEW);
        e.target.removeAttribute(this._constants.DATA_REVEAL_ANIMATION);

        e.target.removeEventListener('animationend', this._resetElemInView, false);
    }

    /**
     * @param {object} element Element to be revealed
     */
    _revealElement(element: any) {
        element.removeAttribute(this._constants.DATA_REVEAL_IN_VIEW);
        element.setAttribute(this._constants.DATA_IN_VIEW, '');

        element.addEventListener('animationend', this._resetElemInView, false);
    }

    /**
     * @private
     */
    _revealElementsAboveViewport() {
        const indexTopInViewport = this._elementsToReveal.findIndex(element => inViewport(element, 0, 1, 0.8));
        const elementsBeforeViewport = this._elementsToReveal.slice(0, indexTopInViewport);

        elementsBeforeViewport.forEach((element: any) => {
            this._elementsToReveal = this._elementsToReveal.filter(_element => _element !== element);
            this._revealElement(element);
        });
    }

    /**
     * @param {*} elements Elements to be revealed in a staggered way
     */
    _revealElementsStaggered(elements: any) {
        elements.forEach((element: any, index: number) => {
            this._elementsToReveal = this._elementsToReveal.filter(_element => _element !== element);

            setTimeout(() => {
                this._revealElement(element);
            }, this._defaults.delay * index);
        });
    }

    /**
     * @private
     */
    _revealElementsInViewport() {
        const _elementsInViewPort = this._elementsToReveal.filter(element => inViewport(element, 0, 1, 0.8));

        this._revealElementsStaggered(_elementsInViewPort);
    }

    /**
     * @private
     */
    _onReduceMotion() {
        this._elementsToReveal.forEach((elem: any) => {
            elem.removeAttribute(this._constants.DATA_REVEAL_IN_VIEW);
            elem.removeAttribute(this._constants.DATA_REVEAL_ANIMATION);
        });
    }

    /**
     * @private
     */
    _cacheSelectors() {
        this._body = document.getElementsByTagName('body')[0]
        this._elementsToReveal = Array.from(document.querySelectorAll(`[${this._constants.DATA_REVEAL_IN_VIEW}]`));
    }

    /**
    * @public
    */
    init() {
        this._cacheSelectors();

        if (!this._elementsToReveal.length) { return; }

        if (this._body.hasAttribute(this._constants.DATA_REDUCE_ALL_MOTION)) {
            this._onReduceMotion();

            return;
        }

        this._revealElementsInViewport();

        this._addEventListeners();
    }
}

export default new RevealManager();
