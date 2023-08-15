#include <iostream>
#include <fstream>
#include <cstdlib>
#include <ctime>
#include <unordered_set>
using namespace std;

// Function to generate a random number between min and max (inclusive)
long long generateRandomNumber(long long min, long long max) {
    return min + rand() % (max - min + 1);
}

// Function to generate a random alphanumeric password of given length
string generateRandomPassword(int length) {
    const string symbols = "!@#$%^&*";
    const string uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const string lowercase = "abcdefghijklmnopqrstuvwxyz";
    const string numbers = "0123456789";
    const string allChars = symbols + uppercase + lowercase + numbers;
    
    string password;
    for (int i = 0; i < length; ++i) {
        password += allChars[generateRandomNumber(0, allChars.size() - 1)];
    }
    return password;
}

int main() {
    srand(static_cast<unsigned int>(time(nullptr)));
    
    unordered_set<string> accountNumbers;
    
    ofstream outputFile("insertWallet.sql");
    ofstream data("namesex.txt");
    if (!outputFile.is_open()) {
        cerr << "Error opening output file." << endl;
        return 1;
    }
    
    for (int i = 0; i < 10000; ++i) {
        int balance = generateRandomNumber(1000, 5000);
        string accountNo;
        do {
            long long accountNoInt = generateRandomNumber(1000000000001, 9999999999999);
            accountNo = to_string(accountNoInt);
        } while (accountNumbers.find(accountNo) != accountNumbers.end());
        accountNumbers.insert(accountNo);
        
        string password = generateRandomPassword(generateRandomNumber(6, 8));
        
        outputFile << "INSERT INTO WALLET (balance,account_no,password) VALUES("
                   << balance << "," << accountNo << ",'" << password << "');" << endl;
    }
    
    outputFile.close();
    
    cout << "Generated 10000 entries and saved to 'output.sql'." << endl;
    
    return 0;
}
