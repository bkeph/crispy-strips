#include <iostream>
#include <fstream>
#include <map>
#include <set>
#include <string>
#include <fstream>
#include <iomanip>
#include <sstream>

// Prototypes
int countWordAppearences(const std::string& fileName, std::map<std::string, size_t>& map, std::set<std::string>& set);
std::string removeSymbolsFromString(const std::string& str);
int whichLinesHasWord(const std::string& fileName, std::map<std::string, std::set<size_t>>& map, const std::set<std::string>& set);
bool isLastWordInLine(std::string& currentLineRead, const std::string& wordToSearchFor);



template<typename T1, typename T2>
void displayMap(std::map<T1, T2>& map, std::string &&key_whatData, std::string &&value_whatData)
{
    std::cout << std::setfill('-') << std::setw(15) << std::left << key_whatData
        << std::setw(3) << std::left << value_whatData << std::endl
        << "==========================" << std::endl;

    std::cout << std::setfill(' ');
    auto it = map.begin();
    while (it != map.end())
    {
        std::cout << std::setw(15) << std::left << it->first
            << it->second << std::endl;
        ++it;
    }
}


std::ostream& operator<<(std::ostream& os, std::set<size_t> set)
{
    os << "[ ";
    for(const size_t &element : set)
        os << std::left << element << " ";
    os << "]";
    return os;
}


int main()
{
    std::string filename{"words.txt"};
    std::map<std::string, size_t> mapOfAppearences;
    std::set<std::string> setOfWords;
    std::map<std::string, std::set<size_t>> mapOfAppearencesOnLines;

    countWordAppearences(filename, mapOfAppearences, setOfWords);
    whichLinesHasWord(filename, mapOfAppearencesOnLines, setOfWords);
}


int countWordAppearences(const std::string &fileName, std::map<std::string, size_t> &map, std::set<std::string> &set)
{
    std::ifstream file{};
    std::string currentWord{};
    size_t wordCount{0};
    file.open(fileName, std::ios::in);

    if (!file.is_open())
    {
        std::cerr << "Error in opening file" << std::endl;
        return 1;
    }

    while (file >> currentWord)
    {
        set.insert(removeSymbolsFromString(currentWord));
    }

    auto it = set.begin();
    file.clear(); // clear flags
    file.seekg(0, std::ios::beg); // return to the beginning of the file

    while (it != set.end())
    {
        while (file >> currentWord)
        {
            if(*it == removeSymbolsFromString(currentWord))
                wordCount += 1;
        }

        map.emplace(*it, wordCount);

        wordCount = 0;
        file.clear(); // clear flags
        file.seekg(0, std::ios::beg); // return to the beginning of the file
        ++it;
    }

    displayMap(map, "Word", "Appearences");
    file.close();

}


std::string removeSymbolsFromString(const std::string& str)
{
    std::string buffer{};

    if (isalpha(str.at(str.size() - 1)))
        return str;
    else if (!isalpha(str.at(str.size() - 1)))
    {
        for (size_t i{0}; i<str.size() - 1; i++)
            buffer += str.at(i);
        return buffer;
    }
}


int whichLinesHasWord(const std::string &fileName, std::map<std::string, std::set<size_t>> &map, const std::set<std::string> &set)
{
    std::ifstream file{};
    std::string currentLineRead{};
    file.open(fileName);
    
    if (!file.is_open())
    {
        std::cerr << "Error in opening file" << std::endl;
        return 1;
    }

    auto it_set = set.begin();
    //auto it_map = map.begin();

    while (it_set != set.end())
    {
        size_t currentLine{ 1 };
        size_t noOfLettersOfCurrentWord{(*it_set).length()};
        std::set<size_t> lineSetOfCurrentWord{};
        std::string wordToSearchFor{ *it_set /*removeSymbolsFromString(*it_set, noOfLettersOfCurrentWord) */};

        while (getline(file, currentLineRead))
        {
            auto pos = currentLineRead.find(wordToSearchFor);

            if(pos != std::string::npos)
            {
                if(pos == 0 && !isalpha(currentLineRead.at(pos + noOfLettersOfCurrentWord)) || // if first word in line and next char is not letter
                        (pos != 0 && !isLastWordInLine(currentLineRead, wordToSearchFor) && !isalpha(currentLineRead.at(pos - 1)) && !isalpha(currentLineRead.at(pos + noOfLettersOfCurrentWord))) || // if not first nor last word in line and is between non-letter chars
                        (pos != 0 && isLastWordInLine(currentLineRead, wordToSearchFor) && !isalpha(currentLineRead.at(pos - 1)))) // if last word in line and is after non-alpha char
                    lineSetOfCurrentWord.insert(currentLine);

            }
            
            ++currentLine;
        }
        map.insert(std::make_pair(*it_set, lineSetOfCurrentWord));

        file.clear(); // clear flags
        file.seekg(0, std::ios::beg); // return to the beginning of the file
        ++it_set;
    }

    std::cout << std::endl;
    displayMap(map, "Word", "Lines on which it appeared");
    file.close();
    return 0;
}



bool isLastWordInLine(std::string &currentLineRead, const std::string &wordToSearchFor)
{
    if (!isalpha(currentLineRead.at(currentLineRead.size() - 1)))
    {
        currentLineRead = currentLineRead.erase(currentLineRead.size() - 1);
    }

    if (wordToSearchFor.size() >= 2)
    {
        std::string last2charactersInLine{};
        last2charactersInLine += currentLineRead.at(currentLineRead.size() - 2);
        last2charactersInLine += currentLineRead.at(currentLineRead.size() - 1);

        std::string last2charactersOfWord{};
        last2charactersOfWord += wordToSearchFor.at(wordToSearchFor.size() - 2);
        last2charactersOfWord += wordToSearchFor.at(wordToSearchFor.size() - 1);

        if (last2charactersInLine == last2charactersOfWord)
            return true;

    }
    else
    {
        std::string lastCharInLine{};
        lastCharInLine += currentLineRead.at(currentLineRead.size() - 1);

        std::string lastCharInWord{};
        lastCharInWord += wordToSearchFor.at(wordToSearchFor.size() - 1);

        if (lastCharInLine == lastCharInWord)
            return true;
    }

    return false;
}