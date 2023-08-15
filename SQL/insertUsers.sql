DECLARE
	v_loc_id NUMBER;
	v_wallet_id NUMBER;
		
	 w_size NUMBER;
	 
	 loc_size NUMBER;
	 already NUMBER;
	 d_already NUMBER;
	 v_random_id NUMBER;
BEGIN
  -- Loop through existing entries in Driver table
	SELECT count(*) INTO w_size from WALLET;
	--SELECT COUNT(*) INTO v_size from VEHICLE;
	SELECT COUNT(*) INTO LOC_SIZE from LOCATION;
	
	for R IN(SELECT USERNAME from users WHERE LOC_ID is NULL) LOOP
	  v_random_id := ROUND(DBMS_RANDOM.VALUE(1, loc_size));
		dbms_output.PUT_LINE(v_random_id);
    UPDATE users Set LOC_ID=v_random_id WHERE USERNAME=R.USERNAME;
	 
END LOOP;




	for R IN(SELECT USERNAME from USERS WHERE WALLET_ID is NULL) LOOP
				LOOP
	already:=0;
	d_already:=0;
	v_random_id:=ROUND(DBMS_RANDOM.VALUE(1,w_size));
	
	SELECT id INTO v_wallet_id FROM WALLET WHERE id=v_random_id;
	
	SELECT COUNT(*) INTO d_already FROM DRIVER WHERE WALLET_ID=v_wallet_id;
	SELECT COUNT(*) INTO already FROM users WHERE WALLET_ID=v_wallet_id;
	

	IF already=0 and d_already=0 THEN
		EXIT; 
	END IF; 
	
END LOOP;

	UPDATE  users set WALLET_ID=v_wallet_id WHERE USERNAME=R.USERNAME; 

	  
		
		
		
	 
END LOOP;
	
	
	
	commit;
	
	--dbms_output.put_line('ws,vs,ls='|| w_size||' '||v_size||' '||loc_size);
END;
/


	