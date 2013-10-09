
var module = angular.module('sb', ['ngResource']);

module.config(['$routeProvider',  function($routeProvider) {
	

	$routeProvider.
	when('/admin/login', {
		controller: 'AdminCtrl',
		templateUrl: 'views/admin/login.html'
	}).when('/admin', {
		controller: 'AdminCtrl',
		templateUrl: 'views/admin/main.html'
	}).when('/site/login', {
		controller: 'SiteCtrl',
		templateUrl: 'views/site/login.html'
	}).otherwise({
		controller: 'SiteCtrl',
		templateUrl: 'views/site/main.html'
	});

}]).controller('AppCtrl', ['$scope', function($scope){

	var moduleName = 'site';

	$scope.setModule = function(currentModule){
		moduleName = currentModule;
		return this;
	};

	$scope.getModule = function(){
		return moduleName;
	};

	$scope.loadScript = function(){
		var pathToRootScript = 'js/'+$scope.getModule()+'/',
			filesName = ['services', 'controllers'],
			i = 0,
			len = filesName.length;

		for(; i < len; ++i){
			angular.element.getScript(pathToRootScript+filesName[i]+'.js');
		}
		return this;
	};

	$scope.loadCss = function(){
		var pathToRootCss = 'css/'+moduleName+'/',
			filesName = ['main'],
			i = 0,
			len = filesName.length,
			link,
			headDom = document.getElementsByTagName('head')[0];

		for(; i < len; ++i){
			var link = document.createElement('link');
		    link.type = 'text/css';
		    link.rel = 'stylesheet';
		    link.href = pathToRootCss+filesName[i]+'.css';
		    headDom.appendChild(link);
		}
		return this;
	};

}]).controller('AdminCtrl', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService){
	var moduleName = 'admin';

	$scope.title = 'Admin ';

	$scope.authModel = {
		email: '',
		pwd: ''
	};

	$scope.setModule(moduleName)
		  .loadScript()
		  .loadCss();

    if(!AuthService.isAuth()){
		$location.path('/admin/login');
	}

}]).controller('AuthCtrl', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService){

	if(AuthService.isAuth()){
		$location.path('/'+$scope.getModule());
		return;
	}

	$scope.title += ' Login';

	$scope.authenticate = function(){
		console.log(AuthService.authenticate($scope.authModel));
	};



}]).controller('SiteCtrl', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService){
	var moduleName = 'site';

	$scope.title = 'Candidate ';

	$scope.authModel = {
		email: '',
		first_name: '',
		last_name: ''
	};

	$scope.setModule(moduleName)
		  .loadScript()
		  .loadCss();

	if(!AuthService.isAuth()){
		$location.path('/site/login');
	}
}]).controller('QuizCtrl', ['$scope', function($scope){


	$scope.pathToTemplate = '';
	$scope.quizStarted = false;
	$scope.candidateDetaile = {
		first_name: 'Steve ',
		last_name: 'Jobs'
	};

	$scope.quiz = {
		subject: 'Js Expert Quiz',
		desc: 'testing deep knowledge of js',
		instruction: 'console is not allowed!!!!'
	};

	$scope.start = function(){
		$scope.quizStarted = true;
		document.getElementById('pre').style.display = 'none'; 
		$scope.pathToQuestionTemplate = 'views/site/question.html';
		$scope.pathToQuestionPagerTemplate = 'views/site/question-pager.html';
	};

	$scope.questions = [
		{id:1, text: 'q 1', answers: [
			{id:1, text: 'a 11'},
			{id:2, text: 'a 12'},
			{id:3, text: 'a 13'},
			{id:4, text: 'a 14'}
		]},

		{id:2, text: 'q 2', answers: [
			{id:1, text: 'a 21'},
			{id:2, text: 'a 22'},
			{id:3, text: 'a 23'},
			{id:4, text: 'a 24'}
		]},

		{id:3, text: 'q 3', answers: [
			{id:1, text: 'a 31'},
			{id:2, text: 'a 32'},
			{id:3, text: 'a 33'},
			{id:4, text: 'a 34'}
		]},

		{id:4, text: 'q 4', answers: [
			{id:1, text: 'a 41'},
			{id:2, text: 'a 42'},
			{id:3, text: 'a 43'},
			{id:4, text: 'a 44'}
		]},

		{id:5, text: 'q 5', answers: [
			{id:1, text: 'a 51'},
			{id:2, text: 'a 52'},
			{id:3, text: 'a 53'},
			{id:4, text: 'a 54'}
		]},

		{id:6, text: 'q 6', answers: [
			{id:1, text: 'a 61'},
			{id:2, text: 'a 62'},
			{id:3, text: 'a 63'},
			{id:4, text: 'a 64'}
		]}
	];

	$scope.questionIndex = 0;

	$scope.getCurrentQuestion = function(){
		return $scope.questions[$scope.questionIndex];
	};

	$scope.setQuestionIndex = function(questionIndex){
		$scope.questionIndex = questionIndex;
	};


}]).controller('QuestionCtrl', ['$scope', function($scope){


	$scope.question = $scope.getCurrentQuestion();

	$scope.$watch('questionIndex', function(){
		$scope.question = $scope.getCurrentQuestion();
	});

}]).controller('QuestionPagerCtrl', ['$scope', function($scope){


	$scope.prevQuestion = function(){
		$scope.setQuestionIndex(--$scope.questionIndex);
	};

	$scope.nextQuestion = function(){
		$scope.setQuestionIndex(++$scope.questionIndex);
	};

	$scope.isLastQuestion = function(){
		return $scope.questionIndex === ($scope.questions.length - 1);
	};

}]);


//==================Auth Service ===============

module.factory('AuthService', function($resource){
	return {
		login: function(){

		},

		logout: function(){

		},

		isAuth: function(){
			return true;
		},

		authenticate: function(data){
			return $resource.post('api/admin/auth/authenticate', data);
		},

		getAuthData: function(){

		}
	};
});