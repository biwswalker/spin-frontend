class SpinModal {
    initial(name, option) {
        $(name).modal(option);
    }

    onClose(name, callback) {
        $(name).on('hidden.bs.modal', callback);
    }
}
