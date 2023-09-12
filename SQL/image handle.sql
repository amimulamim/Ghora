CREATE or REPLACE FUNCTION getImageOfUser(usernam in VARCHAR2)
return VARCHAR2 IS

	img VARCHAR2(100);
	gender char(1);
	BEGIN
		SELECT image into img from USERS WHERE USERNAME=usernam;
		SELECT sex into gender from USERS WHERE USERNAME=usernam;
		if img is null THEN
				if gender='F' THEN
				img:='userfdefault.png';
				ELSE
				img:='userdefault.jpeg';
				end if;
		end if;
		return img;
	
	end;
	/
	
	CREATE or REPLACE FUNCTION getImageOfDriver(did in NUMBER)
return VARCHAR2 IS

	img VARCHAR2(100);
	gender char(1);
	BEGIN
		SELECT image into img from DRIVER WHERE id=did;
		SELECT sex into gender from DRIVER WHERE id=did;
		if img is null THEN
				if gender='F' THEN
				img:='userfdefault.png';
				ELSE
				img:='userdefault.jpeg';
				end if;
		end if;
		return img;
	
	end;
	/