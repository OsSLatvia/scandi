<?php
namespace API\model;
require_once __DIR__ . '/../config.php';


abstract class Product {
    private $sku;
    private $name;
    private $price;
    private $type;

    abstract public function setAttributes($attributes);
    abstract public function addProduct($conn);

    public function setSKU($sku) {
        $this->sku = $sku;
    }

    public function getSKU() {
        return $this->sku;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getName() {
        return $this->name;
    }

    public function setPrice($price) {
        $this->price = $price;
    }

    public function getPrice() {
        return $this->price;
    }

    public function setType($type){
        $this->type = $type;
    }

    public function getType(){
        return $this->type;
    }
    
    public static function getProducts($conn) {
        $sql = "SELECT * FROM `product`;";
        $result = $conn->query($sql);
        $emparray = array();
        while($row = mysqli_fetch_assoc($result)) {
            $emparray[] = $row;
        }
        return json_encode($emparray);
    }

    public static function deleteProduct($conn, $SKU) {
        $sql = "DELETE FROM product WHERE SKU = ?;";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $SKU);
        $stmt->execute();
        $stmt->close();
    }
}

// class DVD extends Product {
//     private $size;

//     public function setAttribute($size) {
//         $this->size = $size;
//     }

//     public function getSize() {
//         return $this->size;
//     }

//     public function addProduct($conn) {
//         $null = null;
//         $sku = $this->getSKU();
//         $name = $this->getName();
//         $price = $this->getPrice();
//         $size = $this->getSize();
//         $type = $this->getType();

//         $sql = "INSERT INTO products (`SKU`, `name`, `price`, `type`, `size`, `weight`, `height`, `width`, `length`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
//         $stmt = $conn->prepare($sql);
//         $stmt->bind_param("ssdsddddd", $sku, $name, $price, $type, $size, $null, $null, $null, $null);

//         try {
//             $stmt->execute();
//             echo "DVD added successfully";
//         } catch (Exception $e) {
//             if ($e->getCode() == DUPLICATE_KEY_ERROR_CODE) {
//                 throw new Exception("SKU must be unique");
//             } else {
//                 throw $e; // Propagate other exceptions
//             }
//         }

//         $stmt->close();
//     }
// }

// class Book extends Product {
//     private $weight;

//     public function setAttribute($weight) {
//         $this->weight = $weight;
//     }

//     public function getWeight() {
//         return $this->weight;
//     }

//     public function addProduct($conn) {
//         $null = null;
//         $sku = $this->getSKU();
//         $name = $this->getName();
//         $price = $this->getPrice();
//         $weight = $this->getWeight();
//         $type = $this->getType();

//         $sql = "INSERT INTO products (`SKU`, `name`, `price`, `type`, `size`, `weight`, `height`, `width`, `length`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
//         $stmt = $conn->prepare($sql);
//         $stmt->bind_param("ssdsddddd", $sku, $name, $price, $type, $null, $weight, $null, $null, $null);

//         try {
//             $stmt->execute();
//             echo "Book added successfully";
//         } catch (Exception $e) {
//             if ($e->getCode() == DUPLICATE_KEY_ERROR_CODE) {
//                 throw new Exception("SKU must be unique");
//             } else {
//                 throw $e; // Propagate other exceptions
//             }
//         }

//         $stmt->close();
//     }
// }

// class Furniture extends Product {
//     private $height;
//     private $width;
//     private $length;

//     public function setAttribute($attributes) {
//         $this->height = $attributes[0];
//         $this->width = $attributes[1];
//         $this->length = $attributes[2];
//     }

//     public function getHeight() {
//         return $this->height;
//     }

//     public function getWidth() {
//         return $this->width;
//     }

//     public function getLength() {
//         return $this->length;
//     }

//     public function addProduct($conn) {
//         $null = null;
//         $sku = $this->getSKU();
//         $name = $this->getName();
//         $price = $this->getPrice();
//         $height = $this->getHeight();
//         $width = $this->getWidth();
//         $length = $this->getLength();
//         $type = $this->getType(); 

//         $sql = "INSERT INTO products (`SKU`, `name`, `price`, `type`, `size`, `weight`, `height`, `width`, `length`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
//         $stmt = $conn->prepare($sql);
//         $stmt->bind_param("ssdsddddd", $sku, $name, $price, $type, $null, $null, $height, $width, $length);

//         try {
//             $stmt->execute();
//             echo "Furniture added successfully";
//         } catch (Exception $e) {
//             if ($e->getCode() == DUPLICATE_KEY_ERROR_CODE) {
//                 throw new Exception("SKU must be unique");
//             } else {
//                 throw $e; // Propagate other exceptions
//             }
//         }

//         $stmt->close();
//     }

?>
