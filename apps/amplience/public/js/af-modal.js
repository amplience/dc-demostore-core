(function() {
    
    this.show = function(modal) {
        modal = document.querySelector(modal);
        modal.classList.add('af-modal-active');
        document.querySelector('.af-modal-content').classList.add('af-modal-content-active');
    }

    this.hide = function(modal) {
        modal = document.querySelector(modal);
        modal.classList.remove('af-modal-active');
        document.querySelector('.af-modal-content').classList.remove('af-modal-content-active');
    }

    this.confirmLocale = function() {
        this.hide('#locale-modal');
        var language = document.getElementById('language').value;
        window.location = '/locale/' + language + '?redirect=' + encodeURIComponent(window.location.href);
    }

    this.login = function() {
        this.hide('#account-modal');
        var segment = document.getElementById('username').value;
        if(segment == 'guest') {
            window.location = '/account/logout?redirect=' + encodeURIComponent(window.location.href);
        }else{
            window.location = '/account/login?username=' + encodeURIComponent(segment) + '&redirect=' + encodeURIComponent(window.location.href);
        }
    }

}).apply(window.afModal = window.afModal || {});