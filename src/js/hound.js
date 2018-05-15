/**
 * Hound v2.0.2
 * Created by LiuSong on 2017/3/14.
 * Updated by LiuSong on 2018/5/14
 * requires: jQuery 3+
 *           jQuery Validation
 *           jQuery Form
 *           jQuery Cookie
 *           Bootstrap-bundle
 *           Bootstrap-datepicker
 *           Bootstrap-notify
 *           SweetAlert
 *           JSON2
 *           Swiper (mobile)
 *           IScroll-probe (mobile)
 *           RequireJS
 *           pullLoad (mobile)
 */

define("hound", [], function() {

    var config = {
            version: "2.0.3",
            debug: false,
            dataType: "json",
            data: {
                token: $.cookie('TOKEN'),
                session: $.cookie('SESSIONUID')
            },
            timeout: 45000, //ajax请求超时时间:ms
            delay: 2000, //消息提醒后延迟跳转:ms
            api: '',
            icons: {
                info: 'fa fa-lg fa-exclamation-circle', //fa-exclamation-circle,fa-exclamation-triangle
                success: 'fa fa-lg fa-check-circle',
                warning: 'fa fa-lg fa-warning',
                danger: 'fa fa-lg fa-times-circle'
            },
            mobile: {
                reg: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                message: '请输入一个有效的手机号码'
            }
        },
        hound = function() {
            $.extend(this, config);
        };

    $.extend(hound.prototype, {
        isBlank: function(obj) {
            return(!obj || $.trim(obj) === "");
        },
        notify: function(title, message, type) {
            type = type || 'info';
            var icon = this.icons[type] ? this.icons[type] : this.icons.info;

            $.notify({
                title: title,
                message: message,
                icon: icon
            }, {
                type: type,
                placement: {
                    from: "bottom",
                    align: "center"
                },
                z_index: 3000
            });
        },
        swal: function(title, text, icon, timer) {
            swal({
                title: title,
                text: text,
                icon: icon,
                timer: timer,
                buttons: {
                    confirm: {
                        text: '确定'
                    }
                }
            });
        },
        alert: function(title, text, timer) {
            this.swal(title, text, 'warning', timer);
        },
        success: function(title, text, timer) {
            this.swal(title, text, 'success', timer);
        },
        error: function(title, text, timer) {
            this.swal(title, text, 'error', timer);
        },
        info: function(title, text, timer) {
            this.swal(title, text, 'info', timer);
        },
        confirm: function(title, text, confirm) {
            swal({
                title: title,
                text: text,
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
                closeOnClickOutside: false
            }).then(function(result) {
                if (result) {
                    if ($.isFunction(confirm)) {
                        confirm();
                    }
                }
            });
        },
        redirect: function(url, delay) {
            if (this.isBlank(url)) return;

            delay = $.isNumeric(delay) ? delay : 0;
            setTimeout(function() {
                switch (url) {
                    //case null:
                    //case undefined:
                    //case "":
                    //    break;
                    case "reload":
                        window.location.reload();
                        break;
                    case "back":
                        window.history.back();
                        break;
                    case "close":
                        window.self.focus();
                        window.self.close();
                        return false;
                        //break;
                    case "closeModal":
                        var $modal = $('.modal.show'),
                            $modalSub = $modal.find('.modal-sub');
                        if ($modalSub.length == 1 && $modalSub.css('display') != 'none') {
                            $modalSub.css('display', 'none').trigger('closed');
                        } else {
                            $modal.modal('hide').trigger('closed');
                        }
                        break;
                    default :
                        var a = document.createElement("a");
                        if (!a.click) {
                            location.href = url.replace(/&amp;/ig, "&");
                        } else {
                            a.href = url;
                            a.style.display = "none";
                            document.body.appendChild(a);
                            a.click();
                        }
                        break;
                }
            }, delay);
        },
        ajax: function(type, url, data, fn, isLoading) {
            var _this = this, loading;
            url = _this.api + url;
            data = $.extend(data, _this.data);
            if (isLoading) {
                loading = $.notify({
                    title: type + ':',
                    message: url,
                    icon: 'fa fa-spinner fa-spin'
                }, {
                    delay: _this.timeout,
                    placement: {
                        from: "bottom",
                        align: "center"
                    },
                    allow_dismiss: false,
                    showProgressbar: false,
                    z_index: 3000
                });
            } else {
                loading = {
                    update: function() {},
                    close: function() {}
                };
            }

            $.ajax({
                type: type,
                url: url,
                data: data,
                cache: false,
                dataType: _this.dataType,
                success: function(json) {
                    switch (json.stat) {
                        case 200:
                            loading.update({
                                type: 'success',
                                message: _this.isBlank(json.msg) ? 'OK' : json.msg,
                                icon: 'fa fa-check'
                            });
                            setTimeout(function() {
                                loading.close();
                                _this.redirect(json.redirect);
                            }, 2000);
                            if ($.isFunction(fn)) {
                                fn(json);
                            }
                            break;
                        default :
                            loading.update({
                                type: 'warning',
                                message: _this.isBlank(json.msg) ? json.stat : json.msg,
                                icon: 'fa fa-warning'
                            });
                            setTimeout(function() {
                                loading.close();
                            }, 3000);
                            break;
                    }
                },
                error: function(xhr, err) {
                    loading.update({
                        type: 'danger',
                        message: xhr.statusText == 'OK' ? err : xhr.statusText,
                        icon: 'fa fa-warning'
                    });

                    setTimeout(function() {
                        loading.close();
                    }, 5000);

                    if (xhr.statusText == 'OK') {
                        throw new Error(err);
                    }
                }
            });
        },
        post: function(url, data, fn, isLoading) {
            this.ajax("POST", url, data, fn, isLoading);
        },
        get: function(url, data, fn, isLoading) {
            this.ajax("GET", url, data, fn, isLoading);
        },
        getHTML: function(url, data, fn) {
            url = this.api + url;
            data = $.extend(data, this.data);
            $.ajax({
                url: url,
                data: data,
                dataType: "html",
                success: function(html) {
                    if ($.isFunction(fn)) {
                        fn(html);
                    }
                },
                error: function(xhr) {
                    $.notify({
                        title: xhr.status + ':',
                        message: xhr.statusText,
                        icon: 'fa fa-warning',
                        url: url,
                        target: '_blank'
                    }, {
                        placement: {
                            from: "bottom",
                            align: "center"
                        },
                        z_index: 3000
                    });
                }
            });
        },
        loadHTML: function($e, url, data, fn) {
            if ($.isFunction(data)) {
                fn = data;
                data = {};
            }
            this.getHTML(url, data, function(html) {
                $e.html(html);
                if ($.isFunction(fn)) {
                    fn($e);
                }
            });
        },
        getRequest: function(url) {
            var request = {};
            url = url || location.search;
            $.each(url.substr(url.indexOf('?') + 1).split("&"), function (i, n) {
                var index = n.indexOf("=");
                if (index > 0) { //忽略无效参数
                    request[n.substring(0, index)] = decodeURIComponent(n.substr(index + 1));
                }
            });
            return request;
        },
        ajaxSubmit: function($form) {
            var _this = this,
                validate = !!$form.data('validate');

            if (!$form.is('form')) {
                throw new Error('Element is not a form');
            }

            $form.ajaxSubmit({
                beforeSubmit: function() {//arr, $form, options
                    return validate ? $form.valid() : true;
                },
                //resetForm: true,
                data: _this.data,
                dataType: "json",
                timeout: _this.timeout,
                error: function(xhr, statusText) {//xhr, statusText, error, $form
                    //_this.error(statusText);
                    _this.error(xhr.statusText == 'OK' ? statusText : xhr.status + ' : ' + xhr.statusText);
                },
                success: function(json) {//responseText, statusText, xhr, $form
                    switch (json.stat) {
                        case 200:
                            $form.data('success', json.data).trigger('success').resetForm();
                            if (!_this.isBlank(json.msg)) {
                                _this.success(json.msg, "", _this.delay);
                            }
                            break;
                        default:
                            $form.find(":password").val("");
                            if (!_this.isBlank(json.msg)) {
                                _this.alert(json.msg);
                            }
                            break;
                    }
                    if (!_this.isBlank(json.redirect)) {
                        _this.redirect(json.redirect, _this.isBlank(json.msg) ? 0 : _this.delay);
                    }
                }
            });
        },
        fireEvent: function(node, eventName) {
            var doc,
                event;
            if (node.ownerDocument) {
                doc = node.ownerDocument;
            } else if (node.nodeType == 9){
                doc = node;
            } else {
                throw new Error("Invalid node passed to fireEvent: " + node.id);
            }

            if (node.dispatchEvent) {
                var eventClass = "";

                switch (eventName) {
                    case "click":
                    case "mousedown":
                    case "mouseup":
                        eventClass = "MouseEvents";
                        break;
                    case "focus":
                    case "change":
                    case "blur":
                    case "select":
                        eventClass = "HTMLEvents";
                        break;
                    default:
                        throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
                }
                event = doc.createEvent(eventClass);

                var bubbles = eventName != "change";
                event.initEvent(eventName, bubbles, true);

                event.synthetic = true;
                node.dispatchEvent(event, true);
            } else  if (node.fireEvent) {
                event = doc.createEventObject();
                event.synthetic = true;
                node.fireEvent("on" + eventName, event);
            }
        }
    });

    //jQuery Function
    $.hound = new hound();

    //common events
    var events = {
        'click': {
            post: function(element, event) {
                event.preventDefault();

                var $this = $(element),
                    url = $this.data("url"),
                    data = $.extend({}, $this.data("data"));

                $.hound.post(url, data, function(json) {
                    $this.data('success', json.data).trigger('success');
                });
            },
            remove: function(element, event) {
                event.preventDefault();

                var $this = $(element),
                    $target = $this.data("target") ? $this.closest($this.data("target")) : $this,
                    siblings = $target.siblings().length,
                    url = $this.data("url") || $target.parent().data("removeUrl"),
                    data = $.extend({}, $this.data("data"));

                $.hound.post(url, data, function() {
                    $target.fadeOut("fast", function() {
                        if (siblings == 0 && $target.parent().data("redirect")) {
                            $.hound.redirect($this.parent().data("redirect"));
                        } else {
                            $target.remove();
                        }
                    });
                });
            },
            redirect: function(element, event) {
                event.preventDefault();

                var url = $(element).data("url");
                if ($.hound.isBlank(url)) {
                    url = window.location.href;
                    if (url.indexOf("?") == -1) {
                        url += "?_=" + (new Date().getTime());
                    } else {
                        if (url.indexOf("_=") == -1) {
                            url += "&_=" + (new Date().getTime());
                        } else {
                            url = url.replace(/(_=)\d+/, "$1" + (new Date().getTime()));
                        }
                    }
                }

                $.hound.redirect(url);
            },
            ajaxSubmit: function(element, event) {
                event.preventDefault();
                $.hound.ajaxSubmit($(element).closest("form"));
            },
            sendCode: function(element, event) {
                event.preventDefault();

                var $this = $(element),
                    $target = $($this.data("target")),
                    text = $this.text(),
                    url = $this.data("url"),
                    data = $.extend({}, $this.data("data"));

                if ($this.data("waiting")) {
                    return false;
                }

                if ($.hound.mobile.reg.test($target.val())) {
                    data[$target.prop("name")] = $target.val();
                    $.hound.post(url, data, function() {
                        $this.data("waiting", true);
                        var second = 60;
                        var interval = setInterval(function() {
                            if (second == 0) {
                                clearInterval(interval);
                                $this.data("waiting", false);
                                $this.text(text);
                            } else {
                                $this.text(second + "秒后可重发");
                            }
                            second--;
                        }, 1000);
                    });
                } else {
                    $.hound.alert($.hound.mobile.message);
                }
            },
            refreshCode: function(element, event) {
                event.preventDefault();

                var $this = $(element),
                    $target = $this.is("img") ? $this : $($this.data("target")),
                    src = $target.data("src");

                src += ((src.indexOf("?") == -1 ? "?" : "&") + Math.random());

                $target.attr("src", src);
            }
        }
    };

    $(document).ready(function() {
        //bind events
        $.each(events, function(event, methods) {
            $.each(methods, function(method, handle) {
                $(document).on(event, '[data-' + event + '="' + method + '"]', function(event) {
                    var element = this,
                        confirm = $(this).data("confirm");

                    if ($.hound.isBlank(confirm)) {
                        handle(element, event);
                    } else {
                        $.hound.confirm(confirm, '', function() {
                            handle(element, event);
                        });
                    }
                });
            });
        });

        //element load a url
        $('[data-load]').each(function() {
            var $this = $(this);
            $.hound.loadHTML($this, $this.data("load"), $.extend({}, $this.data("data")));
        });

        //form validate
        $('form[data-validate="true"]').each(function() {
            var $this = $(this);
            this.onreset = function() {
                $this.find('.has-feedback').removeClass('has-error has-feedback has-success');
                $this.find('.form-control-feedback, .help-block').remove();
            };
        }).validate();

        //form async
        $(document).on('submit', 'form[data-async="true"]', function(event) {
            event.preventDefault();
            $.hound.ajaxSubmit($(this));
        });
    });

    //jQuery Validate Settings
    $.validator.setDefaults({
        debug: $.hound.debug,
        ignore: ".ignore",
        errorElement : 'span',
        errorClass : 'help-block',
        //onfocusout: false,
        //onkeyup: false,
        //onclick: false,
        //onsubmit: true,
        errorPlacement: function(error, $input) {
            var $formGroup = $input.closest('.form-group');
            $formGroup.find('.form-control-feedback, .help-block').remove();
            $input.filter(':visible').after('<span class="fa fa-remove form-control-feedback" aria-hidden="true"></span>');
            $formGroup.append(error);
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error has-feedback');
        },
        unhighlight: function(element) {
            var $input = $(element);
            $input.closest('.form-group').removeClass('has-error has-feedback');
            $input.next('.form-control-feedback').remove();
        },
        success: function($label) {
            var $formGroup = $label.closest('.form-group').removeClass('has-error').addClass("has-feedback has-success"),
                $input = $formGroup.find("input, textarea");
            $formGroup.find('.form-control-feedback, .help-block').remove();
            $input.filter(':visible').after('<span class="fa fa-check form-control-feedback" aria-hidden="true"></span>');
            $label.remove();
        }
    });
    $.validator.addMethod("mobile", function(value, element) {
        return this.optional(element) || $.hound.mobile.reg.test(value);
    }, $.hound.mobile.message);
    $.extend($.validator.messages, {
        required: "这是必填字段",
        remote: "请修正此字段",
        email: "请输入有效的电子邮件地址",
        url: "请输入有效的网址",
        date: "请输入有效的日期",
        dateISO: "请输入有效的日期 (YYYY-MM-DD)",
        number: "请输入有效的数字",
        digits: "只能输入数字",
        creditcard: "请输入有效的信用卡号码",
        equalTo: "你的输入不相同",
        extension: "请输入有效的后缀",
        maxlength: $.validator.format( "最多可以输入 {0} 个字符" ),
        minlength: $.validator.format( "最少要输入 {0} 个字符" ),
        rangelength: $.validator.format( "请输入长度在 {0} 到 {1} 之间的字符串" ),
        range: $.validator.format( "请输入范围在 {0} 到 {1} 之间的数值" ),
        max: $.validator.format( "请输入不大于 {0} 的数值" ),
        min: $.validator.format( "请输入不小于 {0} 的数值" )
    });

    return $.hound;
});
