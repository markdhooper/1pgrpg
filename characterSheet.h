#ifndef CHARACTERSHEET_H
#define CHARACTERSHEET_H

#include <string>

#define ATTR_CNT 7
#define DEF_ATTR_SCORE 3

enum attributeNames {STR, AGL, VIT, INTL, WIS, COM, AWR};

//Player Character
class pc
{
private:
	std::string name;
	int age;
	int lvl;
	int attr[ATTR_CNT];
public:
	pc(std::string const& name, int age, int lvl);	//constructor
	pc(const pc& that);							    //copy constructor
	pc&operator=(const pc& that);				//assignment operator
	~pc();
};

#endif