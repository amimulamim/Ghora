DECLARE
  v_plate_no  CHAR(20);
  v_location_id       NUMBER;
  v_wallet_id         NUMBER;
	v_vehicle_plate_no_now  CHAR(20);
  v_location_id_now      NUMBER;
  v_wallet_id_now        NUMBER;
	 v_random_id    NUMBER;
	 w_size NUMBER;
	 v_size NUMBER;
	 loc_size NUMBER;
	 already NUMBER;
BEGIN
  -- Loop through existing entries in Driver table
	SELECT count(*) INTO w_size from WALLET;
	SELECT COUNT(*) INTO v_size from VEHICLE;
	SELECT COUNT(*) INTO LOC_SIZE from LOCATION;
	
	for R IN(SELECT id from DRIVER WHERE LOC_ID is NULL) LOOP
	  v_random_id := ROUND(DBMS_RANDOM.VALUE(1, loc_size));
		dbms_output.PUT_LINE(v_random_id);
    UPDATE DRIVER Set LOC_ID=v_random_id WHERE id=R.id;
	 
END LOOP;
	for R IN(SELECT id from DRIVER WHERE WALLET_ID is NULL) LOOP
				LOOP
	already:=0;
	v_random_id:=ROUND(DBMS_RANDOM.VALUE(1,w_size));
	
	SELECT id INTO v_wallet_id FROM WALLET WHERE id=v_random_id;
	
	SELECT COUNT(*) INTO already FROM DRIVER WHERE WALLET_ID=v_wallet_id;
	

	IF already=0 THEN
		EXIT; 
	END IF; 
	
END LOOP;

	UPDATE  DRIVER set WALLET_ID=v_wallet_id WHERE id=R.id; 

	  
		
		
		
	 
END LOOP;
	for R IN(SELECT id from DRIVER WHERE PLATE_NO is NULL) LOOP
				LOOP
	already:=0;
	v_random_id:=ROUND(DBMS_RANDOM.VALUE(1,v_size));
	
	SELECT PLATE_NO INTO v_plate_no FROM VEHICLE WHERE id=v_random_id;
	
	SELECT COUNT(*) INTO already FROM DRIVER WHERE PLATE_NO=v_plate_no;
	

	IF already=0 THEN
		EXIT; 
	END IF; 
	
END LOOP;

	UPDATE  DRIVER set PLATE_NO=v_plate_no WHERE id=R.id; 

	  
		
		
		
	 
END LOOP;
	
	commit;
	
	--dbms_output.put_line('ws,vs,ls='|| w_size||' '||v_size||' '||loc_size);
END;
/


	