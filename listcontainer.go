package wajaf

type ListContainer struct {
	NodeDef
}

func NewListContainer(id string) *ListContainer {

	c := &ListContainer{
		NodeDef: NewNode("container", "listContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone", "template", "dataset"})

	return c
}

func (c *ListContainer) NewZone(ztype string, id string) NodeDef {
	z := NewListZone(ztype, id)
	c.AddChild(z)
	return z
}

type ListZone NodeDef

func NewListZone(ztype string, id string) ListZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}

func (c *ListContainer) NewTemplate(ttype string, name string) NodeDef {
	z := NewListTemplate(ttype, name)
	c.AddChild(z)
	return z
}

type ListTemplate NodeDef

func NewListTemplate(ttype string, name string) ListTemplate {

	t := NewNode("template", ttype)

	t.RegisterKnownAttributes([]string{"name"})
	t.RegisterKnownChildren([]string{"container", "element"})

	t.SetAttribute("name", name)

	return t
}

func (c *ListContainer) NewDataset(dtype string, data string) NodeDef {
	z := NewListDataset(dtype, data)
	c.AddChild(z)
	return z
}

type ListDataset NodeDef

func NewListDataset(dtype string, data string) ListDataset {

	d := NewNode("dataset", dtype)
	d.SetData(data)

	return d
}
