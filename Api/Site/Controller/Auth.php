<?php

class Site_Controller_Auth extends Admin_Controller_Base
{


	public function authenticateAction()
	{
		return new Site_Model_User();
	}
}