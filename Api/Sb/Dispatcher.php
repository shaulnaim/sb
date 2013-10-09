<?php

class Sb_Dispatcher
{
	private static $_instance = null;

	public static function getInstance()
	{
		if(self::$_instance === null){
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	private function __construct()
	{
		function __autoload($className)
		{
			require_once str_replace('_', DIRECTORY_SEPARATOR, $className).'.php';
		}
	}

	public function run()
	{
		$http = Sb_Http::getInstance();
		$controllerName = ucfirst($http->getModuleName()).'_Controller_'.ucfirst($http->getControllerName());
		$ctrl = new $controllerName();
		$actionName = $http->getActionName().'Action';
		return $ctrl->$actionName();
	}
}