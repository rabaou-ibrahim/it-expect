<?php

declare(strict_types=1);
require './controllers/UsersController.php';

use PHPUnit\Framework\TestCase;
use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertSame;

class SignupUnitTest extends TestCase
{
    private static $cntrl;

    protected function setUp(): void
    {
        self::$cntrl = new UsersController;
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
}
