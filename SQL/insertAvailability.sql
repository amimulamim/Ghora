DECLARE
TOKEN NUMBER;

BEGIN
 FOR R IN(SELECT ID FROM DRIVER) LOOP
	token:=ROUND(dbms_random.value(0,1),0);
	--dbms_output.put_line(token);
	INSERT into AVAILABILITY VALUES(R.ID,token,CURRENT_TIMESTAMP(6));
END LOOP;

End;
/
