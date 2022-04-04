<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("config.php");
try{
	
	 /* GENERATE RANDOM CODE */
	 $tokenNew = md5(microtime());

	// Grab JSON object from Form
	$data = json_decode(file_get_contents('php://input'), true);
	// Grab Your Value from Json object
	$dataName=json_encode($data['name']);
	$dataPhone=json_encode($data['phone']);
	$dataCompany=json_encode($data['company']);
	$dataAddress=json_encode($data['address']);
	$dataPassword=json_encode($data['rpassword']);
	$dataEmail=json_encode($data['email']);

	// Replace quotes form the data
	$name=str_replace('"',"",$dataName);
	$phone=str_replace('"',"",$dataPhone);
	$company=str_replace('"',"",$dataCompany);
	$address=str_replace('"',"",$dataAddress);
	$password=str_replace('"',"",$dataPassword);
	$email=str_replace('"',"",$dataEmail);

	if($name === '' || $phone === '' || $company === '' || $address === '' || $password === '' || $email === ''){
		echo json_encode(array("status" => "error", "message" => 'Some fields are empty'));
	}
	else{
		
		$query = $conn->prepare( "SELECT `email` FROM `members` WHERE `email` = ?" );
		$query->bindValue( 1, $email );
		$query->execute();

		if( $query->rowCount() > 0 ) { # If rows are found for query
			echo json_encode(array("status" => 'error', "message" => "Email already exist" ));
		}
		else {
			//echo json_encode(array("status" => 'success', "message" => "Email is unique" ));
			$sqlU = "INSERT INTO members
			SET 
			name=:name, 
			phone=:phone,
			company=:company,
			address=:address,
			password=:password,
			email=:email,
			auth=:auth";

			$queryU = $conn->prepare($sqlU);
			$queryU->bindParam(':name', $name);
			$queryU->bindParam(':phone', $phone);
			$queryU->bindParam(':company', $company);
			$queryU->bindParam(':address', $address);
			$queryU->bindParam(':password', $password);
			$queryU->bindParam(':email', $email);
			$queryU->bindParam(':auth', $tokenNew);
			if($queryU->execute())
			{
				echo json_encode(array("status" => "success", "message" => 'User registration is Successful'));
			}
			else
			{
				echo json_encode(array("status" => "error", "message" => 'Something Went Wrong'));
			}
		}
	}

	
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}


?>