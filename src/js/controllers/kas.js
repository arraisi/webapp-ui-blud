angular
    .module('app', ['toaster', 'ngAnimate', 'datatables','fcsa-number','ngMask'])
    .controller('KasController', function ($scope,$filter, toaster,kasService,globalService) {
        
        $scope.tahun = localStorage.getItem('tahunAnggaran');
        const local = JSON.parse(localStorage.getItem('currentUser'));

        $scope.readonlySaldo = false;
        //formBuild
        $scope.formData;
        $scope.valData;
        $scope.amount;
        $scope.updateData;

        $scope.price;

        $scope.pop = function () {
            toaster.pop('info', "title", "text");
        };
        
        /** Load Pendapatan */
        globalService.serviceGetData(`/blud-resource-server/api/kasController/findAll`, {
            tahunAnggaran: $scope.tahun,
            skpdId: local.pengguna.skpdId
        }, function (result) {
            console.log('Result Data Load Kas');
            console.log(result.data);
            $scope.valData = result.data
            if (result.status === 200) {
            } else {
                console.log('Response Result Load Pendapatan');
                console.log(result);
            }
        });

            
        /** Load SKPD By ID SKPD */
        globalService.serviceGetData(`/blud-resource-server/api/skpd/${local.pengguna.skpdId}`, null, function (result) {
            console.log('Result Data Detail SKPD');
            console.log(result.data);
            if (result.status === 200) {
                console.log('Response Result Detail SKPD');
                console.log(result);
                $scope.skpdDetail = result.data;
                console.log('Value Data Load Detail SKPD :');
            } else {
                console.log('Response Result Load Detail SKPD');
                console.log(result);
            }
        });

        $scope.getTotal = function(){
            var total = 0;
            angular.forEach($scope.valData, function(value, key) {
                $scope.amount = value
                var saldo = $scope.amount.vkasAudited
                
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
