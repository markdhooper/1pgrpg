#pragma once

#include "wx/wx.h"

class cMain : public wxFrame
{
public:
	cMain();
	~cMain();

public:
	wxButton* m_btn1 = nullptr;
	wxButton* m_btn2 = nullptr;
	wxButton* m_btn3 = nullptr;
	void OnNew(wxCommandEvent &evt);
	void OnLoad(wxCommandEvent& evt);
	void OnPDF(wxCommandEvent& evt);
	wxDECLARE_EVENT_TABLE();
};

