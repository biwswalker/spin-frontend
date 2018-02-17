
var className = ''
var selectableList = $('')
/**
 * 
 * @param {*} name 
 */
function spinTimestamp(name) {
    className = name
    this.selectableList = $(name);
    selectableList.selectable({
        stop: getSelectedItems
    });
}

function getSelectedItems() {
    var selectedItems = '';
    $('.ui-selected').each(function () {
        selectedItems += $(this).data("value") + '<br>';
    });
    $('#result').html(selectedItems)
}

function createSelectableList(filterValue) {
    selectableList.selectable('destroy').selectable(
        { stop: getSelectedItems, filter: filterValue }
    );
    $(`${className} div`).removeClass('ui-selected');
    $('#result').expty();

    var disabledTime = $('div[data-value="1800"]');
    if (filterValue = '*') {
        disabledTime.removeClass('excluded');
    } else {
        disabledTime.addClass('excluded');
    }
}