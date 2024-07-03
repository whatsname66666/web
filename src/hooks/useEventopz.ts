export default function(){
    const debounce = (func:any,delay:any)=>{
        let timerId:any;
        return function(...args:any) {
          clearTimeout(timerId);
          timerId = setTimeout(() => {
            func.apply(this, args);
          }, delay);
        };
    }

    const throttle = (func:any,delay:any)=> {
        let timer:any = null;
        let prev:any = new Date();
        return function () {
            let nowTime:any = new Date();
            let context = this;
            clearTimeout(timer);
            if (nowTime - prev > delay) {
                func.apply(context, arguments);
                prev = new Date();
            } else {
                timer = setTimeout(() => {
                    func.apply(context, arguments);
                }, delay);
            }
        };
    }
    return { debounce ,throttle }
}
