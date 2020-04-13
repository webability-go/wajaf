package wajaf

type SimpleContainer struct {
	NodeDef
}

func NewSimpleContainer(id string) *SimpleContainer {

	c := &SimpleContainer{
		NodeDef: NewNode("container", "simpleContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone"})

	return c
}

func (c *SimpleContainer) NewZone(ztype string, id string) NodeDef {
	z := NewSimpleZone(ztype, id)
	c.AddChild(z)
	return z
}

type SimpleZone NodeDef

func NewSimpleZone(ztype string, id string) SimpleZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}
