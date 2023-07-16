CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_coindesk_data`(

 IN _updated_on timestamp,
 IN _USD double,
 IN _GBP double,
 IN _EUR double,
 IN _cheapest_to_buy varchar(10),
 IN _expensive_to_buy varchar(10)
)
BEGIN
	INSERT INTO `coin_desk_data`
	(
	`updated_on`,
	`USD`,
	`GBP`,
	`EUR`,
    `cheapest_to_buy`,
    `expensive_to_buy`
    )
	VALUES
	(_updated_on , _USD, _GBP, _EUR, _cheapest_to_buy, _expensive_to_buy);
END