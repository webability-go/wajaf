package wajaf

type MatrixContainer NodeDef

func NewMatrixContainer(id string) MatrixContainer {

	c := NewNode("container", "matrixContainer")
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener",
		"columns", "mode", "classnamezone", "preidbutton", "defaultwidth", "defaultheight"})
	c.RegisterKnownChildren([]string{"zone", "template", "dataset"})

	return c
}

type MatrixZone NodeDef

func NewMatrixZone(id string) MatrixZone {

	z := NewNode("zone", "")
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}

type MatrixTemplate NodeDef

func NewMatrixTemplate(name string) MatrixTemplate {

	t := NewNode("template", "")

	t.RegisterKnownAttributes([]string{"name"})
	t.RegisterKnownChildren([]string{"container", "element"})

	t.SetAttribute("name", name)

	return t
}

type MatrixDataset NodeDef

func NewMatrixDataset(data string) MatrixDataset {

	d := NewNode("dataset", "")
	d.SetData(data)

	return d
}
