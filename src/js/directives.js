(function () {
    'use strict';

    angular
        .module('app')
        .directive('includeReplace', includeReplace)
        .directive('a', preventClickDirective)
        .directive('a', bootstrapCollapseDirective)
        .directive('a', navigationDirective)
        .directive('button', layoutToggleDirective)
        .directive('a', layoutToggleDirective)
        .directive('button', collapseMenuTogglerDirective)
        .directive('div', bootstrapCarouselDirective)
        .directive('toggle', bootstrapTooltipsPopoversDirective)
        .directive('tab', bootstrapTabsDirective)
        .directive('button', cardCollapseDirective)
        .directive('inputCurrency', inputCurrency)
        .directive('format', format);

    format.$inject = ['$filter'];

    function format($filter) {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;
                ctrl.$formatters.unshift(function (a) {
                    return $filter(attrs.format)(ctrl.$modelValue)
                });
                ctrl.$parsers.unshift(function (viewValue) {
                    elem.priceFormat({
                        prefix: '',
                        centsSeparator: ',',
                        thousandsSeparator: '.'
                    });
                    return elem[0].value;
                });
            }
        };
    }

    inputCurrencyOld.$inject = ['$filter'];

    function inputCurrencyOld($filter) {

        // For input validation
        var isValid = function (val) {
            return angular.isNumber(val) && !isNaN(val);
        };
        // Helper for creating RegExp's
        var toRegExp = function (val) {
            var escaped = val.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            return new RegExp(escaped, 'g');
        };
        // Saved to your $scope/model
        var toModel = function (val) {
            // Locale currency support
            var decimal = toRegExp('.');
            var group = toRegExp(',');
            var currency = toRegExp('Rp');

            // Strip currency related characters from string
            val = val.replace(decimal, '').replace(group, '').replace(currency, '').trim();
            return parseInt(val, 10);
        };
        // Displayed in the input to users
        var toView = function (val) {
            console.log(accounting.formatMoney(val, "", 0, ".", ","))
            // return $filter('currency')(val, '', 0);
            return accounting.formatMoney(val, "", 0, ".", ",")
        };
        // Link to DOM
        var link = function ($scope, $element, $attrs, $ngModel) {
            $ngModel.$formatters.push(toView);
            $ngModel.$parsers.push(toModel);
            $ngModel.$validators.currency = isValid;

            // $ngModel.$parsers.unshift(function (viewValue) {
            //     $element.priceFormat({
            //         prefix: '',
            //         centsSeparator: '.',
            //         thousandsSeparator: ','
            //     });
            //     return $element[0].value;
            // });

            // ketika di klik / onkeyup 
            $element.on('keyup', function () {
                $ngModel.$viewValue = accounting.formatMoney($ngModel.$modelValue, "", 0, ".", ",");
                // $ngModel.$parsers.unshift(function (viewValue) {
                //     $element.priceFormat({
                //         prefix: '',
                //         centsSeparator: '.',
                //         thousandsSeparator: ','
                //     });
                //     return $element[0].value;
                // });
                // console.log("ngmodel",$ngModel.$viewValue)
                $ngModel.$render();

            });
        };
        return {
            restrict: 'A',
            require: '?ngModel',
            link: link
        };
    }

    inputCurrency.$inject = ["$filter", "$locale"];

    function inputCurrency($filter, $locale) {
        $locale.NUMBER_FORMATS.GROUP_SEP = '.';
        $locale.NUMBER_FORMATS.DECIMAL_SEP = ',';

        //#region helper methods
        function getCaretPosition(inputField) {
            // Initialize
            var position = 0;
            // IE Support
            if (document.selection) {
                inputField.focus();
                // To get cursor position, get empty selection range
                var emptySelection = document.selection.createRange();
                // Move selection start to 0 position
                emptySelection.moveStart('character', -inputField.value.length);
                // The caret position is selection length
                position = emptySelection.text.length;
            } else if (inputField.selectionStart || inputField.selectionStart === 0) {
                position = inputField.selectionStart;
            }
            return position;
        }

        function setCaretPosition(inputElement, position) {
            if (inputElement.createTextRange) {
                var range = inputElement.createTextRange();
                range.move('character', position);
                range.select();
            } else {
                if (inputElement.selectionStart) {
                    inputElement.focus();
                    inputElement.setSelectionRange(position, position);
                } else {
                    inputElement.focus();
                }
            }
        }

        function countNonNumericChars(value) {
            return (value.match(/[^0-9]/gi) || []).length;
        }

        //#endregion helper methods

        return {
            require: "ngModel",
            restrict: "A",
            link: function ($scope, element, attrs, ctrl) {
                var fractionSize = parseInt(attrs['fractionSize']) || 0;
                var numberFilter = $filter('number');
                // var numberFilter = accounting.format;
                //format the view value
                ctrl.$formatters.push(function (modelValue) {
                    var retVal = numberFilter(modelValue, fractionSize);
                    var isValid = !isNaN(modelValue);
                    ctrl.$setValidity(attrs.name, isValid);
                    return retVal;
                });
                //parse user's input
                ctrl.$parsers.push(function (viewValue) {
                    var caretPosition = getCaretPosition(element[0]), nonNumericCount = countNonNumericChars(viewValue);
                    //Replace all possible group separators
                    var trimmedValue = viewValue.trim().replace(/\./g, '').replace(/`/g, '').replace(/'/g, '').replace(/\u00a0/g, '').replace(/ /g, '');
                    viewValue = viewValue || '';
                    //If numericValue contains more decimal places than is allowed by fractionSize, then numberFilter would round the value up
                    //Thus 123.109 would become 123.11
                    //We do not want that, therefore I strip the extra decimal numbers
                    var separator = ',';
                    var arr = trimmedValue.split(separator);
                    var decimalPlaces = arr[1];
                    if (decimalPlaces != null && decimalPlaces.length > fractionSize) {
                        //Trim extra decimal places
                        decimalPlaces = decimalPlaces.substring(0, fractionSize);
                        trimmedValue = arr[0] + '.' + decimalPlaces;
                    }
                    var numericValue = parseFloat(trimmedValue.trim().replace(/,/g, '.'));
                    var isEmpty = numericValue == null || viewValue.trim() === "";
                    var isRequired = attrs.required || false;
                    var isValid = true;
                    if (isEmpty && isRequired || !isEmpty && isNaN(numericValue)) {
                        isValid = false;
                    }
                    ctrl.$setValidity(attrs.name, isValid);
                    if (!isNaN(numericValue) && isValid) {
                        var newViewValue = numberFilter(numericValue, fractionSize);
                        // var newViewValue = accounting.formatMoney(numericValue, "", 0, ".", ",");
                        element.val(newViewValue);
                        var newNonNumbericCount = countNonNumericChars(newViewValue);
                        var diff = newNonNumbericCount - nonNumericCount;
                        var newCaretPosition = caretPosition + diff;
                        // if (nonNumericCount === 0 && newCaretPosition > 0) newCaretPosition--;
                        setCaretPosition(element[0], newCaretPosition);
                    }
                    return !isNaN(numericValue) ? numericValue : null;
                });
            } //end of link function
        };
    }

    function includeReplace() {
        var directive = {
            require: 'ngInclude',
            restrict: 'A',
            link: link
        }
        return directive;

        function link(scope, element, attrs) {
            element.replaceWith(element.children());
        }
    }

//Prevent click if href="#"
    function preventClickDirective() {
        var directive = {
            restrict: 'E',
            link: link
        }
        return directive;

        function link(scope, element, attrs) {
            if (attrs.href === '#') {
                element.on('click', function (event) {
                    event.preventDefault();
                });
            }
        }
    }

//Bootstrap Collapse
    function bootstrapCollapseDirective() {
        var directive = {
            restrict: 'E',
            link: link
        }
        return directive;

        function link(scope, element, attrs) {
            if (attrs.toggle == 'collapse') {
                element.attr('href', 'javascript;;').attr('data-target', attrs.href.replace('index.html', ''));
            }
        }
    }

    /**
     * @desc Genesis main navigation - Siedebar menu
     * @example <li class="nav-item nav-dropdown"></li>
     */
    function navigationDirective() {
        var directive = {
            restrict: 'E',
            link: link
        }
        return directive;

        function link(scope, element, attrs) {
            if (element.hasClass('nav-dropdown-toggle') && angular.element('body').width() > 782) {
                element.on('click', function () {
                    if (!angular.element('body').hasClass('compact-nav')) {
                        element.parent().toggleClass('open').find('.open').removeClass('open');
                    }
                });
            } else if (element.hasClass('nav-dropdown-toggle') && angular.element('body').width() < 783) {
                element.on('click', function () {
                    element.parent().toggleClass('open').find('.open').removeClass('open');
                });
            }
        }
    }

//Dynamic resize .sidebar-nav
    sidebarNavDynamicResizeDirective.$inject = ['$window', '$timeout'];

    function sidebarNavDynamicResizeDirective($window, $timeout) {
        var directive = {
            restrict: 'E',
            link: link
        }
        return directive;

        function link(scope, element, attrs) {

            if (element.hasClass('sidebar-nav') && angular.element('body').hasClass('fixed-nav')) {
                var bodyHeight = angular.element(window).height();
                scope.$watch(function () {
                    var headerHeight = angular.element('header').outerHeight();

                    if (angular.element('body').hasClass('sidebar-off-canvas')) {
                        element.css('height', bodyHeight);
                    } else {
                        element.css('height', bodyHeight - headerHeight);
                    }
                })

                angular.element($window).bind('resize', function () {
                    var bodyHeight = angular.element(window).height();
                    var headerHeight = angular.element('header').outerHeight();
                    var sidebarHeaderHeight = angular.element('.sidebar-header').outerHeight();
                    var sidebarFooterHeight = angular.element('.sidebar-footer').outerHeight();

                    if (angular.element('body').hasClass('sidebar-off-canvas')) {
                        element.css('height', bodyHeight - sidebarHeaderHeight - sidebarFooterHeight);
                    } else {
                        element.css('height', bodyHeight - headerHeight - sidebarHeaderHeight - sidebarFooterHeight);
                    }
                });
            }
        }
    }

//LayoutToggle
    layoutToggleDirective.$inject = ['$interval'];

    function layoutToggleDirective($interval) {
        var directive = {
            restrict: 'E',
            link: link
        }
        return directive;

        function link(scope, element, attrs) {
            element.on('click', function () {

                if (element.hasClass('sidebar-toggler')) {
                    angular.element('body').toggleClass('sidebar-hidden');
                }

                if (element.hasClass('aside-menu-toggler')) {
                    angular.element('body').toggleClass('aside-menu-hidden');
                }
            });
        }
    }

//Collapse menu toggler
    function collapseMenuTogglerDirective() {
        var directive = {
            restrict: 'E',
            link: link
        }
        return directive;

        function link(scope, element, attrs) {
            element.on('click', function () {
                if (element.hasClass('navbar-toggler') && !element.hasClass('layout-toggler')) {
                    angular.element('body').toggleClass('sidebar-mobile-show')
                }
            })
        }
    }

//Bootstrap Carousel
    function bootstrapCarouselDirective() {
        var directive = {
            restrict: 'E',
            link: link
        }
        return directive;

        function link(scope, element, attrs) {
            if (attrs.ride == 'carousel') {
                element.find('a').each(function () {
                    $(this).attr('data-target', $(this).attr('href').replace('index.html', '')).attr('href', 'javascript;;')
                });
            }
        }
    }

//Bootstrap Tooltips & Popovers
    function bootstrapTooltipsPopoversDirective() {
        var directive = {
            restrict: 'A',
            link: link
        }
        return directive;

        function link(scope, element, attrs) {
            if (attrs.toggle == 'tooltip') {
                angular.element(element).tooltip();
            }
            if (attrs.toggle == 'popover') {
                angular.element(element).popover();
            }
        }
    }

//Bootstrap Tabs
    function bootstrapTabsDirective() {
        var directive = {
            restrict: 'A',
            link: link
        }
        return directive;

        function link(scope, element, attrs) {
            element.click(function (e) {
                e.preventDefault();
                angular.element(element).tab('show');
            });
        }
    }

//Card Collapse
    function cardCollapseDirective() {
        var directive = {
            restrict: 'E',
            link: link
        }
        return directive;

        function link(scope, element, attrs) {
            if (attrs.toggle == 'collapse' && element.parent().hasClass('card-actions')) {

                if (element.parent().parent().parent().find('.card-body').hasClass('in')) {
                    element.find('i').addClass('r180');
                }

                var id = 'collapse-' + Math.floor((Math.random() * 1000000000) + 1);
                element.attr('data-target', '#' + id)
                element.parent().parent().parent().find('.card-body').attr('id', id);

                element.on('click', function () {
                    element.find('i').toggleClass('r180');
                })
            }
        }
    }

// For Formate Currency
    (function ($) {
        $.fn.priceFormat = function (options) {
            var defaults = {
                prefix: 'Rp ',
                suffix: '',
                centsSeparator: ',',
                thousandsSeparator: '.',
                limit: false,
                centsLimit: 2,
                clearPrefix: false,
                clearSufix: false,
                allowNegative: false,
                insertPlusSign: false
            };
            var options = $.extend(defaults, options);
            return this.each(function () {
                var obj = $(this);
                var is_number = /[0-9]/;
                var prefix = options.prefix;
                var suffix = options.suffix;
                var centsSeparator = options.centsSeparator;
                var thousandsSeparator = options.thousandsSeparator;
                var limit = options.limit;
                var centsLimit = options.centsLimit;
                var clearPrefix = options.clearPrefix;
                var clearSuffix = options.clearSuffix;
                var allowNegative = options.allowNegative;
                var insertPlusSign = options.insertPlusSign;
                if (insertPlusSign) allowNegative = true;

                function to_numbers(str) {
                    var formatted = '';
                    for (var i = 0; i < (str.length); i++) {
                        char_ = str.charAt(i);
                        if (formatted.length == 0 && char_ == 0) char_ = false;
                        if (char_ && char_.match(is_number)) {
                            if (limit) {
                                if (formatted.length < limit) formatted = formatted + char_
                            } else {
                                formatted = formatted + char_
                            }
                        }
                    }
                    return formatted
                }

                function fill_with_zeroes(str) {
                    while (str.length < (centsLimit + 1)) str = '0' + str;
                    return str
                }

                function price_format(str) {
                    var formatted = fill_with_zeroes(to_numbers(str));
                    var thousandsFormatted = '';
                    var thousandsCount = 0;
                    if (centsLimit == 0) {
                        centsSeparator = "";
                        centsVal = ""
                    }
                    var centsVal = formatted.substr(formatted.length - centsLimit, centsLimit);
                    var integerVal = formatted.substr(0, formatted.length - centsLimit);
                    formatted = (centsLimit == 0) ? integerVal : integerVal + centsSeparator + centsVal;
                    if (thousandsSeparator || $.trim(thousandsSeparator) != "") {
                        for (var j = integerVal.length; j > 0; j--) {
                            char_ = integerVal.substr(j - 1, 1);
                            thousandsCount++;
                            if (thousandsCount % 3 == 0) char_ = thousandsSeparator + char_;
                            thousandsFormatted = char_ + thousandsFormatted
                        }
                        if (thousandsFormatted.substr(0, 1) == thousandsSeparator) thousandsFormatted = thousandsFormatted.substring(1, thousandsFormatted.length);
                        formatted = (centsLimit == 0) ? thousandsFormatted : thousandsFormatted + centsSeparator + centsVal
                    }
                    if (allowNegative && (integerVal != 0 || centsVal != 0)) {
                        if (str.indexOf('-') != -1 && str.indexOf('+') < str.indexOf('-')) {
                            formatted = '-' + formatted
                        } else {
                            if (!insertPlusSign) formatted = '' + formatted; else formatted = '+' + formatted
                        }
                    }
                    if (prefix) formatted = prefix + formatted;
                    if (suffix) formatted = formatted + suffix;
                    return formatted
                }

                function key_check(e) {
                    var code = (e.keyCode ? e.keyCode : e.which);
                    var typed = String.fromCharCode(code);
                    var functional = false;
                    var str = obj.val();
                    var newValue = price_format(str + typed);
                    if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105)) functional = true;
                    if (code == 8) functional = true;
                    if (code == 9) functional = true;
                    if (code == 13) functional = true;
                    if (code == 46) functional = true;
                    if (code == 37) functional = true;
                    if (code == 39) functional = true;
                    if (allowNegative && (code == 189 || code == 109)) functional = true;
                    if (insertPlusSign && (code == 187 || code == 107)) functional = true;
                    if (!functional) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (str != newValue) obj.val(newValue)
                    }
                }

                function price_it() {
                    var str = obj.val();
                    var price = price_format(str);
                    if (str != price) obj.val(price)
                }

                function add_prefix() {
                    var val = obj.val();
                    obj.val(prefix + val)
                }

                function add_suffix() {
                    var val = obj.val();
                    obj.val(val + suffix)
                }

                function clear_prefix() {
                    if ($.trim(prefix) != '' && clearPrefix) {
                        var array = obj.val().split(prefix);
                        obj.val(array[1])
                    }
                }

                function clear_suffix() {
                    if ($.trim(suffix) != '' && clearSuffix) {
                        var array = obj.val().split(suffix);
                        obj.val(array[0])
                    }
                }

                $(this).bind('keydown.price_format', key_check);
                $(this).bind('keyup.price_format', price_it);
                $(this).bind('focusout.price_format', price_it);
                if (clearPrefix) {
                    $(this).bind('focusout.price_format', function () {
                        clear_prefix()
                    });
                    $(this).bind('focusin.price_format', function () {
                        add_prefix()
                    })
                }
                if (clearSuffix) {
                    $(this).bind('focusout.price_format', function () {
                        clear_suffix()
                    });
                    $(this).bind('focusin.price_format', function () {
                        add_suffix()
                    })
                }
                if ($(this).val().length > 0) {
                    price_it();
                    clear_prefix();
                    clear_suffix()
                }
            })
        };
        $.fn.unpriceFormat = function () {
            return $(this).unbind(".price_format")
        };
        $.fn.unmask = function () {
            var field = $(this).val();
            var result = "";
            for (var f in field) {
                if (!isNaN(field[f]) || field[f] == "-") result += field[f]
            }
            return result
        }
    })(jQuery);

})();
