class SpinModal {
    initial(name, option) {
        $(name).modal(option);
        $(name).find('#main-tab-menu>li .nav-link').removeClass('show active');
        $(name).find('#main-tab-menu>li:first .nav-link').addClass('active');
        $(name).find('.modal-body>.tab-content>.tab-pane:first').addClass('in active').siblings().removeClass('in active');
    }
    onClose(selectorID,callback) {
        $(selectorID).modal('hidden.bs.modal',callback);
    }
    close(selectorID) {
        $(selectorID).modal('hide');
    }
}
