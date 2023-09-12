CREATE OR REPLACE TRIGGER update_driver_vehicle
Before UPDATE ON driver
FOR EACH ROW
DECLARE
    old_plate vehicle.id%TYPE;
BEGIN
    -- Get the old vehicle_id from the OLD row in the driver table
    SELECT vehicle_id INTO v_old_vehicle_id FROM driver WHERE id = :OLD.id;

    -- If the old vehicle_id is different from the new vehicle_id,
    -- then update the driver and vehicle tables
    IF v_old_vehicle_id != :NEW.vehicle_id THEN
        -- Update the previous vehicle's id in the vehicle table to the new id
        UPDATE vehicle
        SET id = :NEW.vehicle_id
        WHERE id = v_old_vehicle_id;

        -- Update the driver's vehicle_id in the driver table
        UPDATE driver
        SET vehicle_id = :NEW.vehicle_id
        WHERE id = :NEW.id;
    END IF;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        NULL;
END;
/
