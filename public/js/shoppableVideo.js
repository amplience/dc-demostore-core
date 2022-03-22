(function() {
    
    function timestampToSeconds(timestamp) {
        var components = timestamp.split(":").map(Number);
        return (components[0] * 60) + components[1];
    }

    function ShoppableVideo(wrapper) {
        var video = wrapper.querySelector('video');
        var productWrapper = wrapper.querySelector('.af-shoppable-video-products');
        var products = [].slice.call(wrapper.querySelectorAll('.af-shoppable-video-product'));
        
        products.forEach(function(product) {
            product.timestamp = timestampToSeconds(product.getAttribute('data-timestamp'));
        });

        products.sort(function(a, b) {
            return b.timestamp - a.timestamp;
        });

        products.forEach(function(product) {
            productWrapper.appendChild(product);
        });

        video.ontimeupdate = function() {
            var focusProduct = null;
            products.forEach(function(product) {
                product.classList.remove('af-shoppable-video-product-active');
                product.classList.remove('af-shoppable-video-product-focus');
                
                if(video.currentTime > product.timestamp) {
                    product.classList.add('af-shoppable-video-product-active');
                    focusProduct = product;
                }
            });

            if(focusProduct) {
                focusProduct.classList.add('af-shoppable-video-product-focus');
            }
        }
    }

    this.init = function(instances) {
        instances = [].slice.call(instances).map(ShoppableVideo);
    }

}).apply(window.shoppableVideo = window.shoppableVideo || {});