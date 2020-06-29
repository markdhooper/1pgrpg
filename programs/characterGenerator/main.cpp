#include <iostream>
#include <string>
#include "characterSheet.h"
int main(int argc, char *argv[])
{
	std::string name;
	if(argc > 1)
	{
		name = argv[1];
	}
	else
	{
		name = "default";
	}
	pc myPC(name,300,10);
	return 0;
}