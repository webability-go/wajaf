package wajaf

type ExpandableContainer struct {
	NodeDef
}

func NewExpandableContainer(id string) *ExpandableContainer {

	c := &ExpandableContainer{
		NodeDef: NewNode("container", "expandableContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone"})

	return c
}

func (c *ExpandableContainer) NewZone(ztype string, id string) NodeDef {
	z := NewExpandableZone(ztype, id)
	c.AddChild(z)
	return z
}

type ExpandableZone NodeDef

func NewExpandableZone(ztype string, id string) ExpandableZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params",
		"title", "closed", "classnameselectoropen", "classnameselectorclose", "display"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}
