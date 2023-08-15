
#include <iostream>
#include <fstream>
#include <vector>
#include <random>
#include <algorithm>
#include<bits/stdc++.h>
using namespace std;

// Function to read model names from a text file
std::vector<std::string> readModelNames(const std::string& fileName) {
    std::vector<std::string> modelNames;
    std::ifstream inputFile(fileName);
    if (inputFile.is_open()) {
        std::string modelName;
        while (std::getline(inputFile, modelName)) {
            modelNames.push_back(modelName);
        }
        inputFile.close();
    }
    
   

    
    return modelNames;
}

// Function to generate a random number between min and max (inclusive)
int generateRandomNumber(int min, int max) {
    static std::random_device rd;
    static std::mt19937 gen(rd());
    std::uniform_int_distribution<int> dist(min, max);
    return dist(gen);
}

int main() {
    std::vector<std::string> carModelNames = readModelNames("cars.txt");
    std::vector<std::string> bikeModelNames = readModelNames("bike.txt");
    std::vector<std::string> cngModelNames = readModelNames("CNG.txt");

    std::ofstream outputFile("insertvehicles.txt");
    if (!outputFile.is_open()) {
        std::cerr << "Error opening output file." << std::endl;
        return 1;
    }

    std::vector<std::string> districts = {
        "DHA", "CTG", "RAJ", "KHU", "BAR", "SYL", "MYM", "KUS", "RAN", "COM"
    };

    std::vector<std::string> vehicleCodes = { "GA", "HA", "THA" };

    int planId = 1;

    std::vector<std::string> generatedPlateNos;
    int plan_id_last=200;
    while (generatedPlateNos.size() < 1500) {
        std::string district = districts[generateRandomNumber(0, districts.size() - 1)];
        std::string vehicleCode = vehicleCodes[generateRandomNumber(0, vehicleCodes.size() - 1)];
        int serialNumber = generateRandomNumber(100000, 999999);
        std::string plateNo = district + "-" + vehicleCode + "-" + std::to_string(serialNumber);

        if (std::find(generatedPlateNos.begin(), generatedPlateNos.end(), plateNo) == generatedPlateNos.end()) {
            generatedPlateNos.push_back(plateNo);

            std::string model;
            if (vehicleCode == "GA") {
                model = carModelNames[generateRandomNumber(0, carModelNames.size() - 1)];
                 
            } else if (vehicleCode == "HA") {
                model = bikeModelNames[generateRandomNumber(0, bikeModelNames.size() - 1)];
            } else if (vehicleCode == "THA") {
                model = cngModelNames[generateRandomNumber(0, cngModelNames.size() - 1)];
            }
            
            istringstream ss(model);
            string company,modelname;
            ss>>company>>modelname;
            
            planId=generateRandomNumber(1, plan_id_last);
            outputFile << "insert into vehicle(plate_no, modelname, plan_id) values('" << plateNo << "', '" << modelname<< "', " << planId << ");" << std::endl;

           // planId++;
        }
    }

    outputFile.close();

    return 0;
}


/*

#include <iostream>
#include <fstream>
#include <vector>
#include <random>
#include <algorithm>
#include <ctime>

std::vector<std::string> readModelNames(const std::string& filename) {
    std::vector<std::string> modelNames;
    std::ifstream inputFile(filename);
    
    if (!inputFile.is_open()) {
        std::cerr << "Error opening file: " << filename << std::endl;
        return modelNames;
    }
    
    std::string modelName;
    while (std::getline(inputFile, modelName)) {
        modelNames.push_back(modelName);
    }
    
    inputFile.close();
    return modelNames;
}

std::string generatePlateNumber(const std::string& vehicleCode, int num) {
    std::vector<std::string> districts = {"DHA", "CTG", "RAJ", "KHU", "SYL","BAR","COX","NAR","MYM","NOA","KUS","RAN"}; // Add more districts if needed
    std::random_device rd;
    std::mt19937 gen(rd());
    std::shuffle(districts.begin(), districts.end(), gen);
    
    std::string districtCode = districts[0];
    std::string plateNumber = districtCode + "-" + vehicleCode + "-" + std::to_string(num);
    return plateNumber;
}

int main() {
    const int numEntries = 1000;
    const std::string carCode = "GA";
    const std::string bikeCode = "HA";
    const std::string cngCode = "THA";
    const int minPlanID = 1;
    const int maxPlanID = 202;
    
    std::vector<std::string> carModels = readModelNames("cars.txt");
    std::vector<std::string> bikeModels = readModelNames("bike.txt");
    std::vector<std::string> cngModels = readModelNames("CNG.txt");

    std::ofstream outputFile("insertvehicles.txt");
    if (!outputFile.is_open()) {
        std::cerr << "Error opening output file." << std::endl;
        return 1;
    }

    std::srand(static_cast<unsigned int>(std::time(nullptr)));
    
    for (int i = 0; i < numEntries; ++i) {
        std::string modelname;
        std::string vehicleCode;
        
        if (i < 300) {
            modelname = carModels[rand() % carModels.size()];
            vehicleCode = carCode;
        } else if (i < 600) {
            modelname = bikeModels[rand() % bikeModels.size()];
            vehicleCode = bikeCode;
        } else {
            modelname = cngModels[rand() % cngModels.size()];
            vehicleCode = cngCode;
        }
        
        int planID = rand() % (maxPlanID - minPlanID + 1) + minPlanID;
        std::string plateNumber = generatePlateNumber(vehicleCode, 100000 + i);
        
        outputFile << "insert into vehicle(plate_no, modelname, plan_id) values (\"" << plateNumber << "\", \"" << modelname << "\", " << planID << ");" << std::endl;
    }
    
    outputFile.close();
    std::cout << "Insert statements generated successfully." << std::endl;

    return 0;
}
*/