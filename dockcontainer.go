package wajaf

type DockContainer struct {
	NodeDef
}

func NewDockContainer(id string) *DockContainer {

	c := &DockContainer{
		NodeDef: NewNode("container", "dockContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone"})

	return c
}

func (c *DockContainer) NewZone(ztype string, id string) NodeDef {
	z := NewDockZone(ztype, id)
	c.AddChild(z)
	return z
}

type DockZone NodeDef

func NewDockZone(ztype string, id string) DockZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}
