<?php
namespace API\model;

require_once 'Product.php';

class Book extends Product {
    private $weight;

    public function setAttributes($attributes) {
        $this->weight = $attributes;
    }
    public function getWeight() {
        return $this->weight;
    }


    public function addProduct($conn) {
        $null = null; // Placeholder for nullable fields
        $sku = $this->getSKU();
        $name = $this->getName();
        $price = $this->getPrice();
        $type = $this->getType();
        $weight = $this->getWeight();

        $sql = "INSERT INTO product (`SKU`, `name`, `price`, `type`, `size`, `weight`, `height`, `width`, `length`) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssdsddddd", $sku, $name, $price, $type, $null, $weight, $null, $null, $null);

        try {
            $stmt->execute();
            echo "Book added successfully";
        } catch (\Exception $e) {
            if ($e->getCode() == DUPLICATE_KEY_ERROR_CODE) {
                echo "SKU must be unique";
                // throw new \Exception("SKU must be unique");
            } else {
                throw $e;
            }
        }
        $stmt->close();
    }
}
?>
