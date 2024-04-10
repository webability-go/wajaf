package wajaf

type SearchableTextFieldElement NodeDef

func NewSearchableTextFieldElement(id string) SearchableTextFieldElement {

	e := NewNode("element", "searchabletextfieldElement")
	e.SetID(id)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom",
		"size", "texttype", "minlength", "maxlength", "minwords", "maxwords", "min", "max", "format", "visible", "info",
		"disabled", "readonly", "notnull", "helpmode", "auto"})
	//	e.RegisterKnownMessages([]string{"defaultvalue", "helpdescription", "statusnotnull", "statusbadformat", "statustooshort", "statustoolong", "statustoofewwords", "statustoomanywords", "statuscheck"})

	return e
}
