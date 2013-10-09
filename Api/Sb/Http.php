<?php

class Sb_Http
{

	const MODULE_INDEX = 0;
	const CONTROLLER_INDEX = 1;
	const ACTION_INDEX = 2;

	private static $_instance = null;

	private $moduleName = 'site';
	private $controllerName = 'index';
	private $actionName = 'index';

	public static function getInstance()
	{
		if(self::$_instance === null){
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	private function __construct()
	{
		$queryString = str_ireplace(dirname($_SERVER["SCRIPT_NAME"]).'/', '', $_SERVER["REQUEST_URI"]);
		$queryStringArr = explode('/', $queryString);
		if(count($queryStringArr) >= 3){
			$this->moduleName = $queryStringArr[self::MODULE_INDEX];
			$this->controllerName = $queryStringArr[self::CONTROLLER_INDEX];
			$this->actionName = $queryStringArr[self::ACTION_INDEX];
		}
	}


	public function getModuleName()
	{
		return $this->moduleName;
	}

	public function getActionName()
	{
		return $this->actionName;
	}

	public function getControllerName()
	{
		return $this->controllerName;
	}

	public function __get($paramName)
	{

	}

	public function __set($paramName, $paramVal)
	{
		
	}


}