--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `verification`;
DROP TABLE IF EXISTS `passwordresettoken`;
DROP TABLE IF EXISTS `comments`;
DROP TABLE IF EXISTS `notification`;
DROP TABLE IF EXISTS `event`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `phonenumber`;
DROP TABLE IF EXISTS `emailaddress`;

--
-- Table structure for table `phonenumber`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phonenumber` (
  `phone_id` int NOT NULL AUTO_INCREMENT,
  `number` varchar(100) NOT NULL,
  `is_verified` BOOLEAN default(false),  
  `verified_at` TIMESTAMP NOT NULL,
  `verification_code` varchar(24) NOT NULL,
  PRIMARY KEY (`phone_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `emailaddress`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emailaddress` (
  `email_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(512) NOT NULL,
  `is_verified` BOOLEAN default(false),  
  `verified_at` TIMESTAMP NOT NULL,
  `verification_code` varchar(24) NOT NULL,
  PRIMARY KEY (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email_id` int DEFAULT NULL,
  `phone_id` int DEFAULT NULL,
  `address` varchar(256) DEFAULT NULL,
  `notification_preference` varchar(100) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `is_active` boolean DEFAULT NULL,
  `is_verified` boolean DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (email_id) REFERENCES emailaddress(email_id) ON DELETE CASCADE,
  FOREIGN KEY (phone_id) REFERENCES phonenumber(phone_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table `passwordresettoken`
--
CREATE TABLE passwordresettoken (
  preset_token_id INT AUTO_INCREMENT PRIMARY KEY,
  token VARCHAR(255) NOT NULL,
  user_id INT UNIQUE NOT NULL,
  createdAt INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Table structure for table `event`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `event_description` varchar(1000) DEFAULT NULL,
  `venue` varchar(1000) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `ticket_prices` int DEFAULT NULL,
  `event_category` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;




--
-- Table structure for table `comment`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  `comment` varchar(100) DEFAULT NULL,
  `rating` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `notification`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(100) DEFAULT NULL,
  `notification_status` varchar(100) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;




--
-- Table structure for table `verification`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification` (
  `verification_id` int NOT NULL AUTO_INCREMENT,
  `verification_notes` varchar(2048) NOT NULL,
  `verificarion_status` varchar(100) NOT NULL,
  `nicfront_image_link` varchar(512) NOT NULL,  
  `nicback_image_link` varchar(512) NOT NULL,
  `face_image_link` varchar(512) NOT NULL,
  `owner_id` int UNIQUE NOT NULL,
  PRIMARY KEY (`verification_id`),
  CONSTRAINT `verification_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



