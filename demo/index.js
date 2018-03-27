/**
 * Created by Administrator on 2018/3/26.
 */
define(['hound', 'pullLoad'], function(hound, pullLoad) {
    console.log(hound, pullLoad);
    //hound.alert('确认吗', '确认吗', 10000);
    //hound.loading();

    var loading = document.createElement("i");
    loading.className = 'fa fa-circle-o-notch fa-spin fa-4x';

    swal({
        title: 'test',
        content: loading,
        buttons: false,
        closeOnClickOutside: false,
        closeOnEsc: false,
        timer: 5000
    }).then(
        function(dismiss) {
            console.log(dismiss);
        }
    );

    /*swal.setDefaults({
        buttons: {
            cancel: {
                text: '取消'
            },
            confirm: {
                text: '确认'
            }
        }
    });
    swal({
        title: '确认吗',
        type: "question",
        buttons: {
            cancel: {
                text: '取消',
                visible: true
            },
            confirm: {
                text: '确认'
            }
        },
        closeOnClickOutside: false,
        closeOnEsc: false
    }).then(
        function (value) {
            console.log(value);
        }
    );*/
});