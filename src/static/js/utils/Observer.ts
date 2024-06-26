/**
 * By Peeke Kuepers (https://gist.github.com/peeke/42a3f30c2a3856c65c224cc8a47b95f9)
 * Used for inter-object communication.
 * (Semi-)drop in replacement for Rik Schennink's Observer (https://github.com/rikschennink/conditioner/blob/master/src/utils/Observer.js)
 *
 * Implementation differences:
 * - ES6
 * - The use of WeakMaps
 * - inform() and conceal() don't return a boolean indicating success.
 * - Subscription fn's are called with seperate arguments, instead of one data parameter. This is backwards compatible.
 *
 * @name Observer
 */

class Observer {
    /**
     * Class constructor
     *
     * @param {HTMLElement} element - The HTMLElement this module is constructed upon
     * @param {Object} options - ConditionerJS's merged options
     */

    // We use WeakMaps, so subscriptions get automatically removed when the subject is lost
    // Think DOM elements
    _subscriptions = new WeakMap();
    _informants = new WeakMap();

    _push(map: any, key: any, value: any) {

        // Merge new and old values
        let values = [value];
        if (map.has(key)) {
            values = [...values, ...map.get(key)];
        }

        // Update set
        map.set(key, values);

    }

    _filter(map: any, key: any, filterFn: any) {

        // Not in -> bailout, there's no need to filter
        if (!map.has(key)) { return; }

        // Filter the current values in the set and update the set
        let values = map.get(key).filter(filterFn);
        map.set(key, values);

    }

    /**
     * Subscribe to an event
     * @method subscribe
     * @memberof Observer
     * @param {Object} subject - Object to subscribe to.
     * @param {String} event - Event type to listen for.
     * @param {Function} fn - Function to call when event published.
     */
    subscribe(subject: any, event: any, fn: any) {
        this._push(this._subscriptions, subject, { event, fn });
    }

    /**
     * Unsubscribe from further notifications
     * @method unsubscribe
     * @memberof Observer
     * @param {Object} subject - Object to unsubscribe from.
     * @param {String} event - Event type to match.
     * @param {Function} fn - Function to match.
     */
    unsubscribe(subject: any, event: any, fn: any) {
        let filterFn = (subscription: any) => subscription.event !== event || subscription.fn !== fn;
        this._filter(this._subscriptions, subject, filterFn);
    }

    /**
     * Publish an event
     * @method publish
     * @memberof Observer
     * @param {Object} subject - Object to fire the event on.
     * @param {String} event - Event type to fire.
     * @param {...*} args - Parameters to apply to the fn of the subscription object
     */
    publish(subject: any, event: any, ...args: any) {

        if (this._subscriptions.has(subject)) {
            this._subscriptions.get(subject)
                .filter((subscription: any) => subscription.event === event)
                .map((subscription: any) => subscription.fn)
                .forEach((fn: any) => fn(...args));
        }

        if (this._informants.has(subject)) {
            this._informants.get(subject)
                .forEach((_subject: any) => this.publish(_subject, event, ...args));
        }

    }

    /**
     * Publishes an async event. This means other waiting (synchronous) code is executed first before the event is published.
     * @method publishAsync
     * @memberof Observer
     * @param {Object} subject - Object to fire the event on.
     * @param {String} event - Event type to fire.
     * @param {...*} args - Parameters to apply to the fn of the subscription object
     */
    publishAsync(subject: any, event: any, ...args: any) {
        setTimeout(() => this.publish(subject, event, ...args), 0);
    }

    /**
     * Setup propagation target for events so they can bubble up the object tree.
     * @method inform
     * @memberof Observer
     * @param {Object} informant - Object to set as origin. Events from this object will also be published on receiver.
     * @param {Object} receiver - Object to set as target.
     */
    inform(informant: any, receiver: any) {
        this._push(this._informants, informant, receiver);
    }

    /**
     * Remove propagation target
     * @memberof Observer
     * @param {Object} informant - Object previously set as origin.
     * @param {Object} receiver - Object previously set as target.
     */
    conceal(informant: any, receiver: any) {
        let filterFn = (_receiver: any) => receiver !== _receiver;
        this._filter(this._informants, informant, filterFn);
    }

}

export default new Observer();
