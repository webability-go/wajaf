package wajaf

type GGraphElement NodeDef

func NewGGraphElement(id string) GGraphElement {

	e := NewNode("element", "ggraphelement")
	e.SetID(id)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom",
		"haslistener"})
	e.RegisterKnownChildren([]string{"dataset"})

	return e
}

type GGraphDataset NodeDef

func NewGGraphDataset(data string) GGraphDataset {

	d := NewNode("dataset", "")
	d.SetData(data)

	return d
}
