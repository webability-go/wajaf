package wajaf

type MMCFieldElement NodeDef

func NewMMCFieldElement(id string) MMCFieldElement {

	e := NewNode("element", "mmcfieldElement")
	e.SetID(id)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom", "size",
		"visible", "info", "disabled", "readonly", "notnull", "helpmode",
		"path", "external", "deletebutton", "loading", "accept", "multifile"})
	//	e.RegisterKnownMessages([]string{"defaultvalue", "helpdescription", "statusnotnull"} )
	return e
}
