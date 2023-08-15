DECLARE
    v_counter NUMBER := 1;
BEGIN
    FOR i IN 1..200 LOOP
        INSERT INTO Pricing_plan (base_fare, per_dist, per_minute)
        VALUES (
            FLOOR(DBMS_RANDOM.VALUE(80, 151)),   -- Generate random base_fare between 80 and 150
            FLOOR(DBMS_RANDOM.VALUE(70, 121)),   -- Generate random per_dist between 70 and 120
            FLOOR(DBMS_RANDOM.VALUE(20, 51))     -- Generate random per_minute between 20 and 50
        );
        
        v_counter := v_counter + 1;
    END LOOP;
    
    COMMIT;
    DBMS_OUTPUT.PUT_LINE(v_counter - 1 || ' entries inserted.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
        ROLLBACK;
END;

