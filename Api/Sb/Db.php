<?php
class Sb_Db
{
	const HOST = 'localhost';
	const USER = 'root';
	const PWD = '';
	const DB_NAME = 'sb';
	
	private static $_instance;
	private $_conn;
	
	public static function getInstance()
	{
		if(self::$_instance === null){
			self::$_instance = new self();
		}
	
		return self::$_instance;
	}
	
	private function __construct()
	{
		try{
			$this->_conn = new mysqli(self::HOST, self::USER, self::PWD, self::DB_NAME);
		}catch (mysqli_sql_exception $e){
			var_dump($e->getMessage());
		}
		if ($this->_conn->connect_errno) {
			echo "Failed to connect to MySQL: (" . $this->_conn->connect_errno . ") " . $this->_conn->connect_error;
		}
	}
	
	public function getConn()
	{
		return $this->_conn;
	}
	
	public  function __destruct()
	{
		$this->_conn->close();
	}
}