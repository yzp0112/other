angular.module('app',[])
angular.module('app').controller('addressCtrl',['$scope','$http',function($scope,$http){
    /****
     * 获取第一个选择框的值
     */
    $http.get('/api/getAddressData').success(function(res){
        $scope.dataProvince = res.data   
    })
    
    /**
     * 省份选择改变
     */
    $scope.provinceChange = function(){
        var obj = $scope.selProvince
        $http.get('/api/getAddressData?tagName=city&fid='+obj.ProID).success(function(res){
            $scope.dataCity = res.data   
        })
    }

    /**
     * 地市选择改变
     */
    $scope.cityChange = function(){
        var obj = $scope.selCity
        $http.get('/api/getAddressData?tagName=area&fid='+obj.CityID).success(function(res){
            $scope.dataArea = res.data   
        })
    }
}])