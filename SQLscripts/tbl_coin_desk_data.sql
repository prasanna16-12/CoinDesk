CREATE TABLE `coin_desk_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `updated_on` timestamp NOT NULL,
  `USD` double NOT NULL,
  `GBP` double NOT NULL,
  `EUR` double NOT NULL,
  PRIMARY KEY (`id`)
);
