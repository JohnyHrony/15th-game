/**
 * Simple timer for counting game time
 * @param {number} startTime
 * @param {string} timerTemplateId
 * @constructor
 */
function Timer(timerTemplateId, startTime){
    /**
     * current time value of timer,
     * @type {number}
     */
    this.currentTime =  (startTime) ? startTime : 0;
    /**
     * id which is returned after execution of setInterval function
     * @type {null|number}
     * @private
     */
    this._setIntervalId = null;
    /**
     * timer interval
     * @type {number}
     * @private
     */
    this._timerInterval = 1000;
    /**
     * id for the timer template
     * @type {string}
     * @private
     */
    this._timerTemplateId = timerTemplateId;

    this._timerTemplate = document.getElementById(this._timerTemplateId);
}

/**
 * Method which starts timer
 */
Timer.prototype.start = function(){
    this._setIntervalId = setInterval(this._incrementCurrentTime.bind(this), this._timerInterval);
};
/**
 * Method which stops timer
 */
Timer.prototype.stop = function(){
    clearInterval(this._setIntervalId);
};
/**
 * Method which resets timer
 */
Timer.prototype.reset = function(){
    this.stop();
    this.currentTime = 0;
};
/**
 * Method which auto increments current time
 * @private
 */
Timer.prototype._incrementCurrentTime =function(){
    this.currentTime++;
    this.updateTimerField();
};

/**
 * Method which returns current time of timer in format hh:mm:ss
 * @returns {string}
 */
Timer.prototype.getCurrentTime = function(){
    var result = '';
    var seconds = '';
    var minutes = '';
    var hours = '';

    seconds = this.getSeconds();
    minutes = this.getMinutes();
    hours = this.getHours();

    result = hours + ':' + minutes + ':' + seconds;

    return result;
};

/**
 * Method which return seconds of timer
 * @returns {string}
 */
Timer.prototype.getSeconds = function(){
    var seconds = 0;
    var result = '';
    seconds = this.currentTime % 60;
    result = (seconds < 10) ? '0' + seconds.toString() : seconds.toString();
    return result;
};

/**
 * Method which return minutes of timer
 * @returns {string}
 */
Timer.prototype.getMinutes = function(){
    var minutes = 0;
    var result = '';
    minutes = Math.floor(this.currentTime / 60 % 60);
    result = (minutes < 10) ? '0' + minutes.toString() : minutes.toString();
    return result;
};

/**
 * Method which return hour of timer
 * @returns {string}
 */
Timer.prototype.getHours = function(){
    var hour = 0;
    var result = '';
    hour = Math.floor(this.currentTime / 3600);
    result = (hour < 10) ? '0' + hour.toString() : hour.toString();
    return result;
};
/**
 * Method which update timer field
 */
Timer.prototype.updateTimerField = function(){
    this._timerTemplate.innerHTML = this.getCurrentTime();
};
