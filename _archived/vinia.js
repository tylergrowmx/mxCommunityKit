const {randomId} = require('./stringTools.js');
class Vinia {
    id=null;
    state=null;
    watchers=[]
    constructor(id=randomId(),options={state:()=>({})}) {
        const self = this;
        self.$default = options.state;
        self.id = id;
        self.state = self.$default();
    }
    watch(callback=()=>{}) {
        const self = this;
        if(typeof callback !== 'function'){
            throw new Error('callback must be a function');
        }
        const id = randomId();
        const watcher = {
            callback,
            id,
            subscribed: true,
            error: false,
            unsubscribe: ()=>{
                const windex = self.watchers.findIndex((w)=>w.id === id);
                if(windex > -1){
                    self.watchers[windex].subscribed = false;
                }
            }
        }
        self.watchers.push(watcher);
        const unsubscribe = watcher.unsubscribe;
        return unsubscribe;
    }
    
    commit(nextStateOrCallbackToNextState=(prevState)=>{
        return prevState;
    }) {
        const vc=nextStateOrCallbackToNextState
        const self = this;
        const prev = JSON.parse(JSON.stringify(self.state));
        const callback = ()=>{
            return typeof vc === 'function' ? vc(prev,next) : vc;
        }
        const next = callback();
        return self.$set(next);

    }

    reset() {   
        const self = this;
        const next = self.$default();
        return self.$set(next);
    }

    // private
    $set(next){
        const self = this;
        const prev = JSON.parse(JSON.stringify(self.state));
        self.state = next;
        const watchers = self.watchers.filter((w)=>w.subscribed);
        if(self.watchers?.length > 0){
            watchers.forEach((watcher)=>{
                try {
                    watcher.callback(next,prev,self);
                } catch(e) {
                    watcher.error = e;
                    console.warn('Watcher error',e);
                    watcher.subscribed = false;
                }
            })
        }
        return self.state

    }
}

