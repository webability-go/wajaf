package wajaf

type BarContainer struct {
	NodeDef
}

func NewBarContainer(id string) *BarContainer {

	c := &BarContainer{
		NodeDef: NewNode("container", "barContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone", "event", "help"})

	return c
}

func (c *BarContainer) NewZone(ztype string, id string) NodeDef {
	z := NewBarZone(ztype, id)
	c.AddChild(z)
	return z
}

type BarZone NodeDef

func NewBarZone(ztype string, id string) BarZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element", "event", "help"})

	return z
}
