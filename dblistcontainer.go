package wajaf

type DBListContainer struct {
	NodeDef
}

func NewDBListContainer(id string) *DBListContainer {

	c := &DBListContainer{
		NodeDef: NewNode("container", "dblistContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone", "template", "dataset", "event", "help"})

	return c
}

func (c *DBListContainer) NewZone(ztype string, id string) NodeDef {
	z := NewDBListZone(ztype, id)
	c.AddChild(z)
	return z
}

type DBListZone NodeDef

func NewDBListZone(id string, ztype string) DBListZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element", "event", "help"})

	return z
}

func (c *DBListContainer) NewTemplate(ttype string, name string) NodeDef {
	z := NewDBListTemplate(ttype, name)
	c.AddChild(z)
	return z
}

type DBListTemplate NodeDef

func NewDBListTemplate(ttype string, name string) DBListTemplate {

	t := NewNode("template", ttype)

	t.RegisterKnownAttributes([]string{"name"})
	t.RegisterKnownChildren([]string{"container", "element"})

	t.SetAttribute("name", name)

	return t
}

func (c *DBListContainer) NewDataset(dtype string, data string) NodeDef {
	z := NewDBListDataset(dtype, data)
	c.AddChild(z)
	return z
}

type DBListDataset NodeDef

func NewDBListDataset(dtype string, data string) DBListDataset {

	d := NewNode("dataset", dtype)
	d.SetData(data)

	return d
}
