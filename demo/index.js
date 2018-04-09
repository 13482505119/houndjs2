/**
 * Created by Administrator on 2018/3/26.
 */
define(['hound', 'pullLoad'], function(hound, pullLoad) {
    var type = 'post',
        url = 'index.json',
        timeout = 45000;

    hound.ajax(type, url, {}, function() {});

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