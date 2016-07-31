angular.module('redlineDirective', [])
  .controller('Controller', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
    $scope.redlinedata = {
      content: '<del>deleted</del> <insacc>accepted</insacc> <ins>inserted</ins>'
    };

    $scope.editComplete = function($event) {
      [].forEach.call($event.currentTarget.querySelectorAll('del'), function(el) {
        el.style.display = '';
      });
      // var startState = $event.currentTarget.cloneNode(true);
      // console.log('startState ', startState.innerHTML);

      // while (startState.childNodes.length) {
      //   startState.removeChild(startState.childNodes[0])
      // }
      [].forEach.call($event.currentTarget.querySelectorAll('ins'), function(el) {
        var text = el.textContent;
        el.innerHTML = '';
        var result = '';
        text.split(' ').forEach( function(element, index) {
            var newEl = document.createElement('ins');
            newEl.textContent = element;
            result += newEl.outerHTML + ' ';
        });
        el.outerHTML = result;
      })
      console.log('startState ', startState.innerHTML);
      $scope.redlinedata.content = $event.currentTarget.innerHTML;
      $scope.redlinedata.html = $sce.trustAsHtml($scope.redlinedata.content)
    }

    // $scope.editContent = function($event) {
    //   var startState = $event.currentTarget.clone();
    //   console.log('startState ', startState);

    //   while (startState.childNodes.length) {
    //     startState.removeChild(startState.childNodes[0])
    //   }
    //   console.log('startState ', startState);

    // }

    $scope.editStart = function($event) {
      [].forEach.call($event.currentTarget.querySelectorAll('del'), function(el) {
        el.style.display = 'none';
      })
    }
    $scope.sendRequest = function($event) {
      var action = $event.currentTarget.getAttribute('title');
      var data = {
        content: $scope.redlinedata.content
      };
      console.log('data ', data);
      $http.post('https://testing.smashdocs.net/documents/12345/' + action, data).then(function(resp) {
        console.log(resp);
      }, function(resp) {
        console.error(resp);
      })


    };
    $scope.redlinedata.html = $sce.trustAsHtml($scope.redlinedata.content);
  }])
  .directive('section', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/section.html',
      link: function(scope, element, attr) {
        contentElement = angular.element(element[0].getElementsByClassName('content'));
      }
    };
  });
