package wajaf

type Help NodeDef

func NewHelp(tooltip string, title string, description string) Help {

	e := NewNode("help", "")
	e.AddMessage("summary", tooltip)
	e.AddMessage("title", title)
	e.AddMessage("description", description)

	return e
}
