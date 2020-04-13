package wajaf

type FloatingContainer struct {
	NodeDef
}

func NewFloatingContainer(id string) *FloatingContainer {

	c := &FloatingContainer{
		NodeDef: NewNode("container", "floatingContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone", "event", "help"})

	return c
}

func (c *FloatingContainer) NewZone(ztype string, id string) NodeDef {
	z := NewFloatingZone(ztype, id)
	c.AddChild(z)
	return z
}

type FloatingZone NodeDef

func NewFloatingZone(ztype string, id string) FloatingZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element", "event", "help"})

	return z
}
