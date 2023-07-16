CREATE TABLE `coin_desk_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `updated_on` timestamp NOT NULL,
  `USD` double NOT NULL,
  `GBP` double NOT NULL,
  `EUR` double NOT NULL,
  `cheapest_to_buy` varchar(45) DEFAULT NULL,
  `expensive_to_buy` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
)
