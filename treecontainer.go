package wajaf

type TreeContainer struct {
	NodeDef
}

func NewTreeContainer(id string) *TreeContainer {

	c := &TreeContainer{
		NodeDef: NewNode("container", "treeContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone", "template", "dataset", "event", "help"})

	return c
}

func (c *TreeContainer) NewZone(ztype string, id string) NodeDef {
	z := NewTreeZone(ztype, id)
	c.AddChild(z)
	return z
}

type TreeZone NodeDef

func NewTreeZone(ztype string, id string) TreeZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element", "event", "help"})

	return z
}

func (c *TreeContainer) NewTemplate(ttype string, name string) NodeDef {
	z := NewTreeTemplate(ttype, name)
	c.AddChild(z)
	return z
}

type TreeTemplate NodeDef

func NewTreeTemplate(ttype string, name string) TreeTemplate {

	t := NewNode("template", ttype)

	t.RegisterKnownAttributes([]string{"name"})
	t.RegisterKnownChildren([]string{"container", "element"})

	t.SetAttribute("name", name)

	return t
}

func (c *TreeContainer) NewDataset(dtype string, data string) NodeDef {
	z := NewTreeDataset(dtype, data)
	c.AddChild(z)
	return z
}

type TreeDataset NodeDef

func NewTreeDataset(dtype string, data string) TreeDataset {

	d := NewNode("dataset", dtype)
	d.SetData(data)

	return d
}
