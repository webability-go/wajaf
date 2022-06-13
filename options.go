package wajaf

type Options NodeDef
type Option NodeDef

func NewOptions() Message {

	e := NewNode("options", "")
	e.RegisterKnownChildren([]string{"option"})
	return e
}

func NewOption(key string, data string) Message {

	e := NewNode("option", "")
	e.RegisterKnownAttributes([]string{"key"})
	e.SetAttribute("key", key)
	e.SetData(data)
	return e
}
