class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
    	this.config=config;
    	this.states=new Array();
    	this.n=0;
    	this.states[this.n++]=config.initial;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {return this.states[this.n-1];}

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
    		if(String(state) in this.config.states)
    		{
    			this.states[this.n++]=state;
    		}
    		else throw new Error('Error');
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
    	if(this.config.states[this.getState()].transitions[event]===undefined)
    		throw new Error('Error');
    	else
    		this.changeState(this.config.states[this.getState()].transitions[event]);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {this.states=new Array();
    	this.n=0;
    	this.states[this.n++]=this.config.initial;}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
    	var qrr=new Array();
    	var i=0;
    	if(event===undefined)
    	{
    		for(var a in this.config.states)
    			qrr[i++]=a;
    	}
    	else
    	{
    		for(var a in this.config.states)
    			for(var b in this.config.states[a].transitions)
    				if(b==event)
    				{
    					qrr[i++]=a;
    					break;
    				}
    	}
    	return qrr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
    	if(this.n==1)
    		return false;
    	else
    	{
    		this.n--;
    		return true;
    	}
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
    	if(this.states[this.n]===undefined)
    		return false;
    	else
    	{
    		this.n++; 
    		return true;
    	}
    }

    /**
     * Clears transition history
     */
    clearHistory() {
    	var s=this.getState();
    	this.states=new Array();
    	this.n=0;
    	this.states[this.n++]=s;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
