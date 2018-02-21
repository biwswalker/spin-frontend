/**
 * 
 * @param {*} time 
 * @returns {string}
 */
function convertTimeString(time) {
    var zero = 4 - time.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + time;
}
// function createSelectableList(filterValue) {
//     selectableList.selectable('destroy').selectable(
//         { stop: getSelectedItems, filter: filterValue }
//     );
//     $(`${className} div`).removeClass('ui-selected');
//     $('#result').expty();

//     var disabledTime = $('div[data-value="1800"]');
//     if (filterValue = '*') {
//         disabledTime.removeClass('excluded');
//     } else {
//         disabledTime.addClass('excluded');
//     }
// }