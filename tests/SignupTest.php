<?php

declare(strict_types=1);
require './controllers/UsersController.php';
require_once '/wamp64/www/it-expect/models/Model.php';

use PHPUnit\Framework\Attributes\AfterClass;
use PHPUnit\Framework\TestCase;
use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertFalse;
use function PHPUnit\Framework\assertSame;
use function PHPUnit\Framework\assertTrue;

class SignupTest extends TestCase
{
    private static $cntrl;

    protected function setUp(): void
    {
        self::$cntrl = new UsersController;
    }
    public static function tearDownAfterClass(): void
    {
        $um= new UserManager;
        $login='BABAR';
        $um->deleteUser($login);
            
    }



    public function testIsNotTakenLogin(): void
    {
        $_POST['login'] = 'test2';
        $messages = self::$cntrl->verifyRegFields(htmlspecialchars($_POST['login']));
        assertSame(true, $messages['success'], 'Le login n existe pas donc doit renvoyer:true');
    }
    public function testIsTakenLogin(): void
    {
        $_POST['login'] = 'test';

        $messages = self::$cntrl->verifyRegFields(htmlspecialchars($_POST['login']));
        assertSame(false, $messages['success'], 'Le login existe donc doit renvoyer:false');
    }


    public function testRegisterValidationNew()
    {
        $_POST['login'] = 'BABAR';
        $_POST['firstname'] = 'elephant';
        $_POST['lastname'] = 'eau';
        $_POST['password'] = 'bobo';

        assertSame(true,  self::$cntrl->registerValidation(), 'inscription NOK');
    }
    public function testRegisterValidationIfExist()
    {
        $_POST['login'] = 'BABAR';
        $_POST['firstname'] = 'elephant';
        $_POST['lastname'] = 'eau';
        $_POST['password'] = 'bobo';
        for($i=0;$i<1;$i++){
           $result = self::$cntrl->registerValidation(); 
        }
             assertFalse($result , 'inscription OK');
        
        
    }
}
