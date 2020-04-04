package wajaf

type Decoder struct {
	Containers map[string]NodeDef
	Elements   map[string]NodeDef
}

func NewDecoder() *Decoder {
	d := &Decoder{}

	// Adds all known container and elements and events

	return d
}
