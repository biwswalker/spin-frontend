class SpinModal {
    initial(name, option) {
        $(name).modal(option);
    }

    onOpen(selectorID){
      $(selectorID).modal('show');
    }

    onClose(selectorID) {
        $(selectorID).modal('hide');
    }

    close(name) {
        $(name).modal({ show: false });
    }
}
