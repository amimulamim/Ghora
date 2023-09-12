CREATE OR REPLACE PROCEDURE DRIVER_AVAIL_INSERT IS

BEGIN
	FOR R IN (SELECT ID FROM DRIVER WHERE NOT EXISTS(SELECT D_ID FROM AVAILABILITY WHERE D_ID=ID))
	LOOP
	INSERT INTO AVAILABILITY(D_ID,IS_AVAILABLE,LAST_UPDATED) VALUES(R.ID,0,CURRENT_TIMESTAMP);

	 
END LOOP;
END;






CREATE OR REPLACE FUNCTION getVtypeByID(did in NUMBER)
return VARCHAR2 IS

typev VARCHAR2(50);
BEGIN


SELECT UPPER(v_type) into typev from model 
WHERE name=
(
SELECT MODELNAME
from VEHICLE
WHERE
PLATE_NO=
(
SELECT PLATE_NO from DRIVER 
where id=did
)
);

return typev;

EXCEPTION
WHEN no_data_found THEN return 'NO_DATA_FOUND';
when others then return 'OTHERS';
END;






CREATE OR REPLACE FUNCTION model_details(plate in VARCHAR2)
return VARCHAR2 IS

model_name MODEL.NAME%TYPE;
company MODEL.MANUFACTURER%TYPE;
ret varchar2(50);
BEGIN

SELECT MODELNAME into model_name from VEHICLE WHERE PLATE_NO=plate;


SELECT MANUFACTURER into company FROM MODEL WHERE name = model_name;

-- SELECT name into model_name,MANUFACTURER into company 
-- from MODEL
-- WHERE name=(SELECT MODELNAME from VEHICLE WHERE PLATE_NO=plate);

return company||' '||model_name;

EXCEPTION
when no_data_found then return 'NO_DATA_FOUND';
when others then return 'OTHERS';
END;


CREATE OR REPLACE PROCEDURE VEHICLE_UPDATE_MODEL(plate in VARCHAR2,model_name in VARCHAR2,company in VARCHAR2,vtype in VARCHAR2)
IS
already NUMBER;
BEGIN

SELECT COUNT(*) INTO already from MODEL WHERE NAME=model_name;
IF already>0 THEN
	DBMS_OUTPUT.PUT_LINE('already ase');
ELSE 
		DBMS_OUTPUT.PUT_LINE('already nai');
		INSERT INTO MODEL(name,v_type,MANUFACTURER) VALUES(model_name,vtype,company);
		DBMS_OUTPUT.PUT_LINE('model insert done');
End if;
end;





CREATE OR REPLACE FUNCTION convert_to_gmt6(input_timestamp TIMESTAMP) RETURN VARCHAR2 IS
    converted_timestamp TIMESTAMP;
BEGIN
    -- Convert to GMT+6 timezone
    converted_timestamp := input_timestamp AT TIME ZONE 'GMT' + INTERVAL '6' HOUR;

    -- Format the timestamp
    RETURN TO_CHAR(converted_timestamp, 'DD/MM/YYYY "at" HH:MI AM');
END;
/







CREATE OR REPLACE FUNCTION get_payment_time(tid in NUMBER)
return VARCHAR2 IS

ptime timestamp;

BEGIN

SELECT PAYMENT_TIME into ptime from PAYMENTS WHERE TR_ID=tid;

return ptime;

end;
/


















