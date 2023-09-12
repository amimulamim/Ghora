



CREATE or REPLACE FUNCTION getVtypeByID(did in NUMBER)
return VARCHAR2 IS

typev VARCHAR2(50)
BEGIN


SELECT v_type into typev from model 
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











