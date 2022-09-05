(function() {

    var debug = false;

    this.debug = function() {
        debug = !debug;
        
        if(debug) {
            this.createDebugDom();
            document.body.classList.add('af-debug');
        }else{
            document.body.classList.remove('af-debug');
        }
    }

    this.createDebugDom = function() {
    }

}).apply(window.afDebug = window.afDebug || {});