#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <set>
#include <cstdlib>
#include <ctime>
#include <iomanip>

bool isPhoneNumberValid(const std::string &phoneNumber) {
    static const std::set<std::string> validPrefixes = {
        "88013", "88014", "88015", "88016", "88017", "88018", "88019"
    };
    return (phoneNumber.length() == 13) && (validPrefixes.count(phoneNumber.substr(0, 5)) > 0);
}

bool isPhoneNumberUnique(const std::string &phoneNumber, const std::set<std::string> &existingPhoneNumbers) {
    return existingPhoneNumbers.count(phoneNumber) == 0;
}

std::string sanitizePassword(const std::string &password) {
    std::string sanitizedPassword = password;
    size_t pos = sanitizedPassword.find('\'');
    if (pos != std::string::npos) {
        sanitizedPassword = sanitizedPassword.substr(0, pos);
    }
    return sanitizedPassword;
}

int main() {
    std::ifstream phoneFile("driverphone.txt");
    std::set<std::string> existingPhoneNumbers;
    std::string existingPhoneNumber;
    
    while (std::getline(phoneFile, existingPhoneNumber)) {
        existingPhoneNumbers.insert(existingPhoneNumber);
    }
    
    std::ifstream userDataFile("userdata.csv");
    std::string line;
    
    // Skip the header line if present
    std::getline(userDataFile, line);
    
    srand(static_cast<unsigned>(time(nullptr))); // Seed for randomization
    
    while (std::getline(userDataFile, line)) {
        std::istringstream iss(line);
        std::string email, sex, name, username, password;
        
        std::getline(iss, email, ',');
        std::getline(iss, sex, ',');
        std::getline(iss, name, ',');
        std::getline(iss, username, ',');
        std::getline(iss, password, ',');
        
        password = sanitizePassword(password);
        
        std::string phoneNumber = "8801" + std::to_string(rand() % 7 + 3); // Generating random prefix
        for (int i = 0; i < 6; ++i) {
            phoneNumber += std::to_string(rand() % 10);
        }
        
        if (isPhoneNumberValid(phoneNumber) && isPhoneNumberUnique(phoneNumber, existingPhoneNumbers)) {
            existingPhoneNumbers.insert(phoneNumber);
            std::ofstream out("driverphone.txt", std::ios::app);
            out << phoneNumber << "\n";
            
            std::cout << "INSERT INTO USERS(username,name,password,email,phone,sex) values('"
                      << username << "','" << name << "','" << password << "','" << email << "'," << std::setw(13) << std::setfill('0') << phoneNumber
                      << ",'" << sex << "');\n";
        }
    }
    
    return 0;
}
