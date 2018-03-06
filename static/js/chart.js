 (function(){  
var app = angular.module('myApp', ['zingchart-angularjs']);

app.controller('MainController', function($scope, $http, $window) {
  $scope.getChart = function(){
      
      $http.get('/api/').then(function(response){
      $scope.coutGR = 0;
      $scope.coutVE = 0;
      $scope.coutMI = 0;
      $scope.coutEN = 0;
      console.log(response.data);
      if(!$scope.from_date){
        $scope.from_date = new Date(1990,00,01);
      }
      if(!$scope.to_date){
        $scope.to_date = new Date();
      }
      var from_date = Date.parse($scope.from_date);
      var to_date = Date.parse($scope.to_date);
      for(var i=0;i<response.data.length;i++){
        var date = new Date(response.data[i].time);
        var date2 = Date.parse(date)
        if(date2 >= from_date && date2 <= to_date) {
             if(response.data[i].expense_category == "GR"){
          $scope.coutGR +=parseInt(response.data[i].cash);
        }
        else if(response.data[i].expense_category == "VE"){
          $scope.coutVE +=parseInt(response.data[i].cash);
        }
        else if(response.data[i].expense_category == "MI"){
          $scope.coutEN +=parseInt(response.data[i].cash);
        }
        else if(response.data[i].expense_category == "EN"){
          $scope.coutMI +=parseInt(response.data[i].cash);
        }
        }
        

      }
      $('#chart-1').addClass('act');
      
      console.log($scope.coutVE );
      console.log($scope.coutMI );
      console.log($scope.coutGR );
      console.log($scope.coutEN );
      if($scope.coutVE ==0 &&$scope.coutMI==0&&$scope.coutEN==0&&$scope.coutGR==0){
        $window.alert("No graph available for this date range.")
        return;
      }
          $scope.myJson = {
        globals: {
            shadow: false,
            fontFamily: "Verdana",
            fontWeight: "100"
        },
        type: "pie",
        backgroundColor: "#fff",

        legend: {
            layout: "x5",
            position: "50%",
            borderColor: "transparent",
            marker: {
                borderRadius: 10,
                borderColor: "transparent"
            }
        },
        tooltip: {
            text: "$%v amount"
        },
        plot: {
            refAngle: "-90",
            borderWidth: "0px",
            valueBox: {
                placement: "in",
                text: "%npv %",
                fontSize: "15px",
                textAlpha: 1,
            }
        },
       series: [{
              text: "Grocery",
              values: [$scope.coutGR],
              backgroundColor: "#FA6E6E #FA9494",
          }, {
              text: "Vechicle",
              values: [$scope.coutVE],
              backgroundColor: "#F1C795 #feebd2"
          }, {
              text: "Entertainment",
              values: [$scope.coutEN],
              backgroundColor: "#FDAA97 #FC9B87"
          }, {
              text: "Miscellaneous",
              values: [$scope.coutMI],
              backgroundColor: "#28C2D1"
          }, ]
    };
    });
      

    };
  

});

})();  