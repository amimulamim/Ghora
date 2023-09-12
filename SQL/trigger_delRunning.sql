CREATE OR REPLACE TRIGGER delete_running_trip
AFTER INSERT ON trip_history
FOR EACH ROW
BEGIN
    DELETE FROM running_trip
    WHERE tr_id = :new.tr_id;
END;
/


CREATE OR REPLACE FUNCTION generate_random_string RETURN VARCHAR2 IS
    characters VARCHAR2(100) := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    random_string VARCHAR2(13) := '';
BEGIN
    FOR i IN 1..13 LOOP
        random_string := random_string || SUBSTR(characters, CEIL(DBMS_RANDOM.VALUE(1, LENGTH(characters))), 1);
    END LOOP;
    
    RETURN random_string;
END generate_random_string;
/













CREATE or REPLACE FUNCTION generate_transaction_no 
return VARCHAR2 IS

already NUMBER ;
str VARCHAR2(15);
BEGIN
already:=0;
 str:=generate_random_string();
 SELECT COUNT(*) into already FROM PAYMENTS WHERE TRANSACTION_NO=str;
 
 if already=0 then return str;
 ELSE
	LOOP
	str:=generate_random_string();
 SELECT COUNT(*) into already FROM PAYMENTS WHERE TRANSACTION_NO=str;

	IF already=0 THEN
		return str; 
	END IF; 
END LOOP;

	
 end if;
 end;


CREATE or REPLACE FUNCTION getPlate(did in NUMBER)
return VARCHAR2 IS
plt VARCHAR2(20);
BEGIN
SELECT PLATE_NO into plt from driver WHERE id=did;
return plt;
END;





