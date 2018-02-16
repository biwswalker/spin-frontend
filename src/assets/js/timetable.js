class Selectable {
    initial(name) {
        $(name).selectable({
            stop: function () {
                var result = ''
                $(".ui-selected").each(function () {
                    result += $(this).text()+ '<br>';
                });
            }
        });
    }
}