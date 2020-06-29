
1pgrpg: main.o characterSheet.o
	g++ main.o characterSheet.o -o 1pgrpg

main.o: main.cpp
	g++ -c main.cpp

characterSheet.o: characterSheet.cpp characterSheet.h
	g++ -c characterSheet.cpp
clean:
	rm *.o 1pgrpg