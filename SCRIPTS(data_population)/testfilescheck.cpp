#include<bits/stdc++.h>
#include"binomialHeap.h";
using namespace std;


void solve(){

     BinomialHeap<int> h;

    string line;
    while(getline(cin,line)){
        istringstream ss(line);
        string operation;
        ss>>operation;
        if(operation=="I"){
            int v;
            while(ss>>v){
                h.insert(v);
            }
            //cout<<"v= "<<v<<endl;
        }
        else if(operation=="F"){
            cout<<"Find-Min returned "<<h.Find_Min()<<endl;

        }
         else if(operation=="E"){
            cout<<"Extract-Min returned "<<h.Extract_Min()<<endl;

        }
         else if(operation=="U"){
            BinomialHeap<int> h2;
            int v;
          //  cout<<"union called\n";
            while(ss>>v){
                h2.insert(v);
            }
            h.unionBH(h2);

        }
        else if(operation=="P"){
            h.printHeap();
        }
    }


}




bool check_properties(string& expectedLine,string& myline){
   return  (expectedLine.substr(0,5)=="Level")&&(myline.substr(0,5)=="Level");
}


int main() {
    int numTestcases = 21; // Change this according to your testcase count

    for (int i = 0; i < numTestcases; ++i) {
        //cpy relative path
        string inputFile = "Generator\\Generator\\in" + to_string(i) + ".txt";
        string expectedOutputFile = "Generator\\Generator\\out" + to_string(i) + ".txt";

        ifstream in(inputFile);
        if (!in.is_open()) {
            cout << "Failed to open input file: " << inputFile << endl;
            continue;
        }

        // Redirect cin to read from the input file
        streambuf* cinbuf = cin.rdbuf();
        cin.rdbuf(in.rdbuf());

        // Capture the original cout buffer
        streambuf* origCoutBuf = cout.rdbuf();

        // Create a file stream for capturing cout output
        string myout="Generator\\Generator\\outHeap" + to_string(i) + ".txt";
        ofstream out(myout);
        cout.rdbuf(out.rdbuf());

        // Call your code here
        // Example: your_function_to_test();
        solve();

        // Reset cin and cout
        cin.rdbuf(cinbuf);
        cout.rdbuf(origCoutBuf);

        // Close the input and output streams
        in.close();
        out.close();

        // Compare the generated output with expected output
        ifstream expectedOutput(expectedOutputFile);
        
        ifstream actualOutput(myout);

        string expectedLine, actualLine;
        int lineNum = 1;
        bool mismatch = false;

        while (getline(expectedOutput, expectedLine) && getline(actualOutput, actualLine)) {
            if (expectedLine != actualLine && !check_properties(expectedLine,actualLine)) {
                cout << "Testcase " << i << " - Mismatch at line " << lineNum << endl;
                cout << "Expected: " << expectedLine << endl;
                cout << "Actual:   " << actualLine << endl;
                mismatch = true;
                break;
            }
            lineNum++;
        }

        if (!mismatch && (expectedOutput.eof() == actualOutput.eof())) {
            cout << "Testcase " << i << " - Passed" << endl;
        } 
        else if(mismatch){
            cout << "Testcase " << i << " - Different Output" << endl;
        }
        
        else if(!mismatch){
            cout << "Testcase " << i << " - Output matched but white space mismatch" << endl;
        }
        else{
            cout<<"Wrong answer\n";
        }

        expectedOutput.close();
        actualOutput.close();
    }

    return 0;
}
