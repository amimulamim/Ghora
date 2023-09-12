CREATE or REPLACE trigger fill_nulls
after INSERT 
on TRIP_HISTORY
for each ROW
DECLARE
payment_when timestamp;

BEGIN

for R in (SELECT TR_ID FROM TRIP_HISTORY WHERE FINISH_TIME IS NULL)
LOOP
	 SELECT PAYMENT_TIME into payment_when from PAYMENTS WHERE TR_ID=R.TR_ID;
	 UPDATE TRIP_HISTORY
	 SET FINISH_TIME=PAYMENT_WHEN 
	 WHERE TR_ID=R.TR_ID;
END LOOP;



END;


drop TRIGGER fill_nulls;




SELECT WALLET_ID from USERS WHERE USERNAME='shania_aisharja'



SELECT 
        TR_ID,
        TRANSACTION_NO,
        AMOUNT,
        CONVERT_TO_GMT6(PAYMENT_TIME) AS WHEN,
				W.ID AS WALLET_ID
				
				

    FROM 
        PAYMENTS P NATURAL JOIN TRIP_HISTORY T
				JOIN WALLET W 
				ON W.ID=(SELECT WALLET_ID FROM USERS WHERE USERNAME=T.USERNAME)
        WHERE TR_ID=:id








SELECT lower(id) FROM DRIVER






SELECT * from MODEL


CREATE or replace TRIGGER model_adjust
before INSERT or UPDATE
on MODEL
FOR each ROW
DECLARE

BEGIN
:new.name:=UPPER(:new.name);
:new.V_TYPE:=UPPER(:new.V_TYPE);
:new.MANUFACTURER:=UPPER(:new.MANUFACTURER);

END;


INSERT into model(name,v_type,MANUFACTURER) VALUES('aveNTAdoR','caR','lamBoRGhiNI')

SELECT * from VEHICLE


CREATE or replace TRIGGER VEHICLE_adjust
before INSERT or UPDATE
on VEHICLE
FOR each ROW
DECLARE

BEGIN
:new.modelname:=UPPER(:new.modelname);
:new.PLATE_NO:=UPPER(:new.PLATE_NO);

END;

INSERT into VEHICLE(PLATE_NO,MODELNAME,PLAN_ID) VALUES('CHA-GA-133968','avenTador',1)




SELECT * FROM DRIVER



CREATE or replace TRIGGER driver_adjust
before INSERT or UPDATE
on DRIVER
FOR each ROW
DECLARE

BEGIN
:new.SEX:=UPPER(SUBSTR(:new.SEX, 1, 1));
:new.PLATE_NO:=UPPER(:new.PLATE_NO);
:new.email:=LOWER(:new.EMAIL);
:new.NAME:=INITCAP_ALL_PARTS(:new.name);

if(LENGTH(:new.PHONE)=11 and (:new.PHONE) LIKE '01%' )THEN
	:new.PHONE:='88'||:new.PHONE;
end if;


END;


SELECT * from USERS

SELECT id,plate_no,MODEL_DETAILS(PLATE_NO) FROM DRIVER



CREATE or replace TRIGGER user_adjust
before INSERT or UPDATE
on USERS
FOR each ROW
DECLARE

BEGIN
:new.SEX:=UPPER(SUBSTR(:new.SEX, 1, 1));
:new.email:=LOWER(:new.EMAIL);


if(LENGTH(:new.PHONE)=11 and (:new.PHONE) LIKE '01%' )THEN
	:new.PHONE:='88'||:new.PHONE;
end if;


END;






CREATE OR REPLACE FUNCTION INITCAP_ALL_PARTS(input_name IN VARCHAR2)
RETURN VARCHAR2
IS
   output_name VARCHAR2(100);
   temp_name VARCHAR2(100);
BEGIN
   -- Initialize the output_name
   output_name := '';

   -- Remove leading and trailing spaces
   temp_name := TRIM(input_name);

   -- Loop to process each part
   WHILE INSTR(temp_name, ' ') > 0 LOOP
      -- Extract the first part, INITCAP it, and add it to the output
      output_name := output_name || INITCAP(SUBSTR(temp_name, 1, INSTR(temp_name, ' ') - 1)) || ' ';

      -- Remove the processed part from temp_name
      temp_name := SUBSTR(temp_name, INSTR(temp_name, ' ') + 1);
   END LOOP;

   -- Handle the last part of the name
   IF LENGTH(temp_name) > 0 THEN
      output_name := output_name || INITCAP(temp_name);
   END IF;

   RETURN output_name;
END INITCAP_ALL_PARTS;
/



SELECT initcap_all_parts('shania moNIS aISHarja') from USERS WHERE USERNAME='shania_aisharja';

SELECT * from USERS


CREATE or replace TRIGGER user_adjust
before INSERT or UPDATE
on USERS
FOR each ROW
DECLARE

BEGIN
:new.SEX:=UPPER(SUBSTR(:new.SEX, 1, 1));
:new.USERNAME:=LOWER(:new.USERNAME);
:new.email:=LOWER(:new.EMAIL);
:new.NAME:=INITCAP_ALL_PARTS(:new.name);

if(LENGTH(:new.PHONE)=11 and (:new.PHONE) LIKE '01%' )THEN
	:new.PHONE:='88'||:new.PHONE;
end if;


END;
/


CREATE or REPLACE TRIGGER update_avail
after INSERT or UPDATE 
of LAT,LNG
ON DRIVER
for each row

DECLARE

BEGIN
if(:new.LAT is not null and :new.lng is not NULL) THEN
	UPDATE AVAILABILITY set LAST_UPDATED=CURRENT_TIMESTAMP WHERE D_ID=:new.id;

end if;


END;
/








