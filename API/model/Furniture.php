<?php
namespace API\model;

require_once 'Product.php';

class Furniture extends Product {
    private $height;
    private $width;
    private $length;

    public function setAttributes($attributes) {
        $this->height = $attributes[0];
        $this->width = $attributes[1];
        $this->length = $attributes[2];
    }
    public function getHeight() {
        return $this->height;
    }
    public function getWidth() {
        return $this->width;
    }
    public function getLength() {
        return $this->length;
    }


    public function addProduct($conn) {
        $null = null; // Placeholder for nullable fields
        $sku = $this->getSKU();
        $name = $this->getName();
        $price = $this->getPrice();
        $type = $this->getType();
        $length = $this->getLength();
        $width = $this->getWidth();
        $height = $this->getHeight();

        $sql = "INSERT INTO product (`SKU`, `name`, `price`, `type`, `size`, `weight`, `height`, `width`, `length`) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssdsddddd", $sku, $name, $price, $type, $null, $null, $height, $width, $length);

        try {
            $stmt->execute();
            echo "Furniture added successfully";
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
