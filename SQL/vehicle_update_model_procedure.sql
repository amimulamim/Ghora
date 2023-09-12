CREATE or REPLACE PROCEDURE VEHICLE_UPDATE_MODEL(plate in VARCHAR2,model_name in VARCHAR2,company in VARCHAR2,vtype in VARCHAR2)
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
/