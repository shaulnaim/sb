<?php

class Admin_Controller_Auth extends Admin_Controller_Base
{

	public function loginAction()
	{

	}

	public function logoutAction()
	{
		
	}


	public function authenticateAction()
	{
		return new Admin_Model_User();
	}
}