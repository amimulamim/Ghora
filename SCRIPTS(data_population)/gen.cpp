#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <map>
#include<iomanip>
using namespace std;


std::string generatePlateNumber(const std::string& district, const std::string& vehicleCode, int number) {
    std::ostringstream plateNumber;
    plateNumber << district << "-" << vehicleCode << "-" << setw(6) << setfill('0') << number;
    return plateNumber.str();
}

std::string generateInsertStatement(const std::string& plateNo, const std::string& modelname, int planId) {
    std::ostringstream insertStatement;
    insertStatement << "INSERT INTO vehicle (plate_no, vehicle_modelname, plan_id) VALUES ('"
                    << plateNo << "', '" << modelname << "', " << planId << ");";
    return insertStatement.str();
}

int main() {
    std::string district = "DHA"; // Replace with your district code
    std::map<std::string, std::string> vehicleCodes = {
        {"cars.txt", "GA"},
        {"bike.txt", "HA"},
        {"CNG.txt", "THA"}
    };

    int planId = 1;

    for (const auto& entry : vehicleCodes) {
        const std::string& filename = entry.first;
        const std::string& vehicleCode = entry.second;

        std::ifstream file(filename);
        if (file.is_open()) {
            std::string modelname;
            while (std::getline(file, modelname)) {
                std::string plateNo = generatePlateNumber(district, vehicleCode, planId + 100000);
                std::string insertStatement = generateInsertStatement(plateNo, modelname, planId);
                std::cout << insertStatement << std::endl;
                planId++;
            }
            file.close();
        } else {
            std::cerr << "Unable to open file: " << filename << std::endl;
        }
    }

    return 0;
}
