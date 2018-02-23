class SpinModal {
    initial(name, option) {
        $(name).modal(option);
    }



    onClose(selectorID,callback) {
        $(selectorID).modal('hidden.bs.modal',callback);
    }

    open(selectorID){
      $(selectorID).modal('show');
    }
    close(selectorID) {
        $(selectorID).modal('hide');
    }
}
