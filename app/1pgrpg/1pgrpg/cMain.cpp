#include "cMain.h"

wxBEGIN_EVENT_TABLE(cMain, wxFrame)
	EVT_BUTTON(10001, OnNew)
	EVT_BUTTON(10002, OnLoad)
	EVT_BUTTON(10003, OnPDF)
wxEND_EVENT_TABLE()

cMain::cMain() : wxFrame(nullptr, wxID_ANY, "1pgrpg - Character Generator",wxPoint(30,30), wxSize(800, 600))
{
	//Buttons
	m_btn1 = new wxButton(this, 10001, "New..", wxPoint(10, 10), wxSize(100, 20));
	m_btn2 = new wxButton(this, 10002, "Load..", wxPoint(10, 30), wxSize(100, 20));
	m_btn3 = new wxButton(this, 10003, "Export to PDF..", wxPoint(10, 50), wxSize(100, 20));
}

cMain::~cMain()
{
}


// EVENT HANDLERS

void cMain::OnNew(wxCommandEvent &evt)
{
	//Character Creation
	wxMessageBox("Haven't added this yet","New Character Creation", wxOK | wxICON_INFORMATION);
	evt.Skip();	//signal that event has been handled
}

void cMain::OnLoad(wxCommandEvent& evt)
{
	//Load Character
	wxMessageBox("Haven't added this yet", "Load Character", wxOK | wxICON_INFORMATION);
	evt.Skip();	//signal that event has been handled
}

void cMain::OnPDF(wxCommandEvent& evt)
{
	//export PDF character sheet
	wxMessageBox("Haven't added this yet", "Export to PDF", wxOK | wxICON_INFORMATION);
	evt.Skip();	//signal that event has been handled
}