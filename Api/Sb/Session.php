<?php
class Sb_Session
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
		session_start();
	}

	public function __get($paramName)
	{
		return $_SESSION[$paramName];
	}

	public function __set($paramName, $paramVal)
	{
		$_SESSION[$paramName] = $paramVal;
	}

	public function __destruct()
	{
		session_destroy();
	}
}