
var app = angular.module('homepage', ['toastr']);


var Set = function(name) {
	this.name = name;
	this.elements = [];
	this.substitutions = [];
	this.class = 'set';
	this.isSelected = false;
	this.toasted = false;
	this.toastIndex = null;
};

app.controller('setController', ['$scope', 'toastr', function($scope, toastr) {
	this.empty = new Set('empty');
	this.universe = [$scope.set.empty];
	this.formName = '';
	var openToasts = [];

	this.toggle = function (thing) {
		console.log("toggle");
		if (thing.isSelected) {
			thing.isSelected = false;
			thing.class = 'set';
		} else {
			thing.isSelected = true;
			thing.class = "selected";
		}
	}
	
	this.makeSet = function () {
		console.log("make set");
		var newGuy = new Set($scope.set.formName);
		$scope.set.universe.forEach(function(element, index, list){
			element.class = 'set';
			if (element.isSelected) {
				element.isSelected = false;
				newGuy.elements.push(element);
			}
		});
		$scope.set.universe.push(newGuy);
		console.log($scope.set.universe);

	};

	this.toast = function (thing) {
		if (!thing.toasted) {
			thing.toasted = true;
			var msg = "";
			thing.elements.forEach(function(element, i, els) {
				msg += (element.name + ', ');
			});
			openToasts.push(toastr.info(msg, "Known elements in " + thing.name, {
				timeOut: 0,
				onHidden: function(wasClicked, tst) {
					thing.toasted = false;
					var title = tst.scope.title;
					console.log("title of toast: " + title);
					var re = /in (.*)/;
					var hiddenName = title.match(re)[1];
					console.log(hiddenName);
					openToasts.forEach(function(openToast, index, list) {
						var openTitle = openToast.scope.title;
						var openName = openTitle.match(re)[1];;
						if (openName === hiddenName) {
							console.log("toasts matched. Removing: " + hiddenName);
							openToasts.splice(openToasts.indexOf(wasClicked));
							console.log(openToasts);
						}
					});

				},
			}));
		}
	};

}]);