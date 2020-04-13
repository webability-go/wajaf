package wajaf

type WindowContainer struct {
	NodeDef
}

func NewWindowContainer(id string) *WindowContainer {

	c := &WindowContainer{
		NodeDef: NewNode("container", "windowContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone", "event", "help"})

	return c
}

func (c *WindowContainer) NewZone(ztype string, id string) NodeDef {
	z := NewWindowZone(ztype, id)
	c.AddChild(z)
	return z
}

type WindowZone NodeDef

func NewWindowZone(ztype string, id string) WindowZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element", "event", "help"})

	return z
}
