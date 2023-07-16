CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_fetch_coindesk_data`(
	IN fromDateTime timestamp,
    IN toDateTime timestamp
)
BEGIN
	SELECT * FROM coin_desk_data
    WHERE updated_on >= fromDateTime AND updated_on <= toDateTime;
END