<?php

namespace API\Controller;

use API\database\Database;
use API\model\Product;
use API\Model\DVD;
use API\Model\Book;
use API\Model\Furniture;
require_once __DIR__ . '/../database/Database.php';
require_once __DIR__ . '/../model/Product.php';
require_once __DIR__ . '/../model/DVD.php';
require_once __DIR__ . '/../model/Book.php';
require_once __DIR__ . '/../model/Furniture.php';
require_once __DIR__ . '/../config.php';

class ProductController {
    
    private $db;

    public function __construct() {
        $this->db = new Database();
    }
    public function handleRequest() {
        $action = isset($_GET['action']) ? $_GET['action'] : null;

        switch ($action) {
            case 'getProducts':
                $this->getProducts();
                break;
            case 'addProduct':
                $this->addProduct($_POST); // Assuming you are sending data via POST
                break;
            case 'deleteProduct':
                $this->deleteProduct($_POST); // Assuming you are sending data via POST
                break;
            default:
                http_response_code(400); // Bad Request
                echo json_encode(["error" => "Invalid action"]);
        }
    }

    public function addProduct($postData) {
        $this->db->openCon();

        $productType = $postData['productType'];

        // Create the attribute map
        $attributeMap = [
            'DVD' => $postData['size'],
            'Book' => $postData['weight'],
            'Furniture' => [
                $postData['height'],
                $postData['width'],
                $postData['length']
            ]
        ];

        // Instantiate the correct product class
        $classMap = [
            'DVD' => \API\model\DVD::class,
            'Book' => \API\model\Book::class,
            'Furniture' => \API\model\Furniture::class
        ];

        if (array_key_exists($productType, $classMap)) {
            $productClass = $classMap[$productType];
            $product = new $productClass();
            $product->setSKU($postData['sku']);
            $product->setName($postData['name']);
            $product->setPrice($postData['price']);
            $product->setType($productType);
            $product->setAttributes($attributeMap[$productType]);
            $product->addProduct($this->db->conn);
        } else {
            echo json_encode(["error" => "Invalid product type"]);
            http_response_code(400); // Bad Request
        }

        $this->db->closeCon();
    }

    public function deleteProduct($postData) {
        $this->db->openCon();
        foreach ($postData['deleteCheckbox'] as $sku) {
            Product::deleteProduct($this->db->conn, $sku);
        }
        $this->db->closeCon();
    }

    public function getProducts() {
        $this->db->openCon();
        echo Product::getProducts($this->db->conn);
        $this->db->closeCon();
    }
}
$controller = new ProductController();
$controller->handleRequest();
?>
