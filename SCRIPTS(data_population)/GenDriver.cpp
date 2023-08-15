#include<bits/stdc++.h>
#include<unordered_set>
using namespace std;

std::string toLowerCase(const std::string& str) {
    std::string result = str;
    std::transform(result.begin(), result.end(), result.begin(),
                   [](unsigned char c) { return std::tolower(c); });
    return result;
}

string generatePassword() {
    const string symbols = "!@#$%^&*";
    const string numbers = "0123456789";
    const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    string password;

    password += symbols[rand() % symbols.length()];
    password += numbers[rand() % numbers.length()];
    password += chars[rand() % chars.length()];
    password += chars[rand() % chars.length()];
    password += symbols[rand() % symbols.length()];
    password += numbers[rand() % numbers.length()];
    password += chars[rand() % chars.length()];
    password += chars[rand() % chars.length()];

    return password;
}

string generateEmail(string firstName, string lastName) {
    
    string emailFormats[] = {
        firstName + "_" + lastName + "@gmail.com",
        firstName + "_" + lastName + "@yahoo.com",
        //firstName + "_" + lastName + "@edu.gov.bd",
        //firstName + "_" + lastName + "@buet.ac.bd",
        firstName + "_" + lastName + "@outlook.com",
        firstName + "." + lastName + to_string(rand() % 9000 + 1000) + "@gmail.com",
        firstName.substr(0, 1) + lastName + "@gmail.com"
    };
    return emailFormats[rand() % 5];
}

long long generateRandomNumber(long long min, long long max) {
    return min + rand() % (max - min + 1);
}

string generatePhone() {
    string prefixes[] = {
        "0088017", "0088018", "0088016", "0088015", "0088013", "0088014", "0088019"
    };
    return prefixes[rand() % 7] + to_string(generateRandomNumber(10000000,99999999));
}

char generateSex(string sex) {
    if (sex == "Female") return 'F';
    if (sex == "Male") return 'M';
    if(rand()%2==0)
    return 'M'; 
    return 'F';// Assuming 'O' for other/unspecified
}

int generateRating() {
    return rand() % 5 + 1;
}

int main() {
    srand(time(NULL));
    ifstream inputFile("EMPLOYEE.txt");
    ofstream outputFile("insertDriver.txt");
    ofstream datas("nameSex.txt");

    if (!inputFile.is_open()) {
        cout << "Error opening input file." << endl;
        return 1;
    }
    
    if (!outputFile.is_open()) {
        cout << "Error opening output file." << endl;
        return 1;
    }

    unordered_set<string> usedEmails;
   
   
   
    unordered_set<string> usedPhones;




    string line;
    while (getline(inputFile, line)) {

        stringstream ss(line);

        vector<string> values;
        string value;
        while (getline(ss, value, ',')) {
            size_t startPos = value.find_first_of("'") + 1;
            size_t endPos = value.find_last_of("'");
            values.push_back(value.substr(startPos, endPos - startPos));
          //  cout<<"pushed ="<<values.back()<<endl;
        }

       

        string firstName = values[13];
        string lastName = values[14];
        string sex = values[16];



        /*istringstream iss(line);
        string firstName, lastName, sex;
        iss.ignore(1000, '\''); // Skip until first single quote
        getline(iss, firstName, '\''); // Read first name
        iss.ignore(1000, '\''); // Skip until next single quote
        iss.ignore(1000, '\''); // Skip until next single quote
        getline(iss, lastName, '\''); // Read last name
        iss.ignore(1000, '\''); // Skip until next single quote
        iss.ignore(1000, '\''); // Skip until next single quote
        getline(iss, sex, '\''); // Read sex*/

        string name = firstName + " " + lastName;
        string password = generatePassword();
        string email ;
         do {
            email = generateEmail(toLowerCase(firstName),toLowerCase(lastName));
        } while (usedEmails.find(email) != usedEmails.end());
        usedEmails.insert(email);
        string phone;
        do {
            phone = generatePhone();
        } while (usedPhones.find(phone) != usedPhones.end());
        usedPhones.insert(phone);
        char sexChar = generateSex(sex);
        int rating = generateRating();

        outputFile << "INSERT INTO DRIVER(name,password,email,phone,sex,rating) VALUES('"
                   << name << "','" << password << "','" << email << "'," << phone << ",'"
                   << sexChar << "'," << rating << ");" << endl;
    }

    inputFile.close();
    outputFile.close();

    cout << "Entries generated and saved in 'insertDriver.txt'." << endl;

    return 0;
}
