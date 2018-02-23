class SpinModal {
    initial(name, option) {
        $(name).modal(option);
    }

    onClose(name, callback) {
        $(name).on('hidden.bs.modal', callback);
    }

    close(name) {
        $(name).modal({ show: false });
    }
}
