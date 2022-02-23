export default class PauseableBufferSource{
    constructor(audioCtx,buffer){
        this._ctx = audioCtx;
        this._started = false;
        this._stoped = true;
        this._lastStop = null;
        this._lastStart = null;
        this._buffers = buffer;
        this._source = this._createSource();
    }

    _createSource(){
        const source = this._ctx.createBufferSource();
        source.buffer = this._buffers;
        source.connect(this._ctx.destination);
        return source;
    }

    get paused(){
        return this._stoped;
    }
    get stoped(){
        return this._started && this._stoped;
    }

    play(start = 0){
        let offset = 0;
        if(this._started && this._stoped){
            //means started once and stoped so need to create new bufferSource
            this._source = this._createSource();
            if(this._lastStop && this._lastStart){
                //start from last state (resume)
                offset = ((this._lastStop - this._lastStart )/ 1000)
            }
        }
        this._source.start(start,offset);
        this._started = true;
        this._stoped = false;
        this._lastStart = Date.now();
        return true;
    }

    pause(){
        if(this._stoped) return false;
        this._source.disconnect();
        this._source.stop(0);
        this._stoped = true;
        this._lastStop = Date.now();
        return true;
    }

    stop(){
        if(this._stoped) return false;
        this._source.disconnect();
        this._source.stop(0);
        this._stoped = true;
        this._lastStop = null;
        this._lastStart = null;
        return true;
    }
}
