package wajaf

type TabContainer struct {
	NodeDef
}

func NewTabContainer(id string) *TabContainer {

	c := &TabContainer{
		NodeDef: NewNode("container", "tabContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener",
		"mode"})
	c.RegisterKnownChildren([]string{"zone", "event", "help"})

	return c
}

func (c *TabContainer) NewZone(ztype string, id string) NodeDef {
	z := NewTabZone(ztype, id)
	c.AddChild(z)
	return z
}

type TabZone NodeDef

func NewTabZone(ztype string, id string) TabZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params",
		"title"})
	z.RegisterKnownChildren([]string{"container", "element", "event", "help"})

	return z
}
