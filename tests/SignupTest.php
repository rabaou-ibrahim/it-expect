<?php declare(strict_types=1);
    require './controllers/UsersController.php';
    use PHPUnit\Framework\TestCase;
    

use function PHPUnit\Framework\assertEquals;

    class SignupTest extends TestCase {
        public function testIsNotTakenLogin():void
        {
            $cntrl = new UsersController;
            $_POST['login'] = 'test2';
            
            $messages=$cntrl->verifyRegFields(htmlspecialchars($_POST['login']));
            assertEquals(true,$messages['success'],'Le login n existe pas donc doit renvoyer:true');
        }
        public function testIsTakenLogin():void
        {
            $cntrl = new UsersController;
            $_POST['login'] = 'test';
            
            $messages=$cntrl->verifyRegFields(htmlspecialchars($_POST['login']));
            assertEquals(false,$messages['success'],'Le login existe donc doit renvoyer:false');
        }
    }
