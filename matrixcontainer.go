package wajaf

type MatrixContainer struct {
	NodeDef
}

func NewMatrixContainer(id string) *MatrixContainer {

	c := &MatrixContainer{
		NodeDef: NewNode("container", "matrixContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener",
		"columns", "mode", "classnamezone", "preidbutton", "defaultwidth", "defaultheight"})
	c.RegisterKnownChildren([]string{"zone", "template", "dataset", "event", "help"})

	return c
}

func (c *MatrixContainer) NewZone(ztype string, id string) NodeDef {
	z := NewMatrixZone(ztype, id)
	c.AddChild(z)
	return z
}

type MatrixZone NodeDef

func NewMatrixZone(ztype string, id string) MatrixZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element", "event", "help"})

	return z
}

func (c *MatrixContainer) NewTemplate(ttype string, name string) NodeDef {
	z := NewMatrixTemplate(ttype, name)
	c.AddChild(z)
	return z
}

type MatrixTemplate NodeDef

func NewMatrixTemplate(ttype string, name string) MatrixTemplate {

	t := NewNode("template", ttype)

	t.RegisterKnownAttributes([]string{"name"})
	t.RegisterKnownChildren([]string{"container", "element"})

	t.SetAttribute("name", name)

	return t
}

func (c *MatrixContainer) NewDataset(dtype string, data string) NodeDef {
	z := NewMatrixDataset(dtype, data)
	c.AddChild(z)
	return z
}

type MatrixDataset NodeDef

func NewMatrixDataset(dtype string, data string) MatrixDataset {

	d := NewNode("dataset", dtype)
	d.SetData(data)

	return d
}
