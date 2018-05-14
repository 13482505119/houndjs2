/**
 * Created by Administrator on 2018/3/26.
 */
define(['hound', 'pullLoad'], function(hound, pullLoad) {
    var type = 'post',
        url = 'index.json',
        timeout = 45000;

    //hound.ajax(type, url, {}, function() {});
    $('body').append('<div id="closed"></div>');

    $(document).on('closed', '#closed', function() {
        console.log('closed');
    });

    //$('#closed').triggerHandler('closed');
    $('#closed').trigger('closed');

    hound.notify('标题', '消息');
    hound.notify('标题', '消息', 'success');
    hound.notify('标题', '消息', 'warning');
    hound.notify('标题', '消息', 'danger');



    //var loading = $.notify({
    //    title: type + ':',
    //    message: url,
    //    icon: 'fa fa-spinner fa-spin' //fa-circle-o-notch fa-spinner
    //}, {
    //    delay: timeout,
    //    placement: {
    //        from: "bottom",
    //        align: "center"
    //    },
    //    allow_dismiss: false,
    //    showProgressbar: false
    //});
    //$.ajax({
    //    type: type,
    //    url: url,
    //    data: {},
    //    cache: false,
    //    dataType: 'json',
    //    timeout: timeout,
    //    success: function(json) {
    //        loading.update({
    //            type: 'success',
    //            message: 'OK',
    //            icon: 'fa fa-check',
    //            onClose: function() {
    //                console.log('close');
    //            }
    //        });
    //        setTimeout(function() {
    //            loading.close();
    //        }, 1000);
    //    },
    //    error: function(xhr, err) {
    //        loading.update({
    //            type: 'danger',
    //            message: xhr.statusText == 'OK' ? err : xhr.statusText,
    //            icon: 'fa fa-warning'
    //        });
    //        setTimeout(function() {
    //            loading.close();
    //        }, 5000);
    //    }
    //});
});