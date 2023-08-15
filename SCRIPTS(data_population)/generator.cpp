// #include<bits/stdc++.h>
// using namespace std;
// #define lli long long int
// #define endl "\n"
// #define MOD 1000000007

// int main()
// {
//     ifstream carin("cars.txt");
//     ifstream bikein("bike.txt");
//     ifstream cngin("CNG.txt");
//     ifstream locin("locaton.txt");

//     ofstream out("out.txt");
//     vector<pair<string, string>> cars;
//     int r = 0;

//     while (!carin.eof())
//     {
//         string s1, s2;
//         carin >> s1 >> s2;

//         // cars.push_back({s1,s2});
//         // }

//         // for(int i=0;i<100;i++)
//         // {
//         //     int r=rand()%cars.size();

//         out << "insert into model values(\'" << s2 << "\',\'"
//             << "car\',\'" << s1 << "\');\n";
//         r++;
//     }
//     // carin.close();
//     while (!bikein.eof())
//     {
//         string s1, s2;
//         bikein >> s1 >> s2;

//         // cars.push_back({s1,s2});
//         // }

//         // for(int i=0;i<100;i++)
//         // {
//         //     int r=rand()%cars.size();

//         out << "insert into model values(\'" << s2 << "\',\'"
//             << "bike\',\'" << s1 << "\');\n";
//         r++;
//     }
//         while (!cngin.eof())
//     {
//         string s1, s2;
//         cngin >> s1 >> s2;

//         // cars.push_back({s1,s2});
//         // }

//         // for(int i=0;i<100;i++)
//         // {
//         //     int r=rand()%cars.size();

//         out << "insert into model values(\'" << s2 << "\',\'"
//             << "CNG\',\'" << s1 << "\');\n";
//         r++;
//     }
//     // bikein.close();
// }