// sort_entries_of_multiple_dictionaries.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <fstream>
#include <map>
#include <string>
#include <iomanip>
#include <sstream>

// Prototypes
bool splitFileAfter300kLines(std::string fileName);


template<typename T>
void outputMap(std::string fileName, const T& map)
{
    std::ofstream outputFile{ fileName + ".txt", std::ios::trunc };
    typename T::iterator it;

    for (auto it = map.begin(); it != map.end(); it++)
    {
        outputFile << (*it).first << (*it).second << '\n';
    }

    outputFile.close();
}


template<typename T>
bool sortDict(std::string fileName, T& dict)
{
    std::ifstream inputFile{ fileName + ".txt", std::ios::in };
    std::string currentDictEntry{};
    size_t currentLine{};

    std::cout << "Process of sorting lines in output.txt file has started. Please wait." << std::endl
        << "=====================================================================" << std::endl;

    if (!inputFile)
    {
        std::cerr << "output.txt FILE NOT FOUND in the current directory" << std::endl;
        system("pause");
        return false;
    }

    while (std::getline(inputFile, currentDictEntry))
    {
        std::string currentWord{};
        size_t delimiterPos = currentDictEntry.find('\t', 0);

        if (delimiterPos == std::string::npos)
            std::cerr << "ERROR. Delimiter \"<b>\" not found in line " << currentLine << std::endl;
        else
        {
            for (char& ch : currentDictEntry)
            {
                if (ch != '\t')
                {
                    currentWord += ch;
                }
                else
                    break;
            }

            auto value = currentDictEntry.substr(delimiterPos, std::string::npos);

            dict.insert(std::make_pair(currentWord, value));
            std::cout << "current word:\t" << std::setw(25) << currentWord << " - found in line " << currentLine << std::endl;
        }
        currentLine++;
    }
    return true;
}


int main()
{
    //std::multimap<std::string, std::string> dict;
    std::map<std::string, std::string> dict;

    std::string outputFileName{ "output" };
    if (sortDict<std::map<std::string, std::string>>(outputFileName, dict) == false)
    {
        std::cout << "Sorting process FAILED." << std::endl;
        return 0;
    }


    outputFileName = "output_sorted";
    outputMap<std::map<std::string, std::string>>(outputFileName, dict);


    if (splitFileAfter300kLines("output_sorted") == false)
    {
        std::cout << "Splitting process FAILED." << std::endl;
        return 0;
    }

    return 0;
}


bool splitFileAfter300kLines(std::string fileName)
{
    std::cout << "Process of splitting output_sorted.txt file has started. Please wait." << std::endl
        << "=====================================================================" << std::endl;

    std::string currentLine_string{};
    std::ifstream inputFile{ fileName + ".txt", std::ios::in };
    size_t currentLineInputFile{};
    size_t currentLineOutputFile{};
    size_t countSplitFiles{};

    if (!inputFile)
    {
        std::cerr << "output.txt FILE NOT FOUND in the current directory" << std::endl;
        system("pause");
        return false;
    }

    std::ofstream currentOutputFile{};

    while (std::getline(inputFile, currentLine_string))
    {
        if (currentLineOutputFile == 0)
        {
            std::string fileName_current{fileName};
            fileName_current = fileName_current + "_" + std::to_string(countSplitFiles) + ".txt";
            currentOutputFile.open(fileName_current, std::ios::trunc);
        }

        if(currentLineInputFile % 10000 == 0)
            std::cout << "current line in source file:\t" << std::setw(5) << currentLineInputFile << std::endl;
        
        currentOutputFile << currentLine_string << '\n';

        currentLineInputFile++;
        currentLineOutputFile++;

        if (currentLineOutputFile == 300000)
        {
            countSplitFiles++;
            currentLineOutputFile = 0;
            currentOutputFile.close();

            std::cerr << "File " << fileName << " created." << std::endl
                << "=====================================================================" << std::endl;
        }
    }

    countSplitFiles++;
    currentOutputFile.close();

    return true;
}
