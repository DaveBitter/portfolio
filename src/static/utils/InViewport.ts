/**
 * Calculate the viewport edges
 * @param {Number} start - Viewport boundary percentage from the top
 * @param {Number} end - Viewport boundary percentage from the bottom
 * @param {Number} yOffset - The scrolling position on the Y axis
 * @returns {Object} - The viewport object
 * @private
 */
const _calcViewport = (start: number, end: number, yOffset: number) => {
    let viewport = { top: 0, bottom: 0 };

    viewport.top = yOffset + (window.innerHeight * start);
    viewport.bottom = yOffset + (window.innerHeight * end);

    return viewport;
};

/**
* Calculate the element boundaries
* @param {Object} element - The HTML element to be checked
* @param {Number} yOffset - The scrolling position on the Y axis
* @returns {Object} - The bounds object
* @private
*/
const _calcBounds = (element: any, yOffset: number) => {
    let bounds = { top: 0, bottom: 0 };

    bounds.top = element.getBoundingClientRect().top + yOffset;
    bounds.bottom = bounds.top + element.clientHeight;

    return bounds;
};

/**
* Check if specified element is found in the viewport
* @param {Object} element - The HTML element to be checked
* @param {Number} start - Viewport boundary percentage from the top
* @param {Number} end - Viewport boundary percentage from the bottom
* @param {Number} yOffset - The scrolling position on the Y axis
* @returns {boolean} - Whether any part of the element is in the viewport
*/
const inViewport = (element: any, start = 0, end = 1, yOffset = 0) => { // eslint-disable-line max-params
    if (start > end) {
        throw new Error('The starting position of the viewport must be higher than its end.');
    }

    const bounds = _calcBounds(element, yOffset);
    const viewport = _calcViewport(start, end, yOffset);

    return (bounds.top <= viewport.top && bounds.top + element.clientHeight > viewport.top) ||
        (bounds.top >= viewport.top && bounds.top <= viewport.top + window.innerHeight);
};

export { inViewport };
