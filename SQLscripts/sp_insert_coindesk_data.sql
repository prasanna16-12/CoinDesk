CREATE PROCEDURE `sp_insert_coindesk_data`(

 IN _updated_on timestamp,
 IN _USD double,
 IN _GBP double,
 IN _EUR double
)
BEGIN
	INSERT INTO `coin_desk_data`
	(
	`updated_on`,
	`USD`,
	`GBP`,
	`EUR`)
	VALUES
	(_updated_on, _USD, _GBP, _EUR);
END