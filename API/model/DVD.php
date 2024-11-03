<?php
namespace API\model;

require_once 'Product.php';

class DVD extends Product {
    private $size;

    public function setAttributes($attributes) {
        $this->size = $attributes;
    }
    public function getSize() {
        return $this->size;
    }

    public function addProduct($conn) {
        $null = null; // Placeholder for nullable fields
        $sku = $this->getSKU();
        $name = $this->getName();
        $price = $this->getPrice();
        $type = $this->getType();
        $size = $this->getSize();

        // SQL statement with placeholders
        $sql = "INSERT INTO product (`SKU`, `name`, `price`, `type`, `size`, `weight`, `height`, `width`, `length`) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
        
        // Prepare the SQL statement
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new \Exception("Failed to prepare statement: " . $conn->error);
        }
        
        // Bind parameters securely
        $stmt->bind_param("ssdsddddd", $sku, $name, $price, $type, $size, $null, $null, $null, $null);

        try {
            // Execute the statement
            $stmt->execute();
            echo "test workflow 2: DVD added successfully";
        } catch (\Exception $e) {
            // Handle specific errors if needed
            if ($e->getCode() == DUPLICATE_KEY_ERROR_CODE) {
                echo "SKU must be unique";
                // throw new \Exception("SKU must be unique");
            } else {
                throw $e; // Re-throw other exceptions
            }
        } finally {
            // Always close the statement after execution
            $stmt->close();
        }
    }
}
?>
