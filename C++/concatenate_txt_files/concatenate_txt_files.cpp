#include <iostream>
#include <fstream>
#include <array>
#include <sstream>
#include <string>
#include <vector>
#include <algorithm>


// Prototypes
int constructFileList(size_t& numberOfFiles, std::vector<std::string>& vectOfFileNames);
bool checkFileType(const std::string& fileName);
int createOutputFile(const std::vector<std::string>& vectOfFileNames, const size_t size);


int main()
{
    std::vector<std::string> vectOfFileNames;
    size_t numberOfFiles{};

    std::cout << "Concatenation process has started. Please wait..." << std::endl;


    if(constructFileList(numberOfFiles, vectOfFileNames) == 0) return 0; // return 0 if failed

    if(createOutputFile(vectOfFileNames, numberOfFiles) == 0)
        return 0; // return 0 if failed
    else
        std::cout << "Concatenation has SUCCEEDED. Visit output.txt." << std::endl;

    system("pause");
}


int constructFileList(size_t& numberOfFiles, std::vector<std::string>& vectOfFileNames)
{
    std::ifstream inputFile{"input.txt", std::ios::in};
    std::string currentFileName{};

    if (!inputFile)
    {
        std::cerr << "input.txt FILE NOT FOUND in the current directory" << std::endl;
        system("pause");
        return 0;
    }
        

    while(inputFile >> currentFileName)
    {
        
        vectOfFileNames.push_back(std::move(currentFileName));

        if (! checkFileType(vectOfFileNames.at(numberOfFiles)))
        {
            std::cerr << "Type was not specified for at least 1 file name. Please edit input.txt." << std::endl;
            return 0;
        }

        ++numberOfFiles;
    }


    inputFile.close();
    return 1;
}


bool checkFileType(const std::string& fileName)
{
    for (const char& ch : fileName)
        if (ch == '.')
            return true;

    return false;
}


int createOutputFile(const std::vector<std::string>& vectOfFileNames, const size_t size)
{
    std::ofstream outputFile{"output.txt", std::ios::trunc};

    if (!outputFile)
    {
        std::cerr << "Output file could not be opened." << std::endl;
        return 0;
    }

    for (size_t count{ 0 }; count < size; ++count)
    {
        std::ifstream file{vectOfFileNames.at(count)};
        std::string readLine{};

        if (!file)
        {
            std::cerr << "File " << vectOfFileNames.at(count) << " couldn't be opened." << std::endl;
            return 0;
        }


        while (std::getline(file, readLine))
        {
            outputFile << readLine << "\n";

        }

        file.close();
        
    }
    return 1;
}
