/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS `app`;
CREATE DATABASE IF NOT EXISTS `app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `app`;

DROP TABLE IF EXISTS `finished_test`;
CREATE TABLE IF NOT EXISTS `finished_test` (
  `finished_test_id` int unsigned NOT NULL AUTO_INCREMENT,
  `test_id` int unsigned NOT NULL DEFAULT '0',
  `student_id` int unsigned NOT NULL DEFAULT '0',
  `is_passed` tinyint unsigned NOT NULL DEFAULT '0',
  `score` tinyint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`finished_test_id`),
  KEY `fk_finished_test_test_id` (`test_id`),
  KEY `fk_finished_test_student_id` (`student_id`),
  CONSTRAINT `fk_finished_test_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_finished_test_test_id` FOREIGN KEY (`test_id`) REFERENCES `test` (`test_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `finished_test`;
/*!40000 ALTER TABLE `finished_test` DISABLE KEYS */;
INSERT INTO `finished_test` (`finished_test_id`, `test_id`, `student_id`, `is_passed`, `score`, `created_at`) VALUES
	(1, 1, 1, 0, 12, '2020-11-20 12:47:25');
/*!40000 ALTER TABLE `finished_test` ENABLE KEYS */;

DROP TABLE IF EXISTS `professor`;
CREATE TABLE IF NOT EXISTS `professor` (
  `professor_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password_hash` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `forename` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `surname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`professor_id`) USING BTREE,
  UNIQUE KEY `uq_professor_username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `professor`;
/*!40000 ALTER TABLE `professor` DISABLE KEYS */;
INSERT INTO `professor` (`professor_id`, `username`, `password_hash`, `forename`, `surname`) VALUES
	(1, 'gordana.mar78', 'DE327D34B4B1F109CADD6EEF3C04FB42759839F7CF1860193FB24D84A17828D7F45B7196027A4B63D00C020557A90CAD430F065D8FEBDC4EE5B335B7360C8691', 'Gordana', 'Markovic'),
	(2, 'zoran.mil91', '1CC20FFD292D52C361A6396AAB700318A625722DF06BC866077414DD64ADDDD1F859252B1ED300415CA7C1129781707376799FE9702987256FD90FC772296689', 'Zoran', 'Milosevic'),
	(4, 'pavle.pav77', 'C29274545CB0E17405287A466C1FB75DA49BBAEDE41BFD5C6BEC7136DDE3ED9429819F8F7A3355F2329ABA6232E6F106553F33CA189F48A1B667B3D4799E79C9', 'Pavle', 'Pavlovic'),
	(5, 'nikola.boz90', '378DC7C915FE0553ED8B629DF183DACDAD64EA03A2F4D5EA2722ACC6A6E8FC971C6FD2E3A30065D7A58B97CB69DDED4E0430807B58C58FBF07AD1046E0DEAFE8', 'Nikola', 'Bozic');
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;

DROP TABLE IF EXISTS `professor_token`;
CREATE TABLE IF NOT EXISTS `professor_token` (
  `professor_token_id` int unsigned NOT NULL AUTO_INCREMENT,
  `professor_id` int unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` text NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_valid` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`professor_token_id`),
  KEY `fk_professor_token_professor_id` (`professor_id`),
  CONSTRAINT `fk_professor_token_professor_id` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`professor_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `professor_token`;
/*!40000 ALTER TABLE `professor_token` DISABLE KEYS */;
INSERT INTO `professor_token` (`professor_token_id`, `professor_id`, `created_at`, `token`, `expires_at`, `is_valid`) VALUES
	(2, 5, '2021-03-09 19:38:04', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicHJvZmVzc29yIiwicHJvZmVzc29ySWQiOjUsInVzZXJuYW1lIjoibmlrb2xhLmJvejkwIiwiZXhwIjoxNjE4MDc5ODg0LjE2NCwiaXAiOiI6OjEiLCJpYXQiOjE2MTUzMTUwODR9.VVheLn8cxrQfvIpUis-L6E0H8P4tN0OJXb3b89e7G-k', '2021-04-10 18:38:04', 1),
	(3, 5, '2021-03-13 13:41:00', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicHJvZmVzc29yIiwicHJvZmVzc29ySWQiOjUsInVzZXJuYW1lIjoibmlrb2xhLmJvejkwIiwiZXhwIjoxNjE4NDA0MDYwLjQ2NywiaXAiOiI6OjEiLCJpYXQiOjE2MTU2MzkyNjB9.OHyTjxrwhpNHF-A2x3n0jqupZJrbQC5E-2SeR_xENRA', '2021-04-14 12:41:00', 1),
	(4, 1, '2021-03-13 14:51:53', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicHJvZmVzc29yIiwicHJvZmVzc29ySWQiOjEsInVzZXJuYW1lIjoiZ29yZGFuYS5tYXI3OCIsImV4cCI6MTYxODQwODMxMy40NTIsImlwIjoiOjoxIiwiaWF0IjoxNjE1NjQzNTEzfQ.Ei6bxdBPfr88oEMY3G3NhWcYal4btZP7RdYo8xl8zqY', '2021-04-14 13:51:53', 1);
/*!40000 ALTER TABLE `professor_token` ENABLE KEYS */;

DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `question_id` int unsigned NOT NULL AUTO_INCREMENT,
  `test_id` int unsigned NOT NULL DEFAULT '0',
  `question_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `number_of_correct_answers` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`question_id`),
  KEY `fk_question_test_id` (`test_id`),
  CONSTRAINT `fk_question_test_id` FOREIGN KEY (`test_id`) REFERENCES `test` (`test_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `question`;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` (`question_id`, `test_id`, `question_name`, `number_of_correct_answers`) VALUES
	(1, 1, 'question01', 3),
	(2, 1, 'question02', 1),
	(3, 2, 'question01', 1),
	(4, 1, 'question03', 1),
	(5, 1, 'question04', 1),
	(6, 1, 'question05', 1);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;

DROP TABLE IF EXISTS `question_answer`;
CREATE TABLE IF NOT EXISTS `question_answer` (
  `question_answer_id` int unsigned NOT NULL AUTO_INCREMENT,
  `question_id` int unsigned NOT NULL DEFAULT '0',
  `answer_name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `is_correct_answer` tinyint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`question_answer_id`),
  KEY `fk_question_answer_question_id` (`question_id`),
  CONSTRAINT `fk_question_answer_question_id` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `question_answer`;
/*!40000 ALTER TABLE `question_answer` DISABLE KEYS */;
INSERT INTO `question_answer` (`question_answer_id`, `question_id`, `answer_name`, `is_correct_answer`) VALUES
	(1, 1, 'FirstAnswer', 1),
	(2, 1, 'SecondAnswer (correct)', 1),
	(3, 1, 'ThirdAnswer', 0),
	(4, 1, 'FourthAnswer', 0),
	(5, 2, 'FirstAnswer (correct)', 1),
	(6, 2, 'SecondAnswer', 0),
	(7, 2, 'ThirdAnswer', 0);
/*!40000 ALTER TABLE `question_answer` ENABLE KEYS */;

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `student_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `password_hash` varchar(128) NOT NULL DEFAULT '0',
  `forename` varchar(32) NOT NULL DEFAULT '0',
  `surname` varchar(32) NOT NULL DEFAULT '0',
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `uq_student_username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `student`;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` (`student_id`, `username`, `password_hash`, `forename`, `surname`) VALUES
	(1, '2009332122', 'DAA965EA10B94FC6AB4701C13DB9BBA2810672B624646141C02431ED06DF0DA343D7869B0221B9D6AA00384E2F92040F0EBFCEB5E3A6DE866FA0643BBB05E0A4', 'Nikola', 'Stefanovic'),
	(3, '2010312154', '54EE22D22859F1DF1EE395FB0A2E080E6D9BD6851F71936D0F4A0A5ED29F2BA2CF086976E1BEFDA9B592FD8391E4D2F4FA3FE569C6E78D38ADFAF09A4A19538D', 'Stefan', 'Mirkovic'),
	(4, '2017889938', '6148DAAB950B3431DA5759BE37CE4DEE1DC202A672B148398C5AF71CE1256CD74E7C1C5E9D19267080A1EAD8DF0C92EAFF33846EA2808C0E86DAEEA4B9D645A8', 'Katarina', 'Stankovic'),
	(5, '2013443122', '93830EF19D1245F0ABB2A794B53F7E8A87136373EF22913A083D4B2508B72E4FEC7ED285955F2FD3E9EAF3757FB8E5FBFF1DC45AA8C2CF608E43DD27E1D3B55C', 'Marija', 'Simic');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;

DROP TABLE IF EXISTS `student_token`;
CREATE TABLE IF NOT EXISTS `student_token` (
  `student_token_id` int unsigned NOT NULL AUTO_INCREMENT,
  `student_id` int unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` text NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_valid` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`student_token_id`),
  KEY `fk_student_token_student_id` (`student_id`),
  CONSTRAINT `fk_student_token_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `student_token`;
/*!40000 ALTER TABLE `student_token` DISABLE KEYS */;
INSERT INTO `student_token` (`student_token_id`, `student_id`, `created_at`, `token`, `expires_at`, `is_valid`) VALUES
	(2, 5, '2021-03-08 23:50:26', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInByb2Zlc3NvcklkIjo1LCJ1c2VybmFtZSI6IjIwMTM0NDMxMjIiLCJleHAiOjE2MTgwMDg2MjYuNjM0LCJpcCI6Ijo6MSIsImlhdCI6MTYxNTI0MzgyNn0.EpqX3HfW43eK4vnXHrxjnuXVmTuNcNgCJfkvS8wuy2Y', '2021-04-09 22:50:26', 1),
	(3, 5, '2021-03-13 00:47:41', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInByb2Zlc3NvcklkIjo1LCJ1c2VybmFtZSI6IjIwMTM0NDMxMjIiLCJleHAiOjE2MTgzNTc2NjEuNTQxLCJpcCI6Ijo6MSIsImlhdCI6MTYxNTU5Mjg2MX0.Af5ne5uRD_tit603IgklH-EFnCzmB91XxLJd0GgDDN4', '2021-04-13 23:47:41', 1),
	(4, 4, '2021-03-13 12:23:28', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInByb2Zlc3NvcklkIjo0LCJ1c2VybmFtZSI6IjIwMTc4ODk5MzgiLCJleHAiOjE2MTgzOTk0MDguNTU1LCJpcCI6Ijo6MSIsImlhdCI6MTYxNTYzNDYwOH0.qYx5VU_lvmY8n_jFeInqwZ7o1Sh_Uap4w0TT9eimjqw', '2021-04-14 11:23:28', 1),
	(5, 4, '2021-03-13 12:28:44', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInByb2Zlc3NvcklkIjo0LCJ1c2VybmFtZSI6IjIwMTc4ODk5MzgiLCJleHAiOjE2MTgzOTk3MjQuODYyLCJpcCI6Ijo6MSIsImlhdCI6MTYxNTYzNDkyNH0.ySGstAwCFZPyvWYhQ2WSkOlPPNtq1hA42KRKzA9vVzg', '2021-04-14 11:28:44', 1),
	(6, 4, '2021-03-13 12:31:23', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInByb2Zlc3NvcklkIjo0LCJ1c2VybmFtZSI6IjIwMTc4ODk5MzgiLCJleHAiOjE2MTgzOTk4ODMuNDk1LCJpcCI6Ijo6MSIsImlhdCI6MTYxNTYzNTA4M30.uhGWjQNvQnTOxLffuo33wdpHwXNAQ0mKvHmBljZd9xg', '2021-04-14 11:31:23', 1),
	(7, 4, '2021-03-13 12:41:19', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInByb2Zlc3NvcklkIjo0LCJ1c2VybmFtZSI6IjIwMTc4ODk5MzgiLCJleHAiOjE2MTg0MDA0NzkuNzU2LCJpcCI6Ijo6MSIsImlhdCI6MTYxNTYzNTY3OX0.Sdb_VJe7ioU0iG-969r9RxZ-m-O5L_CsnfOiqtWs_dk', '2021-04-14 11:41:19', 1);
/*!40000 ALTER TABLE `student_token` ENABLE KEYS */;

DROP TABLE IF EXISTS `test`;
CREATE TABLE IF NOT EXISTS `test` (
  `test_id` int unsigned NOT NULL AUTO_INCREMENT,
  `test_name` varchar(64) NOT NULL DEFAULT '0',
  `professor_id` int unsigned NOT NULL DEFAULT '0',
  `is_active` tinyint unsigned NOT NULL DEFAULT '0',
  `duration` smallint unsigned DEFAULT '0',
  PRIMARY KEY (`test_id`),
  KEY `fk_test_professor_id` (`professor_id`) USING BTREE,
  CONSTRAINT `fk_test_professor_id` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`professor_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `test`;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` (`test_id`, `test_name`, `professor_id`, `is_active`, `duration`) VALUES
	(1, 'test01', 1, 0, 30),
	(2, 'test02', 2, 0, 10),
	(3, 'test01', 4, 0, 60);
/*!40000 ALTER TABLE `test` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
