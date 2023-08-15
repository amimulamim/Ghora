

#include<bits/stdc++.h>
using namespace std;



// Remove spaces from a string
void removeSpaces(std::string& str) {
    str.erase(std::remove_if(str.begin(), str.end(), ::isspace), str.end());
}

int main() {
    
    int t=10;
    for(int tc=0;tc<=5;tc++){
        cout<<"for tc= "<<tc<<":\n";
        
    string outpname="Generator\\Generator\\out"+to_string(tc)+".txt";
       // ifstream file2(outpname);
        string myout="Generator\\Generator\\outHeap"+to_string(tc)+".txt";
    std::ifstream file1(outpname);
    std::ifstream file2(myout);
    
    if (!file1 || !file2) {
        std::cerr << "Error opening files." << std::endl;
        return 1;
    }

    std::string line1, line2;
    int lineNum = 1;

    while (std::getline(file1, line1) && std::getline(file2, line2)) {
        removeSpaces(line1);
        removeSpaces(line2);

        if (line1 != line2) {
            std::cout << "Difference at line " << lineNum << std::endl;
            std::cout << outpname << line1 << std::endl;
            std::cout << myout << line2 << std::endl;
        }

        ++lineNum;
    }

    if (!file1.eof() || !file2.eof()) {
        std::cout << "Files have different numbers of lines." << std::endl;
    }

    file1.close();
    file2.close();
    cout<<endl<<endl<<endl;


    }

    return 0;
}
