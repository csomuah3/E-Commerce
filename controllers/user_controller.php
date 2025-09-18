<?php
// controllers/user_controller.php
require_once __DIR__ . '/../classes/user_class.php';

function register_user_ctr($name, $email, $password, $phone_number, $country, $city, $role = 1)
{
    try {
        error_log("register_user_ctr called with role: " . $role);
        
        $u = new User();
        $result = $u->createUser($name, $email, $password, $phone_number, $country, $city, (int)$role);
        
        error_log("User->createUser returned: " . print_r($result, true));
        
        // If result is an array (new format), return it
        if (is_array($result)) {
            return $result;
        }
        
        // If result is boolean (old format), convert it
        if ($result === true) {
            return ['status' => 'success', 'message' => 'Registration successful'];
        } else {
            return ['status' => 'error', 'message' => 'Registration failed - createUser returned false'];
        }
        
    } catch (Exception $e) {
        error_log("register_user_ctr exception: " . $e->getMessage());
        return ['status' => 'error', 'message' => 'Controller error: ' . $e->getMessage()];
    }
}

function login_user_ctr($email, $password)
{
    try {
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }
        $u = new User();
        return $u->login($email, $password);
    } catch (Exception $e) {
        error_log("login_user_ctr exception: " . $e->getMessage());
        return ['status' => 'error', 'message' => 'Login error: ' . $e->getMessage()];
    }
}

function get_user_by_email_ctr($email)
{
    try {
        $u = new User();
        return $u->getUserByEmail($email);
    } catch (Exception $e) {
        error_log("get_user_by_email_ctr exception: " . $e->getMessage());
        return false;
    }
}