import csv
import random
import string

# Function to generate a random 13-digit phone number
def generate_phone_number():
    prefix = random.choice(['88013', '88014', '88015', '88016', '88017', '88018', '88019'])
    suffix = ''.join(random.choice(string.digits) for _ in range(8))
    return int(prefix + suffix)

# Load existing driver phone numbers from the file
existing_phones = set()
with open('driverphone.txt', 'r') as driver_file:
    for line in driver_file:
        existing_phones.add(line.strip())

# Process the userdata.csv file and generate SQL insert statements
with open('userdata.csv', 'r') as csv_file, open('output.sql', 'w') as sql_output:
    csv_reader = csv.reader(csv_file)
    next(csv_reader)  # Skip the header row
    
    for row in csv_reader:
        email, sex, name, username, password = row
        phone = generate_phone_number()
        
        # Ensure phone number is unique and not in existing_phones set
        while phone in existing_phones:
            phone = generate_phone_number()
        
        existing_phones.add(phone)  # Add the generated phone to the set
        
        # Handle single quotes in the password
        password = password.replace("'", "")
        name=name.replace("'","")
        
        # Generate the SQL insert statement
        sql_insert = f"INSERT INTO USERS(username,name,password,email,phone,sex,is_admin) " \
                     f"VALUES('{username}','{name}','{password}','{email}',{phone},'{sex}',0);\n"
        sql_output.write(sql_insert)

print("SQL insert statements generated in 'output.sql' file.")
