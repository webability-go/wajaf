package wajaf

type CodeNode NodeDef

func NewCodeNode(id string, tp string, code string) CodeElement {

	c := NewNode("code", tp)
	c.SetID(id)
	c.SetData(code)
	return c
}
