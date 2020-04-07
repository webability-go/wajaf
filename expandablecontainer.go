package wajaf

type ExpandableContainer NodeDef

func NewExpandableContainer(id string) ExpandableContainer {

	c := NewNode("container", "expandablecontainer")
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone"})

	return c
}

type ExpandableZone NodeDef

func NewExpandableZone(id string) ExpandableZone {

	z := NewNode("zone", "")
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params",
		"title", "closed", "classnameselectoropen", "classnameselectorclose", "display"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}
