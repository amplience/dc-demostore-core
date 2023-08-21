var promoBanner = function ($node) {
    var $children = [].slice.call(
        $node.querySelectorAll('.amp-dc-promo-block')
    );
    var currentItemNum = 2;
    var winWidth = window.innerWidth;

    if ($children.length < 2) {
        $children[0].classList.add('dc-fade-in');
        return;
    }

    $children.forEach(function ($child) {
        $children[currentItemNum - 1].classList.remove('dc-fade-in');
    });

    $children[currentItemNum - 1].classList.add('dc-fade-in');

    var getNextItem = function () {
        if (currentItemNum === $children.length) {
            currentItemNum = 1;
        } else {
            currentItemNum += 1;
        }

        return currentItemNum - 1;
    };

    var interval = setInterval(function () {
        winWidth = window.innerWidth;
        var $fadedElems = [].slice.call(
            $node.querySelectorAll('.dc-fade-in')
        );
        if (winWidth > 768) {
            return;
        }

        var itemToShow = getNextItem();
        if ($fadedElems.length > 0) {
            $fadedElems.forEach(function ($fadeElem) {
                $fadeElem.classList.remove('dc-fade-in');
            });
        }
        $children[itemToShow].classList.add('dc-fade-in');
    }, 5000);
};


$(function() {
    var arr = [].slice.call(
        document.querySelectorAll('.amp-dc-promo-banner-wrap')
    );
    arr.forEach(function ($node) {
        promoBanner($node);
    });
})

