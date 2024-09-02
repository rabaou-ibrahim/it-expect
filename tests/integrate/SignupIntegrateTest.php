<?php

declare(strict_types=1);
require './controllers/UsersController.php';

use PHPUnit\Framework\TestCase;
use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertSame;

class SignupIntegrateTest extends TestCase
{
    private static $cntrl;

    protected function setUp(): void

    {
        self::$cntrl = new UsersController;
    }

    public static function tearDownAfterClass(): void
    {
        $um= new UserManager;
        $um-> deleteUser('BABAR');
    }
    public function testRegisterValidation()
        {
            $_POST['login'] = 'BABAR';
            $_POST['firstname'] = 'elephant';
            $_POST['lastname'] = 'eau';
            $_POST['password'] = 'bobo';

            assertSame(true,  self::$cntrl->registerValidation(), 'inscription OK');
        }
}
