CREATE OR REPLACE TRIGGER insert_driver_availability
AFTER INSERT ON driver
FOR EACH ROW
BEGIN
  INSERT INTO availability (d_id, is_available,LAST_UPDATED)
  VALUES (:NEW.id, 0,CURRENT_TIMESTAMP);
END;
/

