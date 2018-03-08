class SpinModal {
    initial(name, option) {
        $(name).modal(option);
        $('#tab-detail').focus();
    }
    onClose(selectorID,callback) {
        $(selectorID).modal('hidden.bs.modal',callback);
    }
    close(selectorID) {
        $(selectorID).modal('hide');
    }
}
