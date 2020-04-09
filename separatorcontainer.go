package wajaf

// type SeparatorContainer NodeDef

type SeparatorContainer struct {
	NodeDef
}

func NewSeparatorContainer(id string) *SeparatorContainer {

	c := &SeparatorContainer{
		NodeDef: NewNode("container", "separatorContainer"),
	}
	//	c := NewNode("container", "separatorcontainer")
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener",
		"mode", "auto"})
	c.RegisterKnownChildren([]string{"zone"})

	return c
}

func (c *SeparatorContainer) NewZone(id string) NodeDef {
	z := NewSeparatorZone(id)
	c.AddChild(z)
	return z
}

type SeparatorZone NodeDef

func NewSeparatorZone(id string) SeparatorZone {

	z := NewNode("zone", "")
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params",
		"size", "classnameseparator", "display"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}
