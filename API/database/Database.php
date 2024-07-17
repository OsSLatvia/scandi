<?php
namespace API\database;
require_once __DIR__ . '/../config.php';

class Database{
    private $dbhost  = "localhost";
    private $dbuser = "root";
    private $dbpass =  "";
    private $db = "scandiweb";
    public $conn;
    public $stmt;

    function openCon()
    {
        $this->conn = new \mysqli($this->dbhost, $this->dbuser, $this->dbpass,$this->db) or die("Connect failed: %s\n". $this->conn -> error);
    }
    function closeCon()
    {
        $this->conn -> close();
    }
}
?>