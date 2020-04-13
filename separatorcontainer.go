package wajaf

// type SeparatorContainer NodeDef

type SeparatorContainer struct {
	NodeDef
}

func NewSeparatorContainer(id string) *SeparatorContainer {

	c := &SeparatorContainer{
		NodeDef: NewNode("container", "separatorContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener",
		"mode", "auto"})
	c.RegisterKnownChildren([]string{"zone"})

	return c
}

func (c *SeparatorContainer) NewZone(ztype string, id string) NodeDef {
	z := NewSeparatorZone(ztype, id)
	c.AddChild(z)
	return z
}

type SeparatorZone NodeDef

func NewSeparatorZone(ztype string, id string) SeparatorZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params",
		"size", "classnameseparator", "display"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}
