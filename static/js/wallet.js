(function(){
	var app = angular.module('wallet', []);
	app.controller('WalletController', function($scope, $http, $window){
		$http.get('/expense/api/').then(function(response){
			$scope.expenseList =[];
			console.log(response.data);
			for(var i=0;i<response.data.length;i++){
				var expense={};
				expense.title = response.data[i].title;
				expense.expense_category = response.data[i].expense_category;
				expense.id = response.data[i].id;
				expense.time = response.data[i].time;
				expense.cash = response.data[i].cash;

				$scope.expenseList.push(expense);
			}
		});
		$scope.category = "";

		$scope.categoryFilter = function(element) {
			if(!$scope.category) return true;
    		return element.expense_category == $scope.category;
  		}

		$scope.saveData = function(){
			var data={title:$scope.expenseInput, expense_category:$scope.expenseCategory, cash:$scope.expenseCash};
			$http.put('/expense/api/', data);
			$window.location.reload();
		};
		$scope.expenseAdd = function(){
			$scope.expenseList.push({title:$scope.expenseInput, expense_category:$scope.expenseCategory, cash:$scope.expenseCash});
			$scope.expenseInput = '';
			$scope.expenseCash = 0;
		};
		
	});
	app.filter('dateRange', function() {
        return function( items, fromDate, toDate ) {
            var filtered = [];
            if (!fromDate && !toDate) {
            	return items;
        	}
        	if(!toDate){
        		toDate = new Date();
        	}
        	if(!fromDate){
        		fromDate = new Date(1990,00,01);
        	}
            var from_date = Date.parse(fromDate);
            var to_date = Date.parse(toDate);
            console.log(from_date,to_date);
            angular.forEach(items, function(item) {
            	var date = new Date(item.time);
            	var date2 = Date.parse(date)
            	console.log(date2);
                if(date2 >= from_date && date2 <= to_date) {
                	console.log("yo");
                    filtered.push(item);
                }
            });
            return filtered;
        };
    	
    });

})();
