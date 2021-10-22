var content_controller = function ($scope, $timeout, $sce) {
    _builder($scope, $timeout);
    setting_builder($scope, $timeout, $sce);

    $scope.monaco_properties = $scope.monaco("python");
    $scope.monaco_properties.minimap = {
        enabled: false
    };

    $scope.event = {};
    $scope.status = {};
    $scope.data = {};

    $.post('/wiz/admin/api/setting/general/framework/packageinfo', {}, function (res) {
        $scope.data = res.data;
        $timeout();
    });

    $scope.event.save = function () {
        var data = angular.copy($scope.data);
        $.post('/wiz/admin/api/setting/general/framework/update', { data: JSON.stringify(data, null, 4) }, function (res) {
            toastr.success("Saved");
        });
    }

    $scope.event.apply = function () {
        var data = angular.copy($scope.data);
        $.post('/wiz/admin/api/setting/general/framework/update', { data: JSON.stringify(data, null, 4) }, function (res) {
            $.post('/wiz/admin/api/setting/general/framework/apply', {}, function (res) {
                toastr.success("Applied");
            });
        });
    }
};