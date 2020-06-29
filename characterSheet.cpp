#include "characterSheet.h"
#include <iostream>
#include <string>


	//constructor
	pc::pc(std::string const& name, int age, int lvl) : name(name), age(age), lvl(lvl)
	{
		for(int i = 0; i < ATTR_CNT; i++)
			attr[i] = DEF_ATTR_SCORE;
	}

	//copy constructor
	pc::pc(const pc& that)
	{
		name = that.name;
		age = that.age;
		lvl = that.lvl;
		for(int i = 0; i < ATTR_CNT; i++)
			attr[i] = that.attr[i];
	}

	//assignment operator
	pc& pc::operator=(const pc& that)
	{
		name = that.name;
		age = that.age;
		lvl = that.lvl;
		for(int i = 0; i < ATTR_CNT; i++)
			attr[i] = that.attr[i];
		return *this;
	}

	//destructor
	pc::~pc()
	{
		std::cout << "Name: " << name << std::endl;
		std::cout << "Age: " << (int)age << std::endl;
		std::cout << "level: " << (int)lvl << std::endl;
		std::cout << "STR: " << attr[0] << std::endl;
		std::cout << "AGL: " << attr[1] << std::endl;
		std::cout << "VIT: " << attr[2] << std::endl;
		std::cout << "INT: " << attr[3] << std::endl;
		std::cout << "WIS: " << attr[4] << std::endl;
		std::cout << "COM: " << attr[5] << std::endl;
		std::cout << "AWR: " << attr[6] << std::endl;
	}