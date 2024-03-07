-- -------------------------------------------------------------
-- -------------------------------------------------------------
-- TablePlus 1.0.3
--
-- https://tableplus.com/
--
-- Database: mysql
-- Generation Time: 2024-03-07 09:14:32.966504
-- -------------------------------------------------------------

CREATE TABLE `class_dates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comments` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `timeTable_Id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `timeTable_Id` (`timeTable_Id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `class_dates_ibfk_10` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `class_dates_ibfk_9` FOREIGN KEY (`timeTable_Id`) REFERENCES `timetables` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `favourite_teacher_students` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `teacher_id` int NOT NULL,
  `student_id` int NOT NULL,
  PRIMARY KEY (`teacher_id`,`student_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `favourite_teacher_students_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher_infos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `favourite_teacher_students_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `lesson_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `subject_lesson_types` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `lesson_type_id` int NOT NULL,
  `subject_id` int NOT NULL,
  PRIMARY KEY (`lesson_type_id`,`subject_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `subject_lesson_types_ibfk_1` FOREIGN KEY (`lesson_type_id`) REFERENCES `lesson_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `subject_lesson_types_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `teacher_infos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_Id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_Id` (`user_Id`),
  CONSTRAINT `teacher_infos_ibfk_1` FOREIGN KEY (`user_Id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `teacher_ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` decimal(10,0) NOT NULL,
  `review` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `student_id` int DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `teacher_ratings_ibfk_10` FOREIGN KEY (`teacher_id`) REFERENCES `teacher_infos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `teacher_ratings_ibfk_9` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `teacher_student_favourites` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `teacher_id` int NOT NULL,
  `student_id` int NOT NULL,
  PRIMARY KEY (`teacher_id`,`student_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `teacher_student_favourites_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher_infos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teacher_student_favourites_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `teacher_subjects` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `teacher_id` int NOT NULL,
  `subject_id` int NOT NULL,
  PRIMARY KEY (`teacher_id`,`subject_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `teacher_subjects_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher_infos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teacher_subjects_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `timetables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `teacher_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `teacher_id` (`teacher_id`),
  CONSTRAINT `timetables_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher_infos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `secondLastName` varchar(255) NOT NULL,
  `birthDate` date NOT NULL,
  `gender` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `phone` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `email_21` (`email`),
  UNIQUE KEY `email_22` (`email`),
  UNIQUE KEY `email_23` (`email`),
  UNIQUE KEY `email_24` (`email`),
  UNIQUE KEY `email_25` (`email`),
  UNIQUE KEY `email_26` (`email`),
  UNIQUE KEY `email_27` (`email`),
  UNIQUE KEY `email_28` (`email`),
  UNIQUE KEY `email_29` (`email`),
  UNIQUE KEY `email_30` (`email`),
  UNIQUE KEY `email_31` (`email`),
  UNIQUE KEY `email_32` (`email`),
  UNIQUE KEY `email_33` (`email`),
  UNIQUE KEY `email_34` (`email`),
  UNIQUE KEY `email_35` (`email`),
  UNIQUE KEY `email_36` (`email`),
  UNIQUE KEY `email_37` (`email`),
  UNIQUE KEY `email_38` (`email`),
  UNIQUE KEY `email_39` (`email`),
  UNIQUE KEY `email_40` (`email`),
  UNIQUE KEY `email_41` (`email`),
  UNIQUE KEY `email_42` (`email`),
  UNIQUE KEY `email_43` (`email`),
  UNIQUE KEY `email_44` (`email`),
  UNIQUE KEY `email_45` (`email`),
  UNIQUE KEY `email_46` (`email`),
  UNIQUE KEY `email_47` (`email`),
  UNIQUE KEY `email_48` (`email`),
  UNIQUE KEY `email_49` (`email`),
  UNIQUE KEY `email_50` (`email`),
  UNIQUE KEY `email_51` (`email`),
  UNIQUE KEY `email_52` (`email`),
  UNIQUE KEY `email_53` (`email`),
  UNIQUE KEY `email_54` (`email`),
  UNIQUE KEY `email_55` (`email`),
  UNIQUE KEY `email_56` (`email`),
  UNIQUE KEY `email_57` (`email`),
  UNIQUE KEY `email_58` (`email`),
  UNIQUE KEY `email_59` (`email`),
  UNIQUE KEY `email_60` (`email`),
  UNIQUE KEY `email_61` (`email`),
  UNIQUE KEY `email_62` (`email`),
  UNIQUE KEY `email_63` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `orderLessons`.`class_dates` (`id`, `comments`, `createdAt`, `updatedAt`, `timeTable_Id`, `student_id`) VALUES 
(40, 'ayudame porfi please', '2024-03-05 11:40:27', '2024-03-05 11:50:38', 19, 67),
(42, 'ayudame please', '2024-03-05 11:41:34', '2024-03-05 11:41:34', 14, 67),
(43, 'ayudame please', '2024-03-05 11:43:22', '2024-03-05 11:43:22', 27, 67),
(44, 'help me', '2024-03-06 10:40:11', '2024-03-06 10:40:11', 31, 71),
(45, 'help me please', '2024-03-06 10:42:38', '2024-03-06 11:14:59', 32, 72);

INSERT INTO `orderLessons`.`favourite_teacher_students` (`createdAt`, `updatedAt`, `teacher_id`, `student_id`) VALUES 
('2024-03-05 15:58:02', '2024-03-05 15:58:02', 7, 63),
('2024-03-05 16:15:18', '2024-03-05 16:15:18', 7, 71),
('2024-03-06 11:21:12', '2024-03-06 11:21:12', 7, 72),
('2024-03-05 15:57:49', '2024-03-05 15:57:49', 8, 63),
('2024-03-06 11:20:51', '2024-03-06 11:20:51', 8, 72);

INSERT INTO `orderLessons`.`lesson_types` (`id`, `name`, `createdAt`, `updatedAt`) VALUES 
(1, 'Secundaria', '2024-03-05 12:06:17', '2024-03-05 12:06:17'),
(2, 'Primaria', '2024-03-05 12:06:28', '2024-03-05 12:06:28'),
(3, 'Universidad', '2024-03-05 12:06:35', '2024-03-05 12:06:35'),
(4, 'Master', '2024-03-05 12:06:40', '2024-03-05 12:06:40'),
(5, 'Oposiciones', '2024-03-05 12:09:14', '2024-03-05 12:09:14');

INSERT INTO `orderLessons`.`subject_lesson_types` (`createdAt`, `updatedAt`, `lesson_type_id`, `subject_id`) VALUES 
('2024-03-05 14:03:46', '2024-03-05 14:03:46', 1, 16),
('2024-03-05 14:06:41', '2024-03-05 14:06:41', 2, 18),
('2024-03-05 14:14:36', '2024-03-05 14:14:36', 3, 1),
('2024-03-05 14:09:29', '2024-03-05 14:09:29', 3, 20);

INSERT INTO `orderLessons`.`subjects` (`id`, `name`, `createdAt`, `updatedAt`) VALUES 
(1, 'Matemáticas', '2024-03-05 12:12:45', '2024-03-05 12:12:45'),
(2, 'Lengua', '2024-03-05 12:12:52', '2024-03-05 12:12:52'),
(3, 'derecho', '2024-03-05 12:12:55', '2024-03-05 12:12:55'),
(4, 'Administración', '2024-03-05 12:13:12', '2024-03-05 12:13:12'),
(5, 'Biología', '2024-03-05 12:14:27', '2024-03-05 12:14:27'),
(6, 'Geografía', '2024-03-05 12:14:39', '2024-03-05 12:14:39'),
(7, 'Geografía', '2024-03-05 13:57:46', '2024-03-05 13:57:46'),
(8, 'Geografía', '2024-03-05 13:58:47', '2024-03-05 13:58:47'),
(9, 'Química', '2024-03-05 13:59:22', '2024-03-05 13:59:22'),
(10, 'Química', '2024-03-05 13:59:50', '2024-03-05 13:59:50'),
(11, 'Química', '2024-03-05 13:59:55', '2024-03-05 13:59:55'),
(12, 'Química', '2024-03-05 14:00:40', '2024-03-05 14:00:40'),
(13, 'Química', '2024-03-05 14:01:17', '2024-03-05 14:01:17'),
(14, 'Química', '2024-03-05 14:03:00', '2024-03-05 14:03:00'),
(15, 'Química', '2024-03-05 14:03:35', '2024-03-05 14:03:35'),
(16, 'Química', '2024-03-05 14:03:46', '2024-03-05 14:03:46'),
(17, 'Física', '2024-03-05 14:06:14', '2024-03-05 14:06:14'),
(18, 'Física', '2024-03-05 14:06:41', '2024-03-05 14:06:41'),
(19, 'Física', '2024-03-05 14:09:23', '2024-03-05 14:09:23'),
(20, 'Física', '2024-03-05 14:09:29', '2024-03-05 14:09:29');

INSERT INTO `orderLessons`.`teacher_infos` (`id`, `description`, `location`, `price`, `createdAt`, `updatedAt`, `user_Id`) VALUES 
(7, 'best teacher ever', 'zoom', 20, '2024-03-05 10:12:39', '2024-03-05 10:12:39', 61),
(8, 'best teacher ever', 'zoom', 20, '2024-03-05 15:09:44', '2024-03-05 15:09:44', 68),
(9, 'The real', 'teams', 200, '2024-03-06 13:45:47', '2024-03-06 14:02:27', 73),
(10, 'best teacher ever', 'zoom', 20, '2024-03-06 14:34:44', '2024-03-06 14:34:44', 76);

INSERT INTO `orderLessons`.`teacher_ratings` (`id`, `rating`, `review`, `createdAt`, `updatedAt`, `student_id`, `teacher_id`) VALUES 
(3, 3, 'Este profe es el p amo y mas aun', '2024-03-06 09:42:37', '2024-03-06 09:52:25', 63, 7),
(4, 5, 'Este profe es el p amo', '2024-03-06 09:45:01', '2024-03-06 09:45:01', 63, 8),
(6, 5, 'Este profe es el p amo', '2024-03-06 09:46:29', '2024-03-06 09:46:29', 72, 8);

INSERT INTO `orderLessons`.`teacher_subjects` (`createdAt`, `updatedAt`, `teacher_id`, `subject_id`) VALUES 
('2024-03-05 14:45:05', '2024-03-05 14:45:05', 7, 1),
('2024-03-05 15:12:19', '2024-03-05 15:12:19', 8, 1);

INSERT INTO `orderLessons`.`timetables` (`id`, `date`, `time`, `createdAt`, `updatedAt`, `teacher_id`) VALUES 
(14, '2024-06-14', '16:30:00', '2024-03-05 10:41:01', '2024-03-05 11:06:44', 7),
(15, '2024-05-12', '16:30:00', '2024-03-05 10:44:00', '2024-03-05 10:44:00', 7),
(16, '2024-05-12', '16:30:00', '2024-03-05 10:44:09', '2024-03-05 10:44:09', 7),
(17, '2024-05-12', '16:30:00', '2024-03-05 10:47:07', '2024-03-05 10:47:07', 7),
(18, '2024-05-12', '16:30:00', '2024-03-05 10:47:42', '2024-03-05 10:47:42', 7),
(19, '2024-05-12', '16:30:00', '2024-03-05 10:49:48', '2024-03-05 10:49:48', 7),
(27, '2024-06-14', '17:30:00', '2024-03-05 11:03:24', '2024-03-05 11:03:24', 7),
(30, '2027-05-05', '13:00:00', '2024-03-05 15:20:08', '2024-03-05 15:20:08', 8),
(31, '2027-05-05', '14:00:00', '2024-03-05 15:20:35', '2024-03-05 15:20:35', 8),
(32, '2027-05-05', '15:00:00', '2024-03-05 15:20:37', '2024-03-05 15:20:37', 8),
(33, '2027-05-05', '16:00:00', '2024-03-05 15:20:40', '2024-03-05 15:20:40', 8),
(34, '2024-02-15', '16:00:00', '2024-03-06 13:49:00', '2024-03-06 13:49:00', 9),
(35, '2024-02-15', '16:00:00', '2024-03-06 13:49:04', '2024-03-06 13:49:04', 9),
(36, '2024-02-15', '16:00:00', '2024-03-06 13:49:08', '2024-03-06 13:49:08', 9),
(37, '2024-02-15', '16:00:00', '2024-03-06 13:49:08', '2024-03-06 13:49:08', 9),
(38, '2024-02-15', '16:00:00', '2024-03-06 13:49:09', '2024-03-06 13:49:09', 9),
(39, '2024-02-15', '16:00:00', '2024-03-06 13:50:31', '2024-03-06 13:50:31', 9),
(40, '2024-02-15', '16:00:00', '2024-03-06 13:50:49', '2024-03-06 13:50:49', 9),
(41, '2024-02-15', '16:00:00', '2024-03-06 13:52:20', '2024-03-06 13:52:20', 9);

INSERT INTO `orderLessons`.`users` (`id`, `firstName`, `lastName`, `secondLastName`, `birthDate`, `gender`, `email`, `createdAt`, `updatedAt`, `phone`, `location`, `role`, `password`) VALUES 
(58, 'lucia', 'Betancor', 'Martin', '1996-12-28', 'male', 'jybm@gdde.com', '2024-03-04 16:29:48', '2024-03-04 16:29:48', '928445662', 'las Palmas', 'student', ''),
(60, 'lucia', 'Betancor', 'Martin', '1996-12-28', 'male', 'jybm@gddade.com', '2024-03-04 16:29:56', '2024-03-04 16:29:56', '928445662', 'las Palmas', 'student', ''),
(61, 'Alexandra', 'M', 'H', '1996-12-28', 'male', 'jybm2@32.com', '2024-03-05 10:12:39', '2024-03-05 10:12:39', '928445662', 'las Palmas', 'teacher', ''),
(63, 'Alexandra2', 'M', 'H', '1996-12-28', 'male', 'jybm2@323222.com', '2024-03-05 10:16:40', '2024-03-05 10:16:40', '928445662', 'las Palmas', 'student', ''),
(64, 'Alexandra3232', 'M', 'H', '1996-12-28', 'male', 'jybm2@332322.com', '2024-03-05 10:17:06', '2024-03-05 10:17:06', '928445662', 'las Palmas', 'student', ''),
(67, 'Alexandra3232', 'M', 'H', '1996-12-28', 'male', 'jybm2@gmail.com', '2024-03-05 11:23:40', '2024-03-05 11:23:40', '928445662', 'las Palmas', 'student', ''),
(68, 'Musa', 'M', 'H', '1996-12-28', 'male', 'musa@gmail.com', '2024-03-05 15:09:44', '2024-03-05 15:09:44', '928445662', 'las Palmas', 'teacher', ''),
(71, 'Musa2', 'M', 'H', '1996-10-28', 'male', 'musa2@gmail.com', '2024-03-05 16:06:59', '2024-03-05 16:06:59', '928445662', 'las Palmas', 'student', '$2b$10$rHWJbUS2VhtxU9KVpDA7T.DIBkUrH7H47c4M3P28P.QnQTfgNpmA6'),
(72, 'Musa4', 'M', 'H', '1996-10-28', 'male', 'musa43@gmail.com', '2024-03-06 09:40:31', '2024-03-06 09:40:31', '928445662', 'las Palmas', 'student', '$2b$10$oPMcHg2vFwELqt.gjyPI7eFGR7nyc2.dr7hbeujLSQARJ/nXT6KiG'),
(73, 'Musa4', 'M', 'H', '1996-10-28', 'male', 'musa42323253@gmail.com', '2024-03-06 13:45:47', '2024-03-06 14:09:28', '928445662', 'las Palmas', 'teacher', '$2b$10$jdMqJcXGNHGHFLXuzfiRReS7CBXhBGoqcHbaQVXIGoCbu.RaCAer.'),
(74, 'Juan222', 'M3232', 'H3232', '1996-10-28', 'male', 'musa4232dsds3323253@gmail.com', '2024-03-06 14:17:03', '2024-03-06 14:21:12', '928445662', 'las Palmas', 'teacher', '$2b$10$lVMewCm6QOzfn2qmAzsWm./UesDMQtTx5COq./iBuZyA0RUzD2vZu'),
(75, 'Juan', 'M', 'H', '1996-10-28', 'male', 'musa45332dsds32@gmail.com', '2024-03-06 14:34:35', '2024-03-06 14:34:35', '928445662', 'las Palmas', 'student', '$2b$10$L9Llhf6X8o9SzC0PaoEI2.GVqJqxdDN5/tCBEmr.VzfE24EXBhNlm'),
(76, 'Juan', 'M', 'H', '1996-10-28', 'male', 'musa45332dsds3ewewe2@gmail.com', '2024-03-06 14:34:44', '2024-03-06 14:34:44', '928445662', 'las Palmas', 'teacher', '$2b$10$GqEBl.iVBSKqr8CwsRGfu.5Dor.2pPGBcnTqO2VWZ7QWay1FfioDe');

