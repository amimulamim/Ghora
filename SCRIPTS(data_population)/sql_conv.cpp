#include <iostream>
#include <fstream>
#include <string>
#include <regex>

int main() {
    std::ifstream inputFile("your_sql_script.sql");
    std::ofstream outputFile("output_script.sql");
    
    if (!inputFile.is_open() || !outputFile.is_open()) {
        std::cerr << "Error opening files." << std::endl;
        return 1;
    }
    
    std::string line;
    std::regex checkRegex(".*\\s*check\\s*\\(.*\\)");
    
    while (std::getline(inputFile, line)) {
        std::smatch match;
        if (std::regex_match(line, match, checkRegex)) {
            // Extract the table name and column from the line if needed
            std::string tableName = "table_name"; // Replace with actual table name
            std::string columnName = "column_name"; // Replace with actual column name
            
            // Replace the unnamed check constraint with a named one
            std::string namedConstraint = "constraint " + tableName + "_" + columnName + "_check " + match.str();
            line = std::regex_replace(line, checkRegex, namedConstraint);
        }
        
        outputFile << line << std::endl;
    }
    
    inputFile.close();
    outputFile.close();
    
    std::cout << "Named constraints added. Output written to output_script.sql." << std::endl;

    return 0;
}
