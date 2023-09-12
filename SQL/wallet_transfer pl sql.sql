
CREATE or replace PROCEDURE paying(wu in NUMBER,wd in NUMBER,fare in NUMBER)
IS

BEGIN
UPDATE WALLET set BALANCE=(BALANCE-fare) WHERE ID=wu;
UPDATE WALLET set BALANCE=(BALANCE+fare) WHERE ID=wu;	
	

END;
/






CREATE or REPLACE PROCEDURE make_transaction(usernam in VARCHAR2,plate in VARCHAR2 ,fare in NUMBER)
IS

wu NUMBER;
wd NUMBER;

BEGIN
SELECT WALLET_ID into wd 
FROM DRIVER
 WHERE PLATE_NO=plate;
 
 SELECT WALLET_ID into wu 
 FROM USERS 
 WHERE USERNAME=usernam;
 paying(wu,wd,fare);
 END;
 /
 
 