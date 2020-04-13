package wajaf

type TableContainer struct {
	NodeDef
}

func NewTableContainer(id string) *TableContainer {

	c := &TableContainer{
		NodeDef: NewNode("container", "tableContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone", "event", "help"})

	return c
}

func (c *TableContainer) NewZone(ztype string, id string) NodeDef {
	z := NewTableZone(ztype, id)
	c.AddChild(z)
	return z
}

type TableZone NodeDef

func NewTableZone(ztype string, id string) TableZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element", "event", "help"})

	return z
}
