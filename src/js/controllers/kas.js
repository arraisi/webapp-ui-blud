angular
    .module('app', ['toaster', 'ngAnimate', 'datatables','fcsa-number','ngMask'])
    .controller('KasController', function ($scope,$filter, toaster,kasService) {
        
        const vm = this;
        $scope.readonlySaldo = false;
        // 
        var myDate = new Date();
        var nextYear = new Date(myDate);
        var skpd = nextYear.setYear(myDate.getFullYear()+1);
 
        $scope.tahun = myDate;
        $scope.skpd = skpd;
        //formBuild
        $scope.formData;
        $scope.valData;
        $scope.amount;
        $scope.updateData;

        $scope.price 

        $scope.pop = function () {
            toaster.pop('info', "title", "text");
        };

        kasService.findDataApi(function (result) {
            if (result.status === 200) {
                $scope.valData = result.data;
                angular.forEach($scope.valData, function(value, key) {
                    $scope.amount = value
                  });
            
            } else {
                console.log('Response Result Datatable Data');
                console.log(result);
            }
        });

        $scope.getTotal = function(){
            var total = 0;
            angular.forEach($scope.valData, function(value, key) {
                $scope.amount = value
                var saldo = $scope.amount.v_KAS_AUDITED
                
                total += (+saldo); //<-- convert to number
                $scope.price = total;
              });
              
            return total;
        }
        
        $scope.saveData = function () {
            $scope.readonlySaldo = false;
            kasService.saveData($scope.valData, function (result) {
                console.log(result.data);
                
                if (result.status === 200) {
                    console.log('Response Result Update Data');
                    console.log(result);
                    toaster.pop({
                        type: 'success',
                        title: 'Berhasil Update Data',
                        body: 'Data Kas Berhasil DiUpdate',
                        timeout: 5000
                    });
                } else {
                    console.log('Response Result Delete Data');
                    console.log(result);
                }
            });
        };

        $scope.suntingAnggaran = function(){
          $scope.readonlySaldo = true;
          
         }

        $scope.pop = function () {
            toaster.pop('info', "title", "text");
        };

        $scope.testToastr = function () {
            console.log('Testing Toastr');
            // toaster.pop('info', "title", "text");
            toaster.pop({
                type: 'error',
                title: 'Title text',
                body: 'Body text',
                timeout: 3000
            });
        }
    }).directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9,.]/g, '');
    
                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }            
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    });